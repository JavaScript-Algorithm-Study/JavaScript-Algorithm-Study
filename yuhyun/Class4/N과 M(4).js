const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N, M) {
  const get중복조합 = (arr, length) => {
    if (length === 1) {
      return arr.map((v) => [v]);
    }

    const result = [];
    arr.forEach((v, index) => {
      get중복조합(arr.slice(index), length - 1).forEach((중복조합) =>
        result.push([v, ...중복조합])
      );
    });
    return result;
  };

  return get중복조합(
    Array.from(Array(N), (_, i) => i + 1),
    M
  )
    .map((중복조합) => 중복조합.join(" "))
    .join("\n");
}

const [N, M] = input.map(Number);
console.log(solution(N, M));
