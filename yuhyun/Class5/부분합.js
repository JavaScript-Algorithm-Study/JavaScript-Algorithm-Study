const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, S, sequence) {
  let minLength = Infinity;
  let end = 1;
  let acc = sequence[end - 1];
  for (let start = 0; start < N; start += 1) {
    while (acc < S && end < N) {
      acc += sequence[end];
      end += 1;
    }
    if (acc >= S) {
      minLength = Math.min(minLength, end - start);
    }
    acc -= sequence[start];
  }
  return minLength === Infinity ? 0 : minLength;
}

const [N, S] = input.shift().split(" ").map(Number);
const sequence = input[0].split(" ").map(Number);
console.log(solution(N, S, sequence));
