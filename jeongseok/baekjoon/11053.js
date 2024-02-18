const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");
const A = +input[0];
const numArr = input[1].split(" ").map(Number);

// dp[i] : i가 가장 큰 수 일때의 길이
const dp = new Array(A + 1).fill(1);

dp[0] = 0;

for (let i = 2; i < A + 1; i++) {
  for (let j = 1; j < i; j++) {
    if (numArr[i - 1] > numArr[j - 1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(Math.max(...dp));
