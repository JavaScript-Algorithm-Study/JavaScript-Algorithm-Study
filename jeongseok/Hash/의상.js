function solution(clothes) {
  let answer = 1;

  const cMap = new Map();

  for (let i = 0; i < clothes.length; i++) {
    const [name, category] = clothes[i];

    cMap.set(category, cMap.get(category) + 1 || 1);
  }

  const cArray = Array.from(cMap);

  for (let i = 0; i < cArray.length; i++) {
    answer *= cArray[i][1] + 1;
  }

  return answer - 1;
}
