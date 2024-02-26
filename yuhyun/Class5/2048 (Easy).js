const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, table) {
  const LIMIT = 5;
  const EMPTY = 0;
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  return backtracking(0, table);

  function backtracking(depth, table) {
    if (depth === LIMIT) {
      return Math.max(...table.flat());
    }

    return Math.max(...DIRECTIONS.map((dir) => backtracking(depth + 1, merge(dir, table))));
  }

  function merge([dr, dc], table) {
    const queue = createQueue();

    const tiles = getTiles(table);
    tiles.sort(([rowA, colA], [rowB, colB]) => (rowA - rowB) * -dr || (colA - colB) * -dc);
    tiles.forEach((tile) => queue.push(tile));

    const merged = Array.from(Array(N), () => Array(N).fill(false));
    const result = table.map((row) => [...row]);
    const outOfRange = (row, col) => row < 0 || col < 0 || N <= row || N <= col;

    while (!queue.isEmpty()) {
      const [row, col] = queue.pop();

      const nr = row + dr;
      const nc = col + dc;

      if (outOfRange(nr, nc)) {
        continue;
      }

      if (result[nr][nc] === EMPTY) {
        result[nr][nc] = result[row][col];
        result[row][col] = EMPTY;
        queue.push([nr, nc]);
        continue;
      }

      if (result[nr][nc] !== result[row][col] || merged[nr][nc]) {
        continue;
      }

      result[nr][nc] += result[row][col];
      merged[nr][nc] = true;
      result[row][col] = EMPTY;
    }

    return result;
  }

  function getTiles(table) {
    const tiles = [];
    table.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell !== EMPTY) {
          tiles.push([rowIndex, colIndex]);
        }
      })
    );
    return tiles;
  }

  function createQueue() {
    let head = 0;
    const queue = [];

    const isEmpty = () => {
      return queue.length === head;
    };

    const push = (value) => {
      queue.push(value);
    };

    const pop = () => {
      return isEmpty() ? null : queue[head++];
    };

    return { isEmpty, push, pop };
  }
}

const N = Number(input.shift());
const table = input.map((line) => line.split(" ").map(Number));
console.log(solution(N, table));
