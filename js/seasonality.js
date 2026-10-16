export const SEASON_ORDER = ["spring", "summer", "autumn", "winter"];
export const SEASON_LABELS = {
  spring: "春季",
  summer: "夏季",
  autumn: "秋季",
  winter: "冬季"
};

export const SEASONAL_INGREDIENTS = {
  spring: ["蘆筍", "草莓", "豌豆", "竹筍", "菠菜", "櫻桃", "青蔥", "香椿"],
  summer: ["芒果", "西瓜", "小黃瓜", "番茄", "玉米", "茄子", "荔枝", "百香果", "鳳梨", "絲瓜"],
  autumn: ["南瓜", "地瓜", "栗子", "香菇", "梨子", "柿子", "芋頭", "蓮藕", "葡萄", "蘋果"],
  winter: ["白蘿蔔", "高麗菜", "柑橘", "橘子", "薑", "白菜", "花椰菜", "紅棗", "蓮藕", "栗子"]
};

const INGREDIENT_GROUPS = {
  "竹筍": ["竹筍", "春筍"],
  "柑橘": ["柑橘", "橘子", "柳橙", "橙"],
  "芒果": ["芒果"],
  "番茄": ["番茄", "小番茄", "聖女番茄"],
  "香菇": ["香菇", "菇類", "蘑菇", "野菇"],
  "地瓜": ["地瓜", "甘藷", "番薯"],
  "芋頭": ["芋頭"],
  "高麗菜": ["高麗菜", "包心菜", "椰菜"],
  "白菜": ["白菜", "大白菜"],
  "白蘿蔔": ["白蘿蔔", "蘿蔔", "大根"],
  "菠菜": ["菠菜"],
  "玉米": ["玉米"],
  "草莓": ["草莓"],
  "南瓜": ["南瓜"],
  "栗子": ["栗子", "板栗"],
  "梨子": ["梨子", "水梨", "梨"],
  "葡萄": ["葡萄"],
  "蘋果": ["蘋果"],
  "蓮藕": ["蓮藕"],
  "薑": ["薑", "生薑"],
  "茄子": ["茄子"],
  "荔枝": ["荔枝"],
  "西瓜": ["西瓜"],
  "小黃瓜": ["小黃瓜", "黃瓜", "青瓜"],
  "豌豆": ["豌豆", "豆莢"],
  "蘆筍": ["蘆筍"],
  "櫻桃": ["櫻桃"],
  "柿子": ["柿子"],
  "百香果": ["百香果"],
  "鳳梨": ["鳳梨", "菠蘿"],
  "絲瓜": ["絲瓜"]
};

export function getBirthSeason(dateValue) {
  if (typeof dateValue !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(dateValue);
  if (!match) return null;
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  const today = new Date();
  const todayLocal = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");
  if (dateValue > todayLocal) return null;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

export function scoreSeasonalIngredients(food, season) {
  const seasonalIngredients = SEASONAL_INGREDIENTS[season];
  if (!seasonalIngredients) return 0.5;
  const ingredients = food.ingredients || [];
  const matched = seasonalIngredients.filter((seasonalIngredient) => {
    const aliases = INGREDIENT_GROUPS[seasonalIngredient] || [seasonalIngredient];
    return ingredients.some((ingredient) =>
      aliases.some((alias) => ingredient.includes(alias) || alias.includes(ingredient))
    );
  });
  return matched.length ? 1 : 0;
}

export function getSeasonalIngredientMatches(food, season) {
  const seasonalIngredients = SEASONAL_INGREDIENTS[season] || [];
  const ingredients = food.ingredients || [];
  return seasonalIngredients.filter((seasonalIngredient) => {
    const aliases = INGREDIENT_GROUPS[seasonalIngredient] || [seasonalIngredient];
    return ingredients.some((ingredient) =>
      aliases.some((alias) => ingredient.includes(alias) || alias.includes(ingredient))
    );
  });
}
