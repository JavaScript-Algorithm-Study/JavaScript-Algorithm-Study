const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, K, items) {
  items.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const dp = Array.from({ length: K + 1 }, () => Array(N + 1).fill(0));

  for (let i = 1; i < K + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      const [W, V] = items[j - 1];
      if (i - W >= 0) dp[i][j] = Math.max(dp[i - W][j - 1] + V, dp[i][j - 1]);
      else dp[i][j] = dp[i][j - 1];
    }
  }

  return dp[K][N];
}

const [N, K] = input[0].split(' ').map(Number);
const items = input.slice(1, 1 + N).map((item) => item.split(' ').map(Number));

console.log(solution(N, K, items));
