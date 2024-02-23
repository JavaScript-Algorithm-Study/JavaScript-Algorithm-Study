const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M) {
  const getCombination = (arr, length) => {
    if (length === 1) {
      return arr.map((v) => [v]);
    }

    const combinations = [];
    arr.forEach((v, index) => {
      getCombination(arr.slice(index + 1), length - 1).forEach((rest) =>
        combinations.push([v, ...rest])
      );
    });
    return combinations;
  };

  return getCombination(
    Array.from(Array(N), (_, i) => i + 1),
    M
  )
    .map((permutation) => permutation.join(" "))
    .join("\n");
}

const [N, M] = input[0].split(" ").map(Number);
console.log(solution(N, M));
