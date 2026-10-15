import { findNameMatches } from "./dictionary.js";
import { FOODS } from "./foods.js";
import { stableTieScore } from "./hash.js";

const TASTE_KEYS = ["sweet", "sour", "spicy", "savory", "bitter", "light"];
const TEXTURE_KEYS = ["crispy", "soft", "chewy", "smooth", "juicy"];
const METHOD_KEYS = ["grill", "fry", "steam", "stew", "raw", "bake"];
const CUISINE_KEYS = ["taiwanese", "japanese", "korean", "thai", "chinese", "italian", "southeastAsian", "dessert", "western", "indian"];
const TASTE_NAMES = { sweet: "甜潤", sour: "酸香", spicy: "辛香", savory: "鮮醇", bitter: "回甘", light: "清爽" };
const TEXTURE_NAMES = { crispy: "酥脆", soft: "綿密", chewy: "Q彈", smooth: "滑順", juicy: "多汁" };
const METHOD_NAMES = { grill: "炙烤", fry: "酥炸", steam: "蒸煮", stew: "慢燉", raw: "清新呈現", bake: "烘焙" };

function meanWeights(items, keys) {
  return Object.fromEntries(keys.map((key) => [
    key,
    items.length ? items.reduce((total, item) => total + (item[key] || 0), 0) / items.length : 0
  ]));
}

function similarity(left, right, keys) {
  return keys.reduce((total, key) => total + (5 - Math.abs((left[key] || 0) - (right[key] || 0))) / 5, 0) / keys.length;
}

function createHashProfile(hash) {
  const taste = TASTE_KEYS.reduce((result, key, index) => {
    result[key] = index === hash.tasteHash % TASTE_KEYS.length ? 5 : 1;
    return result;
  }, {});
  const texture = TEXTURE_KEYS.reduce((result, key, index) => {
    result[key] = index === hash.textureHash % TEXTURE_KEYS.length ? 5 : 1;
    return result;
  }, {});
  const cuisine = CUISINE_KEYS.reduce((result, key, index) => {
    result[key] = index === hash.cuisineHash % CUISINE_KEYS.length ? 5 : 1;
    return result;
  }, {});
  const selectedMethod = METHOD_KEYS[hash.methodHash % METHOD_KEYS.length];
  const method = Object.fromEntries(METHOD_KEYS.map((key) => [key, key === selectedMethod ? 5 : 1]));
  return { taste, texture, cuisine, method, ingredients: [] };
}

function buildProfile(hits, hash) {
  if (!hits.length) return createHashProfile(hash);
  return {
    taste: meanWeights(hits.map((hit) => hit.tasteWeights), TASTE_KEYS),
    texture: meanWeights(hits.map((hit) => hit.textureWeights), TEXTURE_KEYS),
    cuisine: meanWeights(hits.map((hit) => hit.cuisineWeights), CUISINE_KEYS),
    method: meanWeights(hits.map((hit) => hit.methodWeights), METHOD_KEYS)
  };
}

function passesPreferences(food, preferences) {
  const excluded = preferences.allergens || [];
  if (food.allergens.some((allergen) => excluded.includes(allergen))) return false;
  if (preferences.diet === "vegan" && food.diet !== "vegan") return false;
  if (preferences.diet === "lacto-ovo" && food.diet === "omnivore") return false;
  if (preferences.spicy === "none" && food.spicy > 0) return false;
  if (preferences.spicy === "mild" && food.spicy > 1) return false;
  if (preferences.spicy === "hot" && food.spicy < 1) return false;
  return true;
}

export function scoreFood(food, profile, hash, preferences = {}) {
  if (!passesPreferences(food, preferences)) return Number.NEGATIVE_INFINITY;
  const tasteScore = similarity(food.tastes, profile.taste, TASTE_KEYS);
  const textureScore = similarity(food.textures, profile.texture, TEXTURE_KEYS);
  const cuisineScore = similarity(
    Object.fromEntries(CUISINE_KEYS.map((key) => [key, food.cuisines.includes(key) ? 5 : 0])),
    profile.cuisine, CUISINE_KEYS
  );
  const methodScore = similarity(
    Object.fromEntries(METHOD_KEYS.map((key) => [key, food.methods.includes(key) ? 5 : 0])),
    profile.method, METHOD_KEYS
  );
  const profileIngredients = profile.ingredients || [];
  const ingredientScore = profileIngredients.length
    ? food.ingredients.filter((ingredient) => profileIngredients.includes(ingredient)).length / Math.max(profileIngredients.length, 1)
    : 0.5;
  const tieScore = stableTieScore(hash.cuisineHash + hash.tasteHash + hash.textureHash + hash.methodHash, food.id);

  return tasteScore * 0.3 + textureScore * 0.2 + cuisineScore * 0.15
    + methodScore * 0.15 + ingredientScore * 0.1 + tieScore * 0.1;
}

function describeProfile(profile) {
  const tastes = TASTE_KEYS.filter((key) => profile.taste[key] >= 3).slice(0, 2).map((key) => TASTE_NAMES[key]);
  const textures = TEXTURE_KEYS.filter((key) => profile.texture[key] >= 3).slice(0, 2).map((key) => TEXTURE_NAMES[key]);
  const methods = METHOD_KEYS.filter((key) => profile.method[key] >= 3).map((key) => METHOD_NAMES[key]);
  return { tastes: tastes.length ? tastes : ["清爽", "均衡"], textures: textures.length ? textures : ["細緻", "順口"], methods };
}

function diversifyFoods(ranked, preferredIds = []) {
  const chosen = [];
  const usedIds = new Set();
  const usedCategories = new Set();
  const byId = new Map(ranked.map((result) => [result.food.id, result]));
  const ordered = [
    ...preferredIds.map((id) => byId.get(id)).filter(Boolean),
    ...ranked
  ];
  for (const result of ordered) {
    if (chosen.length === 4) break;
    if (usedIds.has(result.food.id) || usedCategories.has(result.food.category)) continue;
    chosen.push(result);
    usedIds.add(result.food.id);
    usedCategories.add(result.food.category);
  }
  if (chosen.length < 4) {
    for (const result of ranked) {
      if (chosen.length === 4) break;
      if (!usedIds.has(result.food.id)) {
        chosen.push(result);
        usedIds.add(result.food.id);
      }
    }
  }
  return chosen;
}

export function matchName(normalizedName, hash, preferences = {}) {
  const hits = findNameMatches(normalizedName);
  const profile = buildProfile(hits, hash);
  profile.ingredients = hits.flatMap((hit) => hit.ingredients || []);
  const ranked = FOODS
    .filter((food) => passesPreferences(food, preferences))
    .map((food) => ({ food, score: scoreFood(food, profile, hash, preferences) }))
    .sort((a, b) => b.score - a.score || a.food.id.localeCompare(b.food.id));
  if (!ranked.length) throw new Error("no-foods");
  const recommendations = diversifyFoods(
    ranked.slice(1),
    hits.flatMap((hit) => hit.recommendationHints || [])
  );
  return {
    normalizedName,
    hits,
    profile,
    hash,
    featured: ranked[0].food,
    recommendations: recommendations.map((result) => result.food),
    traits: describeProfile(profile),
    storyIndex: (hash.tasteHash + hash.methodHash) % 2,
    ranked
  };
}
