const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, table) {
  const EMPTY = ".";
  const GOAL = "O";
  const RED = "R";
  const BLUE = "B";
  const DIRECTION = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };
  const NEXT_DIRECTIONS = {
    init: ["up", "down", "left", "right"],
    up: ["left", "right"],
    down: ["left", "right"],
    left: ["down", "up"],
    right: ["down", "up"],
  };

  const LIMIT = 10;

  const result = backtracking(0, NEXT_DIRECTIONS.init, table);
  return result === Infinity ? -1 : result;

  function backtracking(depth, directions, table) {
    if (depth === LIMIT) {
      return Infinity;
    }

    const balls = getBalls(table);

    return Math.min(
      ...directions.map((type) => {
        const dir = DIRECTION[type];
        const tiltedTable = tilt(dir, balls, table);
        const nextBalls = getBalls(tiltedTable);
        if (nextBalls.length === 0) {
          return Infinity;
        }

        if (nextBalls.length === 1) {
          const [row, col] = nextBalls[0];
          return tiltedTable[row][col] === BLUE ? 1 : Infinity;
        }

        return 1 + backtracking(depth + 1, NEXT_DIRECTIONS[type], tiltedTable);
      })
    );
  }

  function tilt([dr, dc], balls, table) {
    const N = table.length;
    const M = table[0].length;
    const outOfRange = (row, col) => row < 0 || col < 0 || N <= row || M <= col;

    const sortedBalls = [...balls];
    sortedBalls.sort(([rowA, colA], [rowB, colB]) => (rowA - rowB) * -dr || (colA - colB) * -dc);

    const result = table.map((row) => [...row]);

    const queue = createQueue();
    sortedBalls.forEach((coord) => queue.push(coord));

    while (!queue.isEmpty()) {
      const [row, col] = queue.pop();

      const nr = row + dr;
      const nc = col + dc;

      if (outOfRange(nr, nc) || (result[nr][nc] !== EMPTY && result[nr][nc] !== GOAL)) {
        continue;
      }

      if (result[nr][nc] !== GOAL) {
        result[nr][nc] = result[row][col];
        queue.push([nr, nc]);
      }
      result[row][col] = EMPTY;
    }
    return result;
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

  function getBalls(table) {
    const result = [];
    table.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell === RED || cell === BLUE) {
          result.push([rowIndex, colIndex]);
        }
      })
    );
    return result;
  }
}

const [N, M] = input.shift().split(" ").map(Number);
const table = input.map((line) => line.split(""));
console.log(solution(N, M, table));
