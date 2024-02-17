//2차원 DP

const path = require('path');
const fs = require('fs');
const input = fs
  .readFileSync(path.join(__dirname, 'dev', 'stdin'))
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.trim());

const N = Number(input[0]);
const arr = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));
const dp = Array.from({ length: N + 1 }, () => new Array(3));
dp[0] = [0, 0, 0];

for (let i = 1; i < N + 1; i++) {
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + arr[i - 1][0];
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + arr[i - 1][1];
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + arr[i - 1][2];
}

console.log(Math.min(...dp[N]));
