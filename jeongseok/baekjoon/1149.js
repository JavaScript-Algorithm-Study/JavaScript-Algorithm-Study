const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];

// dp[i][j] : i번째 집을 i로 칠했을때 비용
// 0 : r, 1 : g, 2 : b
const dp = Array.from(Array(N + 1), () => Array(3).fill(0));

for (let i = 1; i < N + 1; i++) {
  const [r, g, b] = input[i].split(" ").map(Number);

  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + r;
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + g;
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + b;
}

console.log(Math.min(...dp[N]));
