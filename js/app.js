import { normalizeName } from "./dictionary.js";
import { hashName } from "./hash.js";
import { matchName } from "./matcher.js";
import { ALLERGENS } from "./foods.js";
import { createResultImage } from "./result-image.js";
import { getBirthSeason, getSeasonalIngredientMatches, SEASON_LABELS, SEASON_ORDER } from "./seasonality.js";

const form = document.querySelector("#match-form");
const nameInput = document.querySelector("#name-input");
const errorMessage = document.querySelector("#form-error");
const results = document.querySelector("#results");
const dietSelect = document.querySelector("#diet-select");
const spicySelect = document.querySelector("#spicy-select");
const removeTitles = document.querySelector("#remove-titles");
const birthdayMonthInput = document.querySelector("#birthday-month");
const birthdayDayInput = document.querySelector("#birthday-day");
let currentResult = null;
let currentStory = "";
let sharedSeason = null;
const cuisineNames = {
  taiwanese: "台灣風味", japanese: "日本風味", korean: "韓國風味", thai: "泰式風味",
  chinese: "中華風味", italian: "義式風味", southeastAsian: "東南亞風味",
  dessert: "甜點", western: "西式風味", indian: "印度風味"
};

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  nameInput.setAttribute("aria-invalid", "true");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
  nameInput.removeAttribute("aria-invalid");
  birthdayInput.removeAttribute("aria-invalid");
}

function readPreferences() {
  const month = birthdayMonthInput.value;
  const day = birthdayDayInput.value;
  const hasBirthday = Boolean(month || day);
  const birthSeason = hasBirthday ? getBirthSeason(`${month}-${day}`) : sharedSeason;
  if (hasBirthday && !birthSeason) throw new Error("birthday-invalid");
  return {
    diet: dietSelect.value,
    spicy: spicySelect.value,
    season: birthSeason,
    allergens: Array.from(form.querySelectorAll('input[name="allergen"]:checked'), (input) => input.value)
      .filter((allergen) => ALLERGENS.includes(allergen))
  };
}

function makeTag(label, value) {
  const tag = document.createElement("span");
  tag.className = "trait-tag";
  const strong = document.createElement("strong");
  strong.textContent = `${label}：`;
  tag.append(strong, document.createTextNode(value));
  return tag;
}

function renderRecommendations(foods) {
  const list = document.querySelector("#recommendation-list");
  list.replaceChildren();
  foods.forEach((food) => {
    const card = document.createElement("article");
    card.className = "recommendation-card";
    const emoji = document.createElement("span");
    emoji.className = "recommendation-emoji";
    emoji.setAttribute("role", "img");
    emoji.setAttribute("aria-label", food.imageAlt);
    emoji.textContent = food.emoji;
    const copy = document.createElement("div");
    copy.className = "recommendation-copy";
    const name = document.createElement("h4");
    name.textContent = food.name;
    const description = document.createElement("p");
    description.textContent = food.description;
    copy.append(name, description);
    const cuisine = document.createElement("span");
    cuisine.className = "recommendation-cuisine";
    cuisine.textContent = cuisineNames[food.cuisines[0]] || "風味料理";
    card.append(emoji, copy, cuisine);
    list.append(card);
  });
}

function buildStory(name, hits, food, storyIndex) {
  if (name === "甘霖") {
    return "「甘」帶來柔和的甜味，「霖」則像長雨般滋潤。\n你的代表料理適合以緩慢、溫柔的方式完成，\n味道不必強烈，卻能留下安定而細緻的印象。";
  }
  const clues = hits.map((hit) => `「${hit.matchedText}」帶來${hit.label}的意象`).join("，");
  const opening = clues
    ? `${clues}。`
    : "這次沒有命中字典中的特定意象，料理方向由名字的固定雜湊探索而來。";
  return `${opening}\n${food.storyTemplates[storyIndex]}`;
}

