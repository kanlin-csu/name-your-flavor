export function hashName(input) {
  let cuisineHash = 0;
  let tasteHash = 7;
  let textureHash = 13;
  let methodHash = 19;
  let index = 0;

  for (const char of input) {
    const value = char.codePointAt(0);
    cuisineHash = (cuisineHash * 31 + value) % 1000003;
    tasteHash = (tasteHash * 17 + value + index) % 1000033;
    textureHash = (textureHash * 13 + value * (index + 1)) % 1000037;
    methodHash = (methodHash * 29 + value + index * 7) % 1000039;
    index += 1;
  }

  return { cuisineHash, tasteHash, textureHash, methodHash };
}

export function stableTieScore(nameHash, foodId) {
  const text = `${nameHash}:${foodId}`;
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  return (hash % 1000) / 1000;
}
