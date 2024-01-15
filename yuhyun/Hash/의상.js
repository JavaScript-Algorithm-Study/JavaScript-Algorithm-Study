function solution(clothes) {
  const clothesCountMap = new Map();
  clothes.forEach(([_, category]) => {
    const prevCount = clothesCountMap.get(category) ?? 0;
    clothesCountMap.set(category, prevCount + 1);
  });

  return (
    [...clothesCountMap].reduce((acc, [_, count]) => acc * (count + 1), 1) - 1
  );
}