function renderResult(result, preferences) {
  const food = result.featured;
  currentResult = result;
  currentStory = buildStory(result.normalizedName, result.hits, food, result.storyIndex);
  setText("#result-title", `${result.normalizedName}的代表美食`);
  setText("#hero-food-name", food.name);
  setText("#hero-food-description", food.description);
  setText("#story-text", currentStory);
  setText("#food-ingredients", food.ingredients.join("、"));
  setText("#food-flavor-note", food.flavorNote);
  setText("#food-occasion", food.occasionNote);
  const seasonalMatches = result.season ? getSeasonalIngredientMatches(food, result.season) : [];
  const seasonNote = result.season
    ? `${result.seasonLabel}食材加權已套用。${seasonalMatches.length ? `這道料理命中：${seasonalMatches.join("、")}。` : "這道料理沒有直接命中當季食材，整體配對仍已納入季節考量。"}`
    : "未提供出生日期，這次配對不使用季節食材加權。";
  setText("#food-season-note", seasonNote);
  const visual = document.querySelector("#hero-food-visual");
  visual.setAttribute("aria-label", `${food.name}，食物插圖`);
  setText("#hero-food-emoji", food.emoji);

  const traits = document.querySelector("#trait-list");
  traits.replaceChildren();
  result.traits.tastes.forEach((trait) => traits.append(makeTag("味覺", trait)));
  result.traits.textures.forEach((trait) => traits.append(makeTag("口感", trait)));
  const methodLabels = { grill: "炙烤", fry: "酥炸", steam: "蒸煮", stew: "慢燉", raw: "清新呈現", bake: "烘焙" };
  const dishMethods = food.methods.map((method) => methodLabels[method] || method).join("、");
  traits.append(makeTag("料理方式", dishMethods));
  traits.append(makeTag("用餐情境", "午後・相聚・療癒時刻"));

  renderRecommendations(result.recommendations);
  const hitText = result.hits.length
    ? result.hits.map((hit) => `${hit.matchedText}｜${hit.label}：${hit.description}`).join("；")
    : "這次沒有命中字典項目；系統以姓名固定雜湊建立基礎偏好。";
  setText("#dictionary-hits", hitText);
  const titleNote = removeTitles.checked
    ? "已先移除尾端稱謂，再以正規化姓名計算固定雜湊。"
    : "稱謂保留在姓名中，並參與本次固定雜湊與配對。";
  const preferenceNote = preferences.diet !== "any" || preferences.spicy !== "any" || preferences.allergens.length
    ? "飲食、辣度與過敏條件只用來排除結果，不會改變姓名雜湊。"
    : "以味覺 30%、口感 20%、菜系 15%、料理方式 15%、食材 10% 及固定雜湊 10% 計分。";
  const seasonNoteText = preferences.season
    ? `出生季節（${SEASON_LABELS[preferences.season]}）會影響食材相似度，不改變姓名雜湊。`
    : "出生季節為選填；未提供時不納入季節食材加權。";
  setText("#method-note", `${titleNote} ${preferenceNote} ${seasonNoteText}`);

  results.hidden = false;
  document.querySelector("#share-status").textContent = "";
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function errorText(error) {
  if (error.message === "empty") return "請先輸入一個名字。";
  if (error.message === "too-long") return "名字正規化後請控制在 20 個字以內。";
  if (error.message === "invalid") return "請輸入包含文字或數字的名字，不要只使用標點符號。";
  if (error.message === "no-foods") return "目前沒有符合這些飲食條件的美食，請減少一項排除條件。";
  if (error.message === "birthday-invalid") return "請輸入有效的出生月日；例如 2 月 29 日也可以。";
  return "配對時發生問題，請調整條件後再試一次。";
}

function submitMatch(event) {
  event?.preventDefault();
  clearError();
  try {
    const normalizedName = normalizeName(nameInput.value, { removeTitles: removeTitles.checked });
    const hash = hashName(normalizedName);
    const preferences = readPreferences();
    const result = matchName(normalizedName, hash, preferences);
    renderResult(result, preferences);
  } catch (error) {
    showError(errorText(error));
    const invalidField = error.message === "birthday-invalid" ? (birthdayMonthInput.value ? birthdayDayInput : birthdayMonthInput) : nameInput;
    if (error.message === "birthday-invalid") {
      birthdayMonthInput.setAttribute("aria-invalid", "true");
      birthdayDayInput.setAttribute("aria-invalid", "true");
    } else {
      nameInput.setAttribute("aria-invalid", "true");
    }
    invalidField.focus();
  }
}

async function copyUrl(url) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return;
  }
  const field = document.createElement("textarea");
  field.value = url;
  field.setAttribute("readonly", "");
  field.className = "clipboard-fallback";
  document.body.append(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  if (!copied) throw new Error("clipboard-unavailable");
}

