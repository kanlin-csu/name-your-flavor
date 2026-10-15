const weights = (values) => Object.fromEntries(values.split(" ").map((value) => {
  const [key, score] = value.split(":");
  return [key, Number(score)];
}));

function entry(id, match, label, description, tastes, textures, cuisines, methods, ingredients) {
  return {
    id, match, label, description,
    tasteWeights: weights(tastes),
    textureWeights: weights(textures),
    cuisineWeights: weights(cuisines),
    methodWeights: weights(methods),
    ingredients
  };
}

export const NAME_DICTIONARY = [
  entry("sweet", ["甘", "甜", "蜜", "糖", "芳", "馨"], "甘甜", "溫和、甜潤而容易親近", "sweet:5 sour:0 spicy:0 savory:1 bitter:0 light:2", "crispy:0 soft:4 chewy:1 smooth:3 juicy:2", "taiwanese:2 japanese:2 korean:0 thai:0 chinese:1 italian:0 southeastAsian:0 dessert:5", "grill:0 fry:0 steam:1 stew:3 raw:0 bake:2", ["蜂蜜", "桂花", "地瓜", "芋頭"]),
  entry("rain", ["霖", "雨", "泉", "水", "川", "海"], "水潤", "如雨水般柔和、滋潤而沉靜", "sweet:1 sour:0 spicy:0 savory:3 bitter:0 light:4", "crispy:0 soft:2 chewy:0 smooth:5 juicy:4", "taiwanese:3 japanese:3 korean:1 thai:1 chinese:3 italian:0 southeastAsian:1 dessert:1", "grill:0 fry:0 steam:3 stew:5 raw:1 bake:0", ["高湯", "茶", "豆腐", "白蘿蔔"]),
  entry("light", ["明", "光", "陽", "昕", "晨", "曦"], "明亮", "清爽明朗，帶著溫暖的朝氣", "sweet:2 sour:1 spicy:0 savory:2 bitter:0 light:5", "crispy:3 soft:1 chewy:1 smooth:2 juicy:4", "taiwanese:2 japanese:4 korean:1 thai:1 chinese:2 italian:1 southeastAsian:1 dessert:2", "grill:2 fry:1 steam:2 stew:1 raw:4 bake:2", ["柑橘", "番茄", "綠茶", "香草"]),
  entry("nature", ["山", "岳", "峰", "林", "森", "松"], "山林", "沉穩清新，像山林裡自在的氣息", "sweet:1 sour:0 spicy:1 savory:4 bitter:1 light:3", "crispy:2 soft:2 chewy:3 smooth:1 juicy:2", "taiwanese:3 japanese:3 korean:1 thai:0 chinese:3 italian:1 southeastAsian:0 dessert:0", "grill:3 fry:1 steam:2 stew:4 raw:0 bake:1", ["香菇", "竹筍", "蕎麥", "山藥"]),
  entry("flowers", ["花", "梅", "蘭", "竹", "菊", "蓮"], "花香", "細緻清雅，藏著淡淡的芬芳", "sweet:3 sour:2 spicy:0 savory:1 bitter:2 light:4", "crispy:1 soft:2 chewy:0 smooth:3 juicy:2", "taiwanese:2 japanese:4 korean:1 thai:1 chinese:2 italian:1 southeastAsian:0 dessert:4", "grill:0 fry:1 steam:2 stew:2 raw:1 bake:3", ["桂花", "梅子", "蓮子", "茉莉"]),
  entry("joy", ["怡", "樂", "喜", "欣", "悅", "歡"], "歡欣", "明快愉悅，讓人想與身邊的人分享", "sweet:3 sour:2 spicy:1 savory:2 bitter:0 light:3", "crispy:3 soft:2 chewy:2 smooth:1 juicy:2", "taiwanese:3 japanese:2 korean:2 thai:1 chinese:2 italian:2 southeastAsian:1 dessert:3", "grill:2 fry:2 steam:1 stew:1 raw:1 bake:3", ["玉米", "番茄", "起司", "水果"]),
  entry("virtue", ["嘉", "善", "仁", "誠", "信", "義"], "敦厚", "真誠溫厚，帶著踏實可靠的風味", "sweet:1 sour:0 spicy:0 savory:5 bitter:0 light:2", "crispy:1 soft:3 chewy:2 smooth:2 juicy:2", "taiwanese:4 japanese:2 korean:1 thai:0 chinese:4 italian:1 southeastAsian:0 dessert:0", "grill:2 fry:1 steam:3 stew:4 raw:0 bake:1", ["米", "豆腐", "雞肉", "白菜"]),
  entry("color", ["紅", "青", "翠", "紫", "白", "金"], "繽紛", "色彩豐富，清新中帶著飽滿層次", "sweet:2 sour:2 spicy:1 savory:3 bitter:0 light:3", "crispy:3 soft:1 chewy:1 smooth:1 juicy:4", "taiwanese:3 japanese:3 korean:2 thai:2 chinese:2 italian:1 southeastAsian:1 dessert:2", "grill:2 fry:2 steam:1 stew:1 raw:3 bake:1", ["紫米", "番茄", "青菜", "柚子"]),
  entry("texture", ["柔", "晶", "玲", "玉", "珠", "瑩"], "細緻", "溫柔細膩，口感滑順而有光澤", "sweet:2 sour:1 spicy:0 savory:2 bitter:0 light:4", "crispy:0 soft:3 chewy:1 smooth:5 juicy:2", "taiwanese:2 japanese:4 korean:1 thai:0 chinese:2 italian:1 southeastAsian:0 dessert:4", "grill:0 fry:0 steam:3 stew:3 raw:1 bake:2", ["豆花", "珍珠", "銀耳", "芝麻"]),
  entry("spice", ["辛", "辣", "椒", "炎", "烈", "火"], "熱烈", "熱情鮮明，帶來爽快而有勁的滋味", "sweet:0 sour:1 spicy:5 savory:4 bitter:0 light:0", "crispy:2 soft:1 chewy:2 smooth:0 juicy:2", "taiwanese:2 japanese:0 korean:4 thai:4 chinese:3 italian:0 southeastAsian:4 dessert:0", "grill:3 fry:3 steam:0 stew:3 raw:0 bake:0", ["辣椒", "花椒", "泡菜", "薑"]),
  entry("fragrance", ["香", "韻", "味", "雅", "清", "寧"], "清香", "清雅有層次，留下舒服悠長的餘韻", "sweet:2 sour:1 spicy:0 savory:2 bitter:2 light:4", "crispy:1 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:2 japanese:4 korean:1 thai:1 chinese:2 italian:1 southeastAsian:1 dessert:2", "grill:1 fry:1 steam:2 stew:2 raw:2 bake:2", ["茶", "柚子", "香菇", "香草"]),
  entry("wind", ["風", "雲", "雪", "霜", "星", "月"], "輕盈", "輕柔自在，像微風一樣清透舒服", "sweet:1 sour:1 spicy:0 savory:1 bitter:1 light:5", "crispy:2 soft:1 chewy:0 smooth:3 juicy:3", "taiwanese:1 japanese:4 korean:1 thai:1 chinese:2 italian:1 southeastAsian:1 dessert:3", "grill:0 fry:0 steam:2 stew:2 raw:3 bake:2", ["梨子", "白蘿蔔", "豆腐", "薄荷"]),
  entry("earth", ["田", "禾", "稻", "谷", "土", "原"], "豐收", "樸實飽滿，讓人感到安心而滿足", "sweet:2 sour:0 spicy:0 savory:4 bitter:0 light:2", "crispy:1 soft:3 chewy:2 smooth:1 juicy:2", "taiwanese:5 japanese:2 korean:1 thai:1 chinese:4 italian:1 southeastAsian:0 dessert:1", "grill:1 fry:1 steam:3 stew:3 raw:0 bake:2", ["米", "南瓜", "玉米", "紅豆"]),
  entry("sea", ["洋", "潮", "港", "汐", "波", "澄"], "海味", "清爽鮮活，像海風裡帶點鹹香", "sweet:0 sour:1 spicy:0 savory:5 bitter:0 light:3", "crispy:1 soft:2 chewy:2 smooth:2 juicy:4", "taiwanese:3 japanese:5 korean:1 thai:1 chinese:2 italian:2 southeastAsian:1 dessert:0", "grill:2 fry:1 steam:3 stew:2 raw:3 bake:1", ["海苔", "魚", "蝦", "昆布"]),
  entry("warmth", ["暖", "和", "安", "康", "福", "寶"], "暖心", "暖和圓滿，最適合慢慢享受", "sweet:2 sour:0 spicy:0 savory:3 bitter:0 light:2", "crispy:0 soft:4 chewy:1 smooth:3 juicy:2", "taiwanese:4 japanese:3 korean:1 thai:0 chinese:4 italian:0 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:3 stew:5 raw:0 bake:1", ["紅豆", "雞湯", "薑", "糯米"]),
  entry("brave", ["勇", "毅", "剛", "強", "豪", "傑"], "爽朗", "俐落有勁，偏愛紮實而過癮的滋味", "sweet:0 sour:1 spicy:3 savory:5 bitter:0 light:0", "crispy:3 soft:1 chewy:4 smooth:0 juicy:2", "taiwanese:3 japanese:1 korean:3 thai:2 chinese:3 italian:2 southeastAsian:2 dessert:0", "grill:4 fry:3 steam:0 stew:2 raw:0 bake:1", ["牛肉", "蒜", "胡椒", "麵"]),
  entry("knowledge", ["文", "書", "學", "智", "慧", "思"], "文雅", "清楚細膩，喜歡有巧思的組合", "sweet:1 sour:1 spicy:0 savory:2 bitter:2 light:4", "crispy:1 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:2 japanese:4 korean:1 thai:0 chinese:3 italian:2 southeastAsian:0 dessert:2", "grill:0 fry:1 steam:2 stew:2 raw:2 bake:3", ["抹茶", "豆腐", "蘑菇", "麵粉"]),
  entry("precious", ["珍", "貴", "瑞", "琪", "瑤", "璇"], "珍味", "精巧講究，每一口都值得細細品味", "sweet:2 sour:1 spicy:0 savory:3 bitter:1 light:3", "crispy:2 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:2 japanese:4 korean:1 thai:0 chinese:3 italian:2 southeastAsian:0 dessert:3", "grill:1 fry:1 steam:2 stew:2 raw:1 bake:3", ["栗子", "干貝", "香菇", "奶油"]),
  entry("season", ["春", "夏", "秋", "冬", "季", "節"], "時令", "順著季節品味，簡單自在而恰到好處", "sweet:2 sour:2 spicy:1 savory:2 bitter:0 light:3", "crispy:2 soft:2 chewy:1 smooth:1 juicy:3", "taiwanese:3 japanese:3 korean:1 thai:1 chinese:2 italian:1 southeastAsian:1 dessert:2", "grill:1 fry:1 steam:2 stew:3 raw:2 bake:2", ["南瓜", "柑橘", "筍", "莓果"]),
  entry("music", ["音", "韻", "歌", "舞", "弦", "笛"], "和鳴", "節奏柔和，甜鹹交錯得剛剛好", "sweet:2 sour:1 spicy:1 savory:3 bitter:1 light:2", "crispy:2 soft:2 chewy:2 smooth:2 juicy:1", "taiwanese:2 japanese:2 korean:2 thai:1 chinese:2 italian:3 southeastAsian:0 dessert:2", "grill:1 fry:2 steam:1 stew:1 raw:1 bake:3", ["起司", "番茄", "麵粉", "香草"]),
  entry("morning", ["曉", "旭", "露", "朝", "黎", "旦"], "晨光", "清新明快，像一頓舒服的早晨", "sweet:2 sour:1 spicy:0 savory:2 bitter:1 light:5", "crispy:3 soft:2 chewy:1 smooth:2 juicy:2", "taiwanese:2 japanese:2 korean:1 thai:0 chinese:1 italian:2 southeastAsian:0 dessert:3", "grill:1 fry:2 steam:1 stew:0 raw:1 bake:3", ["蛋", "吐司", "豆漿", "水果"]),
  entry("english-gentle", ["mei", "mika", "ami", "yuki", "haru", "hana"], "清新", "清新柔和，適合香氣輕盈的料理", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:4", "crispy:2 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:1 japanese:4 korean:1 thai:0 chinese:1 italian:1 southeastAsian:0 dessert:3", "grill:0 fry:1 steam:2 stew:1 raw:2 bake:3", ["綠茶", "櫻花", "豆腐", "柚子"]),
  entry("english-bold", ["alex", "kai", "leo", "ren", "noah", "mori"], "俐落", "乾淨俐落，帶一點鮮明的個性風味", "sweet:1 sour:1 spicy:2 savory:4 bitter:0 light:1", "crispy:3 soft:1 chewy:2 smooth:1 juicy:2", "taiwanese:2 japanese:2 korean:2 thai:1 chinese:2 italian:2 southeastAsian:1 dessert:0", "grill:3 fry:2 steam:1 stew:2 raw:1 bake:1", ["胡椒", "海苔", "雞肉", "檸檬"]),
  {
    ...entry("甘霖", ["甘霖"], "甘甜・水潤", "「甘」帶來柔和甜味，「霖」則像長雨般滋潤", "sweet:4 sour:0 spicy:0 savory:2 bitter:0 light:3", "crispy:0 soft:4 chewy:1 smooth:4 juicy:3", "taiwanese:4 japanese:4 korean:0 thai:0 chinese:2 italian:0 southeastAsian:0 dessert:5", "grill:0 fry:0 steam:2 stew:4 raw:0 bake:2", ["蜂蜜", "桂花", "芋頭", "紅豆"]),
    recommendationHints: ["fermented-rice-tangyuan", "chicken-soup", "oden", "honey-pancake"]
  }
];

export const TITLES = ["老師", "教授", "博士", "醫師", "先生", "小姐", "女士", "同學", "主任", "校長"];

export function normalizeName(input, options = {}) {
  let name = String(input ?? "").trim().replace(/\s+/gu, " ").normalize("NFKC").toLowerCase();
  name = Array.from(name, (char) => {
    const code = char.codePointAt(0);
    return code >= 0x30a1 && code <= 0x30f6 ? String.fromCodePoint(code - 0x60) : char;
  }).join("");
  if (options.removeTitles !== false) {
    let foundTitle = true;
    while (foundTitle) {
      foundTitle = false;
      for (const title of TITLES) {
        if (name.endsWith(title)) {
          name = name.slice(0, -title.length).trimEnd();
          foundTitle = true;
          break;
        }
      }
    }
  }
  if (!name) throw new Error("empty");
  if (Array.from(name).length > 20) throw new Error("too-long");
  if (!/[\p{L}\p{N}]/u.test(name)) throw new Error("invalid");
  return name;
}

export function findNameMatches(name) {
  const characters = Array.from(name);
  const candidates = [];
  for (const item of NAME_DICTIONARY) {
    for (const term of item.match) {
      const isEnglish = /^[a-z0-9]+$/u.test(term);
      if (isEnglish) {
        const pattern = new RegExp(`(?:^|[^\\p{L}\\p{N}])${term}(?=$|[^\\p{L}\\p{N}])`, "u");
        if (pattern.test(name)) candidates.push({ item, term, length: term.length });
      } else if (name.includes(term)) {
        candidates.push({ item, term, length: Array.from(term).length });
      }
    }
  }
  candidates.sort((a, b) => b.length - a.length || a.item.id.localeCompare(b.item.id));
  const occupied = new Set();
  const found = [];
  for (const candidate of candidates) {
    let start = 0;
    while ((start = name.indexOf(candidate.term, start)) !== -1) {
      const positions = Array.from({ length: candidate.term.length }, (_, offset) => start + offset);
      if (positions.every((position) => !occupied.has(position))) {
        positions.forEach((position) => occupied.add(position));
        found.push({ ...candidate.item, matchedText: candidate.term });
        break;
      }
      start += 1;
    }
  }
  return found;
}
