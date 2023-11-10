function solution(stones, k) {
  let left = 1;
  let right = 200_000_000;
  const { length } = stones;

  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);

    let curK = 0;
    for (let i = 0; i < length; i++) {
      if (stones[i] >= mid) {
        curK = 0;
        continue;
      }

      curK += 1;

      if (curK >= k) {
        break;
      }
    }

    if (curK < k) {
      left = mid;
      continue;
    }

    right = mid;
  }

  return left;
}