async function shareResult() {
  const status = document.querySelector("#share-status");
  const normalizedName = normalizeName(nameInput.value, { removeTitles: removeTitles.checked });
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("name", normalizedName);
  url.searchParams.set("diet", dietSelect.value);
  url.searchParams.set("spicy", spicySelect.value);
  if (currentResult?.season) url.searchParams.set("season", currentResult.season);
  url.searchParams.set("v", "1");
  const shareData = { title: "名字的味道 Name Your Flavor", text: `${normalizedName}的代表美食`, url: url.href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else {
      await copyUrl(url.href);
      status.textContent = "分享網址已複製。";
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    status.textContent = `無法自動複製，請手動複製網址：${url.href}`;
  }
}

async function saveResultImage() {
  const status = document.querySelector("#share-status");
  const button = document.querySelector("#save-image-button");
  if (!currentResult) {
    status.textContent = "請先完成美食配對，再儲存結果圖片。";
    return;
  }
  button.disabled = true;
  status.textContent = "正在製作你的美食配對圖片…";
  try {
    const image = await createResultImage(currentResult, currentStory);
    const objectUrl = URL.createObjectURL(image);
    const link = document.createElement("a");
    const safeName = currentResult.normalizedName.replace(/[^\p{L}\p{N}-]/gu, "").slice(0, 20) || "flavor";
    link.href = objectUrl;
    link.download = `${safeName}-name-your-flavor.png`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    status.textContent = "結果圖片已準備下載。";
  } catch (error) {
    status.textContent = error.message === "canvas-unavailable" || error.message === "image-export-unavailable"
      ? "這個瀏覽器暫不支援圖片匯出，請更新瀏覽器後再試。"
      : "圖片製作失敗，請再試一次。";
  } finally {
    button.disabled = false;
  }
}

function restoreFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("name")) return;
  const rawName = params.get("name");
  if (rawName.length > 80 || (params.has("v") && params.get("v") !== "1")) {
    showError("分享網址的參數無效，請重新輸入名字。");
    return;
  }
  const diets = ["any", "omnivore", "lacto-ovo", "vegan"];
  const spicyLevels = ["any", "none", "mild", "hot"];
  const diet = params.get("diet") || "any";
  const spicy = params.get("spicy") || "any";
  const season = params.get("season");
  if (!diets.includes(diet) || !spicyLevels.includes(spicy) || (season && !SEASON_ORDER.includes(season))) {
    showError("分享網址中的偏好設定無效，請重新輸入名字。");
    return;
  }
  nameInput.value = rawName;
  dietSelect.value = diet;
  spicySelect.value = spicy;
  sharedSeason = season || null;
  if (season) {
    document.querySelector("#birthday-help").textContent =
      `分享連結已套用${SEASON_LABELS[season]}食材；未分享月日或年份。`;
  }
  if (diet !== "any" || spicy !== "any" || season) document.querySelector(".preferences").open = true;
  submitMatch();
}

form.addEventListener("submit", submitMatch);
document.querySelector("#clear-name").addEventListener("click", () => {
  nameInput.value = "";
  clearError();
  nameInput.focus();
});
document.querySelector("#reset-button").addEventListener("click", () => {
  results.hidden = true;
  nameInput.focus();
  document.querySelector("#match-form").scrollIntoView({ behavior: "smooth", block: "center" });
});
document.querySelector("#share-button").addEventListener("click", shareResult);
document.querySelector("#save-image-button").addEventListener("click", saveResultImage);
document.querySelectorAll(".example-button").forEach((button) => {
  button.addEventListener("click", () => {
    nameInput.value = button.dataset.example;
    form.requestSubmit();
  });
});
nameInput.addEventListener("input", clearError);
function handleBirthdayInput() {
  sharedSeason = null;
  clearError();
  birthdayMonthInput.removeAttribute("aria-invalid");
  birthdayDayInput.removeAttribute("aria-invalid");
  document.querySelector("#birthday-help").textContent =
    "只使用月、日推算出生季節；不需要年份，也不會保存完整生日。";
}
birthdayMonthInput.addEventListener("input", handleBirthdayInput);
birthdayDayInput.addEventListener("input", handleBirthdayInput);
restoreFromUrl();
