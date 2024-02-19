const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, costs) {
  const RED = 0;
  const GREEN = 1;
  const BLUE = 2;

  const dp = costs.map((houses) => [...houses]);

  for (let house = 1; house < N; house += 1) {
    dp[house][RED] += Math.min(dp[house - 1][GREEN], dp[house - 1][BLUE]);
    dp[house][GREEN] += Math.min(dp[house - 1][RED], dp[house - 1][BLUE]);
    dp[house][BLUE] += Math.min(dp[house - 1][RED], dp[house - 1][GREEN]);
  }

  return Math.min(...dp.at(-1));
}

const N = Number(input.splice(0, 1));
console.log(
  solution(
    N,
    input.map((line) => line.split(" ").map(Number))
  )
);
