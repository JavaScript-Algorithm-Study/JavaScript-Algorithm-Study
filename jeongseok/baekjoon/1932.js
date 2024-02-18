const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const n = +input[0];

const arr = Array.from(Array(n + 1), () => []);
const dp = Array.from(Array(n + 1), () => []);

for (let i = 0; i < n; i++) {
  arr[i + 1] = input[i + 1].split(" ").map(Number);
}

dp[1][0] = arr[1][0];
for (let i = 2; i < n + 1; i++) {
  for (let j = 0; j < i; j++) {
    // 좌변
    if (j === 0) {
      dp[i][0] = dp[i - 1][0] + arr[i][0];
    }
    // 우변
    else if (j === i - 1) {
      dp[i][j] = dp[i - 1][j - 1] + arr[i][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + arr[i][j];
    }
  }
}

console.log(Math.max(...dp[n]));
