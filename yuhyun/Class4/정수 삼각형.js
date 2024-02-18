const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, triangle) {
  const dp = triangle.map((row) => [...row]);
  for (let level = 1; level < n; level += 1) {
    const { length } = dp[level];
    for (let index = 0; index < length; index += 1) {
      dp[level][index] += Math.max(dp[level - 1]?.[index - 1] ?? 0, dp[level - 1]?.[index] ?? 0);
    }
  }
  return Math.max(...dp.at(-1));
}

const n = Number(input.splice(0, 1));
const triangle = input.map((line) => line.split(" ").map(Number));
console.log(solution(n, triangle));
