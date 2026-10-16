import assert from "node:assert/strict";
import { NAME_DICTIONARY, normalizeName, findNameMatches } from "../js/dictionary.js";
import { FOODS, ALLERGENS } from "../js/foods.js";
import { hashName } from "../js/hash.js";
import { matchName } from "../js/matcher.js";
import { drawResultCard } from "../js/result-image.js";
import { getBirthSeason, getSeasonalIngredientMatches, scoreSeasonalIngredients } from "../js/seasonality.js";

const tests = [];
function test(name, run) {
  tests.push([name, run]);
}

test("normalizes names and strips only trailing titles", () => {
  assert.equal(normalizeName(" 甘霖老師 "), "甘霖");
  assert.equal(normalizeName("王老師明"), "王老師明");
  assert.equal(normalizeName("林小姐"), "林");
  assert.equal(normalizeName(" Ｍｉｋａ "), "mika");
  assert.equal(normalizeName("カナ"), "かな");
  assert.throws(() => normalizeName("老師"), /empty/);
  assert.throws(() => normalizeName("!?.,，"), /invalid/);
  assert.throws(() => normalizeName("一".repeat(21)), /too-long/);
});

test("prioritizes a multi-character name match", () => {
  const hits = findNameMatches("甘霖");
  assert.deepEqual(hits.map((hit) => hit.matchedText), ["甘霖"]);
  assert.equal(findNameMatches("銀河")[0].matchedText, "銀河");
  assert.equal(findNameMatches("rose")[0].matchedText, "rose");
  assert.equal(findNameMatches("arose").length, 0);
});

test("matches all user-requested name characters", () => {
  for (const character of ["貝", "婷", "錦", "芳", "萍", "哲", "佳", "怡", "明", "倫", "荳"]) {
    assert.ok(findNameMatches(character).some((hit) => hit.matchedText === character), `${character} should match`);
  }
});

test("maps birth dates to seasons and rejects invalid or future dates", () => {
  assert.equal(getBirthSeason("2000-03-01"), "spring");
  assert.equal(getBirthSeason("2000-06-01"), "summer");
  assert.equal(getBirthSeason("2000-09-01"), "autumn");
  assert.equal(getBirthSeason("2000-12-01"), "winter");
  assert.equal(getBirthSeason("2000-02-29"), "winter");
  assert.equal(getBirthSeason("2001-02-29"), null);
  assert.equal(getBirthSeason("2999-01-01"), null);
});

test("birth season boosts matching seasonal ingredients without changing the name hash", () => {
  const hash = hashName("甘霖");
  const base = matchName("甘霖", hash);
  const spring = matchName("甘霖", hash, { season: "spring" });
  const springDish = spring.ranked.find((item) => item.food.id === "spring-bamboo-rice");
  const otherSeasonDish = spring.ranked.find((item) => item.food.id === "winter-daikon-pot");
  assert.equal(spring.season, "spring");
  assert.equal(hash.cuisineHash, base.hash.cuisineHash);
  assert.ok(scoreSeasonalIngredients(springDish.food, "spring") > scoreSeasonalIngredients(springDish.food, "winter"));
  assert.ok(springDish.score > base.ranked.find((item) => item.food.id === "spring-bamboo-rice").score);
  assert.ok(otherSeasonDish.score >= base.ranked.find((item) => item.food.id === "winter-daikon-pot").score);
  assert.ok(getSeasonalIngredientMatches(springDish.food, "spring").includes("竹筍"));
});

test("name matching is deterministic and differs across names", () => {
  const one = matchName("甘霖", hashName("甘霖"));
  const repeat = matchName("甘霖", hashName("甘霖"));
  const other = matchName("林嘉怡", hashName("林嘉怡"));
  assert.equal(one.featured.id, repeat.featured.id);
  assert.deepEqual(one.recommendations.map((food) => food.id), repeat.recommendations.map((food) => food.id));
  assert.notEqual(one.featured.id, other.featured.id);
  assert.equal(one.featured.id, "osmanthus-taro");
  assert.deepEqual(one.recommendations.map((food) => food.id), [
    "fermented-rice-tangyuan", "chicken-soup", "oden", "honey-pancake"
  ]);
});

