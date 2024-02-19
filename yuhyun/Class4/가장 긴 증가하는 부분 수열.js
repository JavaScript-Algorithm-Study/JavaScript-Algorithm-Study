const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, sequence) {
  const prefix = Array(N).fill(1);
  for (let cur = 1; cur < N; cur += 1) {
    const curNum = sequence[cur];
    for (let prev = cur - 1; prev >= 0; prev -= 1) {
      const prevNum = sequence[prev];
      if (prevNum >= curNum) {
        continue;
      }

      prefix[cur] = Math.max(prefix[cur], prefix[prev] + 1);
    }
  }

  return Math.max(...prefix);
}

const N = Number(input.splice(0, 1));
const sequence = input[0].split(" ").map(Number);
console.log(solution(N, sequence));
