// dp[i] : i번째 이전에 i번째 원소보다 작은 원소들의 갯수 + 1

const path = require('path');
const fs = require('fs');
const input = fs
  .readFileSync(path.join(__dirname, 'dev', 'stdin'))
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.trim());

const A = Number(input[0]);
const arr = input[1].split(' ').map(Number);
const dp = new Array(A).fill(0);

for (let i = 0; i < A; i++) {
  let maxLen = 0;
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j] && dp[j] > maxLen) maxLen = dp[j];
  }
  dp[i] = maxLen + 1;
}

console.log(Math.max(...dp));