test("filters diet, allergens, and spice without changing the name hash", () => {
  const hash = hashName("甘霖");
  const result = matchName("甘霖", hash, {
    diet: "vegan", spicy: "none", allergens: ["peanuts", "tree-nuts", "milk", "eggs", "shellfish"]
  });
  assert.equal(hashName("甘霖").tasteHash, hash.tasteHash);
  assert.ok(result.featured.diet === "vegan");
  assert.ok(result.featured.spicy === 0);
  assert.ok(!result.featured.allergens.some((allergen) => ["peanuts", "tree-nuts", "milk", "eggs", "shellfish"].includes(allergen)));
});

test("food and dictionary data meet the delivery requirements", () => {
  assert.ok(FOODS.length >= 160, `expected at least 160 foods, got ${FOODS.length}`);
  assert.ok(new Set(FOODS.map((food) => food.id)).size === FOODS.length);
  const keywords = NAME_DICTIONARY.flatMap((entry) => entry.match);
  assert.ok(new Set(keywords).size >= 500);
  assert.equal(new Set(keywords).size, keywords.length, "dictionary keywords must not be duplicated");
  for (const food of FOODS) {
    assert.ok(food.name && food.description && food.emoji);
    assert.ok(food.flavorNote && food.occasionNote);
    assert.ok(["vegan", "vegetarian", "omnivore"].includes(food.diet), `${food.id} has an invalid diet`);
    assert.ok(Number.isInteger(food.spicy) && food.spicy >= 0 && food.spicy <= 2, `${food.id} has an invalid spice level`);
    assert.ok(food.allergens.every((allergen) => ALLERGENS.includes(allergen)), `${food.id} has an unknown allergen`);
    for (const value of [...Object.values(food.tastes), ...Object.values(food.textures)]) {
      assert.ok(Number.isFinite(value) && value >= 0 && value <= 5, `${food.id} has an invalid weight`);
    }
  }
  for (const item of NAME_DICTIONARY) {
    const weights = [
      ...Object.values(item.tasteWeights),
      ...Object.values(item.textureWeights),
      ...Object.values(item.cuisineWeights),
      ...Object.values(item.methodWeights)
    ];
    assert.ok(weights.every((value) => Number.isFinite(value) && value >= 0 && value <= 5), `${item.id} has an invalid weight`);
  }
});

test("result has four unique, category-diverse recommendations", () => {
  const result = matchName("林嘉怡", hashName("林嘉怡"));
  assert.equal(result.recommendations.length, 4);
  assert.equal(new Set(result.recommendations.map((food) => food.id)).size, 4);
  assert.ok(new Set(result.recommendations.map((food) => food.category)).size > 1);
});

test("saved image rendering includes the name, featured dish, and recommendations", () => {
  const renderedText = [];
  const context = {
    clearRect() {},
    fillRect() {},
    beginPath() {},
    arc() {},
    fill() {},
    roundRect() {},
    moveTo() {},
    lineTo() {},
    stroke() {},
    measureText(text) { return { width: Array.from(text).length * 20 }; },
    fillText(text) { renderedText.push(text); },
    createLinearGradient() { return { addColorStop() {} }; }
  };
  const result = matchName("甘霖", hashName("甘霖"));
  drawResultCard(context, result, "甘甜而溫柔的故事");
  for (const text of ["甘霖的味道", result.featured.name, ...result.recommendations.map((food) => food.name)]) {
    assert.ok(renderedText.includes(text), `image is missing ${text}`);
  }
});

test("HTML-like input is handled as data and length-limited", () => {
  const shortMarkup = "<script>";
  assert.equal(normalizeName(shortMarkup), shortMarkup);
  assert.equal(matchName(shortMarkup, hashName(shortMarkup)).normalizedName, shortMarkup);
  assert.throws(() => normalizeName("<img src=x onerror=alert(1)>"), /too-long/);
});

let failures = 0;
for (const [name, run] of tests) {
  try {
    run();
    console.log(`✓ ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${name}\n  ${error.message}`);
  }
}
console.log(`\n${tests.length - failures}/${tests.length} tests passed`);
if (failures) process.exitCode = 1;
