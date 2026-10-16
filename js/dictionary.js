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
  entry("virtue", ["嘉", "佳", "善", "仁", "誠", "信", "義"], "敦厚", "真誠溫厚，帶著踏實可靠的風味", "sweet:1 sour:0 spicy:0 savory:5 bitter:0 light:2", "crispy:1 soft:3 chewy:2 smooth:2 juicy:2", "taiwanese:4 japanese:2 korean:1 thai:0 chinese:4 italian:1 southeastAsian:0 dessert:0", "grill:2 fry:1 steam:3 stew:4 raw:0 bake:1", ["米", "豆腐", "雞肉", "白菜"]),
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
  entry("precious", ["珍", "貝", "貴", "瑞", "琪", "瑤", "璇"], "珍味", "精巧講究，每一口都值得細細品味", "sweet:2 sour:1 spicy:0 savory:3 bitter:1 light:3", "crispy:2 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:2 japanese:4 korean:1 thai:0 chinese:3 italian:2 southeastAsian:0 dessert:3", "grill:1 fry:1 steam:2 stew:2 raw:1 bake:3", ["栗子", "干貝", "香菇", "奶油"]),
  entry("season", ["春", "夏", "秋", "冬", "季", "節"], "時令", "順著季節品味，簡單自在而恰到好處", "sweet:2 sour:2 spicy:1 savory:2 bitter:0 light:3", "crispy:2 soft:2 chewy:1 smooth:1 juicy:3", "taiwanese:3 japanese:3 korean:1 thai:1 chinese:2 italian:1 southeastAsian:1 dessert:2", "grill:1 fry:1 steam:2 stew:3 raw:2 bake:2", ["南瓜", "柑橘", "筍", "莓果"]),
  entry("music", ["音", "歌", "舞", "笛"], "和鳴", "節奏柔和，甜鹹交錯得剛剛好", "sweet:2 sour:1 spicy:1 savory:3 bitter:1 light:2", "crispy:2 soft:2 chewy:2 smooth:2 juicy:1", "taiwanese:2 japanese:2 korean:2 thai:1 chinese:2 italian:3 southeastAsian:0 dessert:2", "grill:1 fry:2 steam:1 stew:1 raw:1 bake:3", ["起司", "番茄", "麵粉", "香草"]),
  entry("morning", ["曉", "旭", "露", "朝", "黎", "旦"], "晨光", "清新明快，像一頓舒服的早晨", "sweet:2 sour:1 spicy:0 savory:2 bitter:1 light:5", "crispy:3 soft:2 chewy:1 smooth:2 juicy:2", "taiwanese:2 japanese:2 korean:1 thai:0 chinese:1 italian:2 southeastAsian:0 dessert:3", "grill:1 fry:2 steam:1 stew:0 raw:1 bake:3", ["蛋", "吐司", "豆漿", "水果"]),
  entry("plants", ["楓", "柏", "杉", "柳", "荷", "桃"], "草木", "帶著植物的清新與自然香氣", "sweet:2 sour:1 spicy:0 savory:2 bitter:2 light:4", "crispy:2 soft:2 chewy:1 smooth:2 juicy:2", "taiwanese:2 japanese:4 korean:1 thai:1 chinese:2 italian:1 southeastAsian:0 dessert:2", "grill:1 fry:0 steam:2 stew:2 raw:2 bake:2", ["茶", "桃子", "蓮藕", "香草"]),
  entry("fruit", ["果", "柚", "橙", "梨", "杏", "莓"], "果香", "明亮果香中帶著酸甜交織的層次", "sweet:3 sour:4 spicy:0 savory:0 bitter:0 light:4", "crispy:2 soft:1 chewy:1 smooth:2 juicy:5", "taiwanese:2 japanese:3 korean:1 thai:2 chinese:1 italian:2 southeastAsian:2 dessert:4", "grill:0 fry:0 steam:0 stew:1 raw:5 bake:2", ["柚子", "柑橘", "梨子", "莓果"]),
  entry("radiance", ["霞", "虹", "彩", "耀", "曜", "璨"], "流光", "繽紛明亮，像日光映照出的色彩", "sweet:2 sour:2 spicy:0 savory:1 bitter:1 light:5", "crispy:2 soft:1 chewy:1 smooth:2 juicy:3", "taiwanese:2 japanese:3 korean:1 thai:1 chinese:1 italian:2 southeastAsian:1 dessert:3", "grill:1 fry:1 steam:1 stew:0 raw:3 bake:2", ["彩椒", "莓果", "柑橘", "香草"]),
  entry("waters", ["洲", "溪", "湖", "潭", "滄", "漪", "萍"], "溪湖", "清澈安定，像水面映著柔和光影", "sweet:1 sour:0 spicy:0 savory:2 bitter:1 light:5", "crispy:0 soft:2 chewy:0 smooth:5 juicy:4", "taiwanese:2 japanese:4 korean:0 thai:1 chinese:2 italian:0 southeastAsian:1 dessert:1", "grill:0 fry:0 steam:3 stew:4 raw:2 bake:0", ["昆布", "豆腐", "白蘿蔔", "茶"]),
  entry("virtue2", ["德", "禮", "忠", "孝", "廉", "恆"], "端正", "質樸端正，散發踏實而溫厚的氣息", "sweet:1 sour:0 spicy:0 savory:4 bitter:0 light:3", "crispy:1 soft:3 chewy:2 smooth:2 juicy:2", "taiwanese:4 japanese:2 korean:1 thai:0 chinese:4 italian:0 southeastAsian:0 dessert:0", "grill:1 fry:1 steam:3 stew:4 raw:0 bake:1", ["米", "豆類", "白菜", "香菇"]),
  entry("wisdom", ["哲", "倫", "睿", "悟", "知", "謙", "勤"], "睿思", "清醒而細膩，偏愛層次分明的滋味", "sweet:1 sour:1 spicy:0 savory:2 bitter:2 light:4", "crispy:1 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:1 japanese:4 korean:1 thai:0 chinese:3 italian:2 southeastAsian:0 dessert:2", "grill:0 fry:1 steam:2 stew:2 raw:2 bake:3", ["抹茶", "香菇", "蕎麥", "柚子"]),
  entry("serenity", ["平", "泰", "順", "吉", "祥", "穩"], "平和", "安穩順心，最適合舒服地慢慢品嚐", "sweet:2 sour:0 spicy:0 savory:2 bitter:0 light:4", "crispy:0 soft:3 chewy:1 smooth:4 juicy:2", "taiwanese:3 japanese:3 korean:0 thai:0 chinese:4 italian:0 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:3 stew:4 raw:0 bake:1", ["紅豆", "蓮子", "豆腐", "白蘿蔔"]),
  entry("grace", ["淑", "嫻", "敏", "婉", "妍", "麗"], "婉約", "柔美清雅，帶著細緻而不張揚的香氣", "sweet:3 sour:1 spicy:0 savory:1 bitter:1 light:4", "crispy:1 soft:3 chewy:0 smooth:4 juicy:2", "taiwanese:1 japanese:4 korean:1 thai:0 chinese:2 italian:1 southeastAsian:0 dessert:4", "grill:0 fry:0 steam:2 stew:2 raw:1 bake:3", ["桂花", "莓果", "豆花", "茉莉"]),
  entry("craft", ["巧", "妙", "純", "樸", "簡", "素"], "巧樸", "簡單俐落，讓食材本身的滋味好好說話", "sweet:1 sour:1 spicy:0 savory:3 bitter:0 light:4", "crispy:2 soft:2 chewy:1 smooth:2 juicy:2", "taiwanese:3 japanese:4 korean:0 thai:0 chinese:3 italian:1 southeastAsian:0 dessert:1", "grill:1 fry:1 steam:2 stew:2 raw:1 bake:1", ["豆腐", "米", "時蔬", "蕎麥"]),
  entry("music2", ["琴", "瑟", "簫", "笙", "磬"], "雅韻", "清雅有韻律，味道輕柔卻有回響", "sweet:2 sour:1 spicy:0 savory:2 bitter:1 light:4", "crispy:1 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:3 italian:1 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:2 stew:2 raw:1 bake:2", ["茉莉", "茶", "蓮子", "桂花"]),
  entry("sunshine", ["晴", "晗", "煦", "暉", "熠", "燦"], "晴朗", "溫暖明快，帶來像晴日般開朗的清爽感", "sweet:2 sour:2 spicy:0 savory:1 bitter:0 light:5", "crispy:2 soft:1 chewy:1 smooth:2 juicy:4", "taiwanese:2 japanese:3 korean:1 thai:1 chinese:1 italian:1 southeastAsian:1 dessert:2", "grill:1 fry:1 steam:1 stew:0 raw:3 bake:2", ["柑橘", "番茄", "莓果", "綠茶"]),
  entry("japanese-name", ["奈", "莉", "葵", "凛", "紗", "恵"], "和風", "帶著清雅細節，適合柔和的和風滋味", "sweet:2 sour:1 spicy:0 savory:2 bitter:1 light:4", "crispy:1 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:1 japanese:5 korean:1 thai:0 chinese:1 italian:0 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:2 stew:2 raw:2 bake:2", ["抹茶", "柚子", "豆腐", "海苔"]),
  entry("sky", ["天", "空", "穹", "霄", "蒼", "碧", "霧", "雷", "電"], "晴空", "開闊清朗，像雨後天空一樣透亮", "sweet:1 sour:1 spicy:0 savory:1 bitter:1 light:5", "crispy:2 soft:1 chewy:0 smooth:3 juicy:3", "taiwanese:1 japanese:4 korean:0 thai:1 chinese:1 italian:1 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:1 stew:1 raw:4 bake:1", ["薄荷", "青檸", "白蘿蔔", "綠茶"]),
  entry("rivers", ["江", "河", "瀑", "漣", "漾", "瀾", "滴", "潤", "沁"], "流泉", "清澈流動，帶著柔和而舒展的水意", "sweet:1 sour:0 spicy:0 savory:2 bitter:0 light:5", "crispy:0 soft:2 chewy:0 smooth:5 juicy:4", "taiwanese:3 japanese:4 korean:0 thai:1 chinese:2 italian:0 southeastAsian:1 dessert:1", "grill:0 fry:0 steam:3 stew:4 raw:2 bake:0", ["昆布", "蓮藕", "白蘿蔔", "茶"]),
  entry("woods", ["樺", "榕", "梧", "桐", "楠", "榆", "杉林", "松濤"], "林木", "沉靜厚實，像林間木香般自然安定", "sweet:1 sour:0 spicy:0 savory:4 bitter:1 light:3", "crispy:1 soft:2 chewy:3 smooth:1 juicy:2", "taiwanese:3 japanese:4 korean:0 thai:0 chinese:3 italian:1 southeastAsian:0 dessert:0", "grill:2 fry:1 steam:2 stew:4 raw:0 bake:1", ["香菇", "栗子", "蕎麥", "山藥"]),
  entry("blooms", ["薇", "蕙", "芷", "薰", "葦", "蕊", "苓", "茵", "蕾", "蓉"], "芳草", "清雅芬芳，像花草香氣輕輕浮現", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:5", "crispy:1 soft:2 chewy:0 smooth:3 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:1 chinese:2 italian:1 southeastAsian:0 dessert:4", "grill:0 fry:0 steam:2 stew:2 raw:2 bake:2", ["桂花", "茉莉", "薄荷", "蓮子"]),
  entry("grains", ["穗", "麥", "黍", "粟", "稷", "荳", "黍稷", "穀香"], "穀實", "飽滿樸實，帶著穀物日曬後的溫暖香氣", "sweet:2 sour:0 spicy:0 savory:4 bitter:0 light:2", "crispy:1 soft:3 chewy:2 smooth:1 juicy:1", "taiwanese:5 japanese:2 korean:1 thai:0 chinese:4 italian:1 southeastAsian:0 dessert:1", "grill:1 fry:1 steam:4 stew:3 raw:0 bake:2", ["米", "燕麥", "南瓜", "紅豆"]),
  entry("wild-land", ["野", "嶺", "嵐", "岑", "岫", "嶼", "嶙"], "曠野", "自在遼闊，像山野間清新的空氣", "sweet:1 sour:0 spicy:1 savory:3 bitter:1 light:4", "crispy:2 soft:2 chewy:2 smooth:1 juicy:2", "taiwanese:3 japanese:3 korean:0 thai:0 chinese:3 italian:0 southeastAsian:0 dessert:0", "grill:3 fry:1 steam:1 stew:3 raw:0 bake:1", ["野菇", "竹筍", "蕎麥", "山菜"]),
  entry("celestial", ["辰", "斗", "宿", "銀河", "星河", "星辰", "月華"], "星河", "遙遠而明亮，像夜空中的星光閃爍", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:4", "crispy:1 soft:2 chewy:0 smooth:4 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:2 italian:1 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:2 stew:2 raw:1 bake:2", ["銀耳", "桂花", "梨子", "茶"]),
  entry("colors-deep", ["藍", "黛", "墨", "丹", "絳", "緋", "褐", "赭", "琥", "橘", "黃", "綠"], "濃彩", "色彩深淺交映，帶來飽滿又醒目的印象", "sweet:2 sour:2 spicy:1 savory:2 bitter:1 light:2", "crispy:2 soft:1 chewy:1 smooth:1 juicy:3", "taiwanese:2 japanese:3 korean:2 thai:2 chinese:2 italian:1 southeastAsian:1 dessert:2", "grill:2 fry:2 steam:1 stew:1 raw:2 bake:1", ["紫米", "紅豆", "彩椒", "柑橘"]),
  entry("jewels", ["瑾", "瑜", "璟", "珊", "瑚", "璞", "琦", "璧", "琬", "琰"], "美玉", "溫潤珍貴，像玉石般細膩而有光澤", "sweet:2 sour:1 spicy:0 savory:2 bitter:1 light:3", "crispy:0 soft:3 chewy:1 smooth:5 juicy:2", "taiwanese:2 japanese:4 korean:0 thai:0 chinese:3 italian:1 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:2 stew:2 raw:1 bake:2", ["豆花", "銀耳", "芝麻", "栗子"]),
  entry("birds", ["鳳", "凰", "鶴", "鵬", "燕", "鴻", "鷺", "鶯", "鸞", "鵲"], "翔羽", "輕盈舒展，帶著清雅自在的氣息", "sweet:1 sour:1 spicy:0 savory:2 bitter:0 light:4", "crispy:2 soft:2 chewy:1 smooth:2 juicy:2", "taiwanese:2 japanese:4 korean:0 thai:0 chinese:3 italian:0 southeastAsian:0 dessert:1", "grill:1 fry:1 steam:2 stew:2 raw:1 bake:1", ["茶", "香菇", "蓮子", "竹筍"]),
  entry("creatures", ["龍", "麟", "鹿", "蝶", "鯉", "鯨", "鷗", "駿", "驥"], "靈獸", "靈動有力，鮮明中帶著悠然的節奏", "sweet:1 sour:1 spicy:1 savory:3 bitter:0 light:2", "crispy:2 soft:1 chewy:2 smooth:1 juicy:3", "taiwanese:2 japanese:3 korean:1 thai:1 chinese:3 italian:1 southeastAsian:1 dessert:1", "grill:2 fry:1 steam:2 stew:2 raw:1 bake:1", ["海苔", "香菇", "柑橘", "胡椒"]),
  entry("virtues-gentle", ["良", "淳", "敦", "厚", "謹", "惠", "讓", "恕"], "淳厚", "待人真摯溫厚，味道也樸實而耐人尋味", "sweet:1 sour:0 spicy:0 savory:4 bitter:0 light:3", "crispy:1 soft:3 chewy:2 smooth:2 juicy:2", "taiwanese:4 japanese:2 korean:0 thai:0 chinese:4 italian:0 southeastAsian:0 dessert:0", "grill:1 fry:1 steam:3 stew:4 raw:0 bake:1", ["米", "豆腐", "白菜", "香菇"]),
  entry("virtues-bright", ["卓", "賢", "達", "宏", "遠", "博", "勉", "勵", "勳", "正"], "卓然", "志向清楚、步調堅定，喜歡俐落鮮明的滋味", "sweet:0 sour:1 spicy:1 savory:4 bitter:0 light:2", "crispy:2 soft:1 chewy:3 smooth:1 juicy:2", "taiwanese:3 japanese:2 korean:1 thai:0 chinese:3 italian:1 southeastAsian:0 dessert:0", "grill:3 fry:2 steam:1 stew:2 raw:0 bake:1", ["胡椒", "麵食", "香菇", "蒜"]),
  entry("feelings", ["愛", "心", "情", "夢", "願", "念", "悠", "愉", "暢", "惜"], "心意", "細膩真誠，藏著溫柔而悠長的情意", "sweet:3 sour:1 spicy:0 savory:1 bitter:0 light:4", "crispy:0 soft:3 chewy:0 smooth:4 juicy:2", "taiwanese:2 japanese:3 korean:0 thai:0 chinese:2 italian:0 southeastAsian:0 dessert:4", "grill:0 fry:0 steam:2 stew:3 raw:0 bake:2", ["紅豆", "桂花", "蓮子", "蜂蜜"]),
  entry("quiet", ["靜", "恬", "幽", "淡", "逸", "閒", "寂", "澹", "悠然"], "恬靜", "清淡安寧，適合慢下腳步細細品味", "sweet:1 sour:0 spicy:0 savory:2 bitter:1 light:5", "crispy:0 soft:2 chewy:0 smooth:4 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:2 italian:0 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:3 stew:3 raw:1 bake:1", ["白蘿蔔", "豆腐", "綠茶", "蓮子"]),
  entry("seasons-late", ["暮", "夕", "晝", "夜", "宵", "曛", "霄夜", "黃昏"], "暮色", "從日光到夜色，散發沉靜而柔和的韻味", "sweet:1 sour:0 spicy:0 savory:2 bitter:1 light:3", "crispy:1 soft:2 chewy:1 smooth:3 juicy:2", "taiwanese:2 japanese:4 korean:0 thai:0 chinese:2 italian:1 southeastAsian:0 dessert:2", "grill:1 fry:0 steam:2 stew:3 raw:1 bake:1", ["茶", "栗子", "南瓜", "香菇"]),
  entry("herbs", ["茗", "馥", "醇", "醺", "蕎", "芹", "蔚", "芙", "荃", "蘅"], "草木馥郁", "香氣清楚悠長，草木與茶韻彼此交融", "sweet:1 sour:0 spicy:0 savory:2 bitter:2 light:4", "crispy:1 soft:2 chewy:1 smooth:3 juicy:1", "taiwanese:2 japanese:4 korean:0 thai:0 chinese:2 italian:1 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:2 stew:2 raw:1 bake:2", ["茶", "薄荷", "香草", "蕎麥"]),
  entry("craft-material", ["陶", "瓷", "錦", "繡", "織", "琢", "雕", "琉", "璃", "緻"], "匠心", "講究細節與手感，像一道精心完成的料理", "sweet:2 sour:1 spicy:0 savory:2 bitter:1 light:3", "crispy:2 soft:2 chewy:1 smooth:3 juicy:1", "taiwanese:2 japanese:4 korean:0 thai:0 chinese:3 italian:2 southeastAsian:0 dessert:2", "grill:1 fry:1 steam:2 stew:1 raw:0 bake:3", ["芝麻", "栗子", "香菇", "桂花"]),
  entry("dawn-dusk", ["初", "曙", "黎明", "朝陽", "夕照", "晨曦", "暮光"], "晨昏", "在一天的起點或尾聲，留下舒服的香氣", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:4", "crispy:2 soft:2 chewy:1 smooth:2 juicy:2", "taiwanese:2 japanese:3 korean:0 thai:0 chinese:1 italian:1 southeastAsian:0 dessert:2", "grill:1 fry:1 steam:2 stew:1 raw:1 bake:2", ["柑橘", "茶", "吐司", "莓果"]),
  entry("flavor-words", ["甘露", "清泉", "晨光", "月色", "花影", "竹影", "松風", "秋水"], "詩意", "帶著詩意的景象，讓風味也顯得悠然細緻", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:4", "crispy:1 soft:2 chewy:0 smooth:4 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:2 italian:0 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:2 stew:2 raw:2 bake:2", ["桂花", "梨子", "綠茶", "蓮子"]),
  entry("english-nature", ["river", "ocean", "brook", "forest", "willow", "maple", "cedar", "meadow"], "自然", "清新自在，像自然景色般舒展明亮", "sweet:1 sour:1 spicy:0 savory:2 bitter:1 light:5", "crispy:1 soft:2 chewy:1 smooth:3 juicy:3", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:1 italian:1 southeastAsian:0 dessert:2", "grill:1 fry:0 steam:2 stew:2 raw:3 bake:1", ["茶", "香菇", "柑橘", "蕎麥"]),
  entry("english-flowers", ["rose", "lily", "iris", "violet", "daisy", "flora", "blossom", "bloom"], "花漾", "花香明媚，帶著柔和輕盈的甜美感", "sweet:3 sour:1 spicy:0 savory:0 bitter:0 light:4", "crispy:1 soft:3 chewy:0 smooth:3 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:1 italian:1 southeastAsian:0 dessert:4", "grill:0 fry:0 steam:1 stew:1 raw:2 bake:3", ["玫瑰", "桂花", "莓果", "蜂蜜"]),
  entry("english-light", ["dawn", "sunny", "sunrise", "stella", "luna", "skye", "celeste", "aurora"], "星光", "明亮優雅，像晨曦與星光映照的清透感", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:5", "crispy:2 soft:1 chewy:0 smooth:3 juicy:3", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:1 italian:1 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:1 stew:1 raw:3 bake:2", ["柑橘", "綠茶", "莓果", "銀耳"]),
  entry("english-gem", ["jade", "ruby", "pearl", "amber", "crystal", "opal", "gemma", "coral"], "寶石", "精巧珍貴，像一顆透亮寶石般閃耀", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:3", "crispy:1 soft:2 chewy:0 smooth:4 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:2 italian:1 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:2 stew:1 raw:2 bake:2", ["銀耳", "桂花", "莓果", "豆花"]),
  entry("english-seasons", ["summer", "autumn", "winter", "spring", "april", "may", "june", "july", "august"], "四季", "順著季節轉換，帶來恰到好處的清新滋味", "sweet:2 sour:2 spicy:0 savory:1 bitter:0 light:4", "crispy:2 soft:2 chewy:1 smooth:2 juicy:3", "taiwanese:2 japanese:3 korean:0 thai:1 chinese:1 italian:1 southeastAsian:1 dessert:3", "grill:1 fry:1 steam:1 stew:1 raw:2 bake:2", ["當季水果", "南瓜", "茶", "莓果"]),
  entry("weather", ["霏", "霽", "霓", "霰", "霆", "颯", "颺", "飆"], "風雲", "天光雲影變化萬千，清新之中帶著靈動", "sweet:1 sour:1 spicy:0 savory:1 bitter:1 light:5", "crispy:2 soft:1 chewy:0 smooth:3 juicy:3", "taiwanese:1 japanese:4 korean:0 thai:1 chinese:1 italian:0 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:1 stew:1 raw:4 bake:1", ["薄荷", "青檸", "茶", "梨子"]),
  entry("new-plants", ["菁", "萱", "蓁", "莘", "芮", "芊", "芃", "蔓", "薔"], "繁茂", "生意盎然，像春日枝葉舒展的清新氣息", "sweet:2 sour:1 spicy:0 savory:2 bitter:1 light:4", "crispy:2 soft:2 chewy:1 smooth:2 juicy:2", "taiwanese:2 japanese:4 korean:0 thai:1 chinese:2 italian:0 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:2 stew:2 raw:2 bake:1", ["時蔬", "香草", "綠茶", "蓮藕"]),
  entry("orchard", ["棗", "柿", "榴", "菱", "枇", "杷", "楂", "榛", "荔"], "果園", "果香飽滿，酸甜之間有著自然的豐收感", "sweet:3 sour:3 spicy:0 savory:0 bitter:0 light:4", "crispy:2 soft:2 chewy:1 smooth:2 juicy:4", "taiwanese:2 japanese:2 korean:0 thai:1 chinese:2 italian:1 southeastAsian:1 dessert:4", "grill:0 fry:0 steam:0 stew:1 raw:4 bake:2", ["柿子", "紅棗", "荔枝", "栗子"]),
  entry("benevolence", ["慈", "睦", "寬", "敬", "誼", "恭", "禎", "祺", "佑", "祐"], "仁厚", "寬和待人，讓人感到親切、穩妥而安心", "sweet:2 sour:0 spicy:0 savory:3 bitter:0 light:3", "crispy:0 soft:3 chewy:1 smooth:3 juicy:2", "taiwanese:4 japanese:2 korean:0 thai:0 chinese:4 italian:0 southeastAsian:0 dessert:1", "grill:0 fry:0 steam:3 stew:4 raw:0 bake:1", ["米", "蓮子", "豆腐", "紅豆"]),
  entry("emotions", ["靈", "緣", "慕", "怜", "盼", "恩", "愫", "愷", "悌", "忻"], "情意", "情感真摯細緻，帶著溫暖而柔和的甜味", "sweet:3 sour:1 spicy:0 savory:1 bitter:0 light:3", "crispy:0 soft:3 chewy:0 smooth:4 juicy:2", "taiwanese:2 japanese:3 korean:0 thai:0 chinese:2 italian:0 southeastAsian:0 dessert:4", "grill:0 fry:0 steam:2 stew:3 raw:0 bake:2", ["桂花", "蜂蜜", "蓮子", "莓果"]),
  entry("brilliance", ["俊", "彥", "英", "雄", "昱", "昭", "顯", "皓", "皎", "朗"], "俊朗", "明朗出眾，帶著俐落清晰的鮮明印象", "sweet:1 sour:1 spicy:1 savory:3 bitter:0 light:3", "crispy:2 soft:1 chewy:2 smooth:1 juicy:2", "taiwanese:2 japanese:2 korean:1 thai:0 chinese:3 italian:1 southeastAsian:0 dessert:1", "grill:2 fry:1 steam:1 stew:1 raw:1 bake:1", ["胡椒", "柑橘", "香菇", "海苔"]),
  entry("graceful-names", ["婕", "媛", "娟", "嫣", "姿", "伶", "俐", "婷", "娥", "姝", "嬋"], "秀雅", "優雅明麗，細節輕盈而有恰到好處的香氣", "sweet:2 sour:1 spicy:0 savory:1 bitter:1 light:4", "crispy:1 soft:3 chewy:0 smooth:3 juicy:2", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:2 italian:1 southeastAsian:0 dessert:3", "grill:0 fry:0 steam:2 stew:1 raw:1 bake:3", ["桂花", "茉莉", "莓果", "豆花"]),
  entry("creative-names", ["才", "藝", "彬", "斐", "翰", "翎", "翊", "翰林", "采", "奕"], "才藝", "巧思與美感交會，帶來層次豐富的風味", "sweet:1 sour:1 spicy:0 savory:2 bitter:1 light:3", "crispy:2 soft:2 chewy:1 smooth:2 juicy:1", "taiwanese:2 japanese:3 korean:0 thai:0 chinese:3 italian:2 southeastAsian:0 dessert:2", "grill:1 fry:1 steam:1 stew:1 raw:0 bake:3", ["香草", "起司", "蘑菇", "麵粉"]),
  entry("garden-scenes", ["庭", "軒", "閣", "亭", "榭", "廬", "宸", "宇"], "庭院", "從容閒適，像在庭園一隅享受一席好味", "sweet:1 sour:0 spicy:0 savory:2 bitter:1 light:4", "crispy:1 soft:2 chewy:0 smooth:3 juicy:2", "taiwanese:2 japanese:4 korean:0 thai:0 chinese:3 italian:0 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:2 stew:2 raw:1 bake:1", ["茶", "蓮子", "白蘿蔔", "香菇"]),
  entry("english-names", ["emma", "olivia", "sophia", "ava", "chloe", "mia", "emily", "ella"], "明媚", "明亮柔和，適合甜香清新又親切的風味", "sweet:2 sour:1 spicy:0 savory:1 bitter:0 light:4", "crispy:1 soft:3 chewy:0 smooth:3 juicy:2", "taiwanese:1 japanese:3 korean:0 thai:0 chinese:1 italian:1 southeastAsian:0 dessert:4", "grill:0 fry:0 steam:1 stew:1 raw:1 bake:3", ["莓果", "蜂蜜", "香草", "桂花"]),
  entry("english-green", ["leaf", "breeze", "lake", "snow", "fern", "clover", "ivy", "sage"], "清新自然", "清爽自然，像微風穿過綠葉般舒心自在", "sweet:1 sour:1 spicy:0 savory:1 bitter:1 light:5", "crispy:2 soft:1 chewy:0 smooth:3 juicy:3", "taiwanese:1 japanese:4 korean:0 thai:0 chinese:1 italian:0 southeastAsian:0 dessert:2", "grill:0 fry:0 steam:1 stew:1 raw:3 bake:1", ["薄荷", "茶", "香草", "青檸"]),
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
