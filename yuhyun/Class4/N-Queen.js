const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N) {
  const createVisited = () => {
    const colSet = new Set();
    const sumSet = new Set();
    const subtractSet = new Set();

    const has = (row, col) => {
      return colSet.has(col) || sumSet.has(row + col) || subtractSet.has(row - col);
    };

    const add = (row, col) => {
      colSet.add(col);
      sumSet.add(row + col);
      subtractSet.add(row - col);
    };

    const remove = (row, col) => {
      colSet.delete(col);
      sumSet.delete(row + col);
      subtractSet.delete(row - col);
    };

    return { has, add, remove };
  };

  const backtracking = (row, nQueen, N, visited) => {
    if (row === N) {
      return nQueen === N ? 1 : 0;
    }

    let result = 0;
    for (let col = 0; col < N; col += 1) {
      if (visited.has(row, col)) {
        continue;
      }
      visited.add(row, col);
      result += backtracking(row + 1, nQueen + 1, N, visited);
      visited.remove(row, col);
    }
    return result;
  };

  return backtracking(0, 0, N, createVisited());
}
const N = Number(input[0]);
console.log(solution(N));
