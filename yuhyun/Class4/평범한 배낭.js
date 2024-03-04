const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(nItem, maxBag, items) {
  const dp = Array.from(Array(nItem), () => Array(maxBag + 1).fill(0));

  for (let i = 0; i < nItem; i += 1) {
    const [itemWeight, itemValue] = items[i];

    for (let bag = 1; bag < maxBag + 1; bag += 1) {
      dp[i][bag] = Math.max(
        dp?.[i - 1]?.[bag] ?? 0,
        dp[i]?.[bag] ?? 0,
        bag < itemWeight ? 0 : (dp?.[i - 1]?.[bag - itemWeight] ?? 0) + itemValue
      );
    }
  }

  return dp[nItem - 1][maxBag];
}

const [N, K] = input.shift().split(' ').map(Number);
const items = input.map((line) => line.split(' ').map(Number));
console.log(solution(N, K, items));
