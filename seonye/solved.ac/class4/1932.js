//2차원 dp

const path = require('path');
const fs = require('fs');
const input = fs
  .readFileSync(path.join(__dirname, 'dev', 'stdin'))
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.trim());

const N = Number(input[0]);
const arr = Array.from({ length: N }, () => new Array(N).fill(0));
for (let i = 0; i < N; i++) {
  arr[i].splice(0, i + 1, ...input[i + 1].split(' ').map(Number));
}

const dp = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));
dp[1][1] = arr[0][0];

for (let i = 2; i < N + 1; i++) {
  for (let j = 1; j < i + 1; j++) {
    if (j === 1) {
      dp[i][j] = dp[i - 1][j];
    } else if (j === i) dp[i][j] = dp[i - 1][j - 1];
    else {
      dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
    }
    dp[i][j] += arr[i - 1][j - 1];
  }
}

console.log(Math.max(...dp[N]));
