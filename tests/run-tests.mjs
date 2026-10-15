import assert from "node:assert/strict";
import { NAME_DICTIONARY, normalizeName, findNameMatches } from "../js/dictionary.js";
import { FOODS, ALLERGENS } from "../js/foods.js";
import { hashName } from "../js/hash.js";
import { matchName } from "../js/matcher.js";
import { drawResultCard } from "../js/result-image.js";

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
  assert.ok(FOODS.length >= 120, `expected at least 120 foods, got ${FOODS.length}`);
  assert.ok(new Set(FOODS.map((food) => food.id)).size === FOODS.length);
  assert.ok(new Set(NAME_DICTIONARY.flatMap((entry) => entry.match)).size >= 200);
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
