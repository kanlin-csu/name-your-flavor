const WIDTH = 1200;
const HEIGHT = 1600;
const COLORS = {
  background: "#fffaf2",
  text: "#332820",
  muted: "#75685e",
  primary: "#b94f32",
  accent: "#d99a3e",
  border: "#eadfd3",
  surface: "#ffffff",
  soft: "#f7f0e6"
};

function roundedRect(context, x, y, width, height, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

function wrapText(context, text, maxWidth) {
  const lines = [];
  for (const paragraph of String(text).split("\n")) {
    if (!paragraph) {
      lines.push("");
      continue;
    }
    let line = "";
    for (const character of Array.from(paragraph)) {
      const candidate = line + character;
      if (line && context.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = character;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines) {
  const lines = wrapText(context, text, maxWidth);
  const shown = lines.slice(0, maxLines);
  if (lines.length > maxLines && shown.length) {
    let last = shown[shown.length - 1];
    while (last && context.measureText(`${last}…`).width > maxWidth) {
      last = Array.from(last).slice(0, -1).join("");
    }
    shown[shown.length - 1] = `${last}…`;
  }
  shown.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
  return shown.length;
}

export function drawResultCard(context, result, story) {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = COLORS.accent;
  context.beginPath();
  context.arc(1080, 78, 140, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#f7ead7";
  context.beginPath();
  context.arc(1080, 78, 112, 0, Math.PI * 2);
  context.fill();

  context.textAlign = "left";
  context.fillStyle = COLORS.primary;
  context.font = '700 24px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  context.fillText("名字的味道", 76, 82);
  context.fillStyle = COLORS.muted;
  context.font = '500 14px Arial, sans-serif';
  context.fillText("NAME YOUR FLAVOR", 78, 108);
  context.fillStyle = COLORS.muted;
  context.font = '500 18px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  context.fillText("專屬美食配對", 76, 168);
  context.fillStyle = COLORS.text;
  context.font = '700 48px "Noto Serif TC", "Microsoft JhengHei", serif';
  drawWrappedText(context, `${result.normalizedName}的味道`, 76, 232, 1000, 60, 1);

  roundedRect(context, 64, 280, 1072, 570, 30, COLORS.surface);
  const hero = result.featured;
  const gradient = context.createLinearGradient(88, 304, 1112, 540);
  gradient.addColorStop(0, "#f7ead7");
  gradient.addColorStop(1, "#fff7e9");
  roundedRect(context, 88, 304, 1024, 238, 22, gradient);
  context.textAlign = "center";
  context.font = '128px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  context.fillText(hero.emoji, 600, 472);
  context.textAlign = "left";
  context.fillStyle = COLORS.primary;
  context.font = '600 18px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  context.fillText("你的代表美食", 104, 590);
  context.fillStyle = COLORS.text;
  context.font = '700 40px "Noto Serif TC", "Microsoft JhengHei", serif';
  context.fillText(hero.name, 104, 644);
  context.fillStyle = COLORS.muted;
  context.font = '400 19px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  drawWrappedText(context, hero.description, 104, 686, 980, 31, 2);
  context.fillStyle = "#8d6546";
  context.font = '400 19px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  drawWrappedText(context, story, 104, 758, 980, 31, 2);

  context.fillStyle = COLORS.primary;
  context.font = '700 21px "Noto Serif TC", "Microsoft JhengHei", serif';
  context.fillText("也很適合你的味道", 72, 914);
  const foods = result.recommendations.slice(0, 4);
  foods.forEach((food, index) => {
    const y = 950 + index * 88;
    roundedRect(context, 64, y, 1072, 72, 16, COLORS.surface);
    roundedRect(context, 78, y + 9, 54, 54, 12, COLORS.soft);
    context.textAlign = "center";
    context.font = '32px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    context.fillStyle = COLORS.text;
    context.fillText(food.emoji, 105, y + 48);
    context.textAlign = "left";
    context.fillStyle = COLORS.text;
    context.font = '600 21px "Noto Serif TC", "Microsoft JhengHei", serif';
    context.fillText(food.name, 154, y + 44);
    context.fillStyle = COLORS.muted;
    context.font = '400 15px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
    context.fillText(food.description, 450, y + 43, 650);
  });

  context.strokeStyle = COLORS.border;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(72, 1330);
  context.lineTo(1128, 1330);
  context.stroke();
  context.fillStyle = COLORS.muted;
  context.font = '400 17px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  drawWrappedText(
    context,
    "配對結果由文字意象與固定演算法產生，僅供娛樂及美食探索，不代表人格、健康或營養判斷。",
    76, 1374, 1048, 29, 2
  );
  context.fillStyle = COLORS.primary;
  context.font = '600 17px "Noto Sans TC", "Microsoft JhengHei", sans-serif';
  context.fillText("name-your-flavor", 76, 1472);
  context.textAlign = "right";
  context.fillStyle = COLORS.muted;
  context.font = '400 15px Arial, sans-serif';
  context.fillText("A LITTLE TASTE OF YOU", 1124, 1472);
  context.textAlign = "left";
}

export function createResultImage(result, story) {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("canvas-unavailable");
  drawResultCard(context, result, story);
  return new Promise((resolve, reject) => {
    if (typeof canvas.toBlob !== "function") {
      reject(new Error("image-export-unavailable"));
      return;
    }
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("image-export-failed"));
    }, "image/png");
  });
}
