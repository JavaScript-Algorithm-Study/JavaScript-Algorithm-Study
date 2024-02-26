const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, table) {
  const WALL = 1;
  const VIRUS = 2;
  const N_NEW_WALL = 3;

  let nWall = 0;
  const emptyIndices = [];
  const viruses = [];
  table.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell === VIRUS) {
        viruses.push([rowIndex, colIndex]);
        return;
      }
      if (cell === WALL) {
        nWall += 1;
        return;
      }
      emptyIndices.push([rowIndex, colIndex]);
    })
  );

  const wallCombinations = getCombination(emptyIndices, N_NEW_WALL);
  return (
    N * M -
    nWall -
    N_NEW_WALL -
    Math.min(
      ...wallCombinations.map((walls) => {
        const copied = table.map((row) => [...row]);
        walls.forEach(([row, col]) => (copied[row][col] = WALL));
        return countViruses(viruses, copied);
      })
    )
  );

  function countViruses(viruses, table) {
    const WALL = 1;
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const N = table.length;
    const M = table[0].length;

    const queue = createQueue();
    const visited = Array.from(Array(N), () => Array(M).fill(false));
    viruses.forEach(([row, col]) => {
      queue.push([row, col]);
      visited[row][col] = true;
    });
    const outOfRange = (row, col) => row < 0 || col < 0 || N <= row || M <= col;

    let result = viruses.length;
    while (!queue.isEmpty()) {
      const [row, col] = queue.pop();
      directions
        .map(([dr, dc]) => [row + dr, col + dc])
        .filter(([nr, nc]) => !outOfRange(nr, nc) && !visited[nr][nc] && table[nr][nc] !== WALL)
        .forEach(([nr, nc]) => {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
          result += 1;
        });
    }
    return result;
  }

  function getCombination(arr, length) {
    if (length === 1) {
      return arr.map((v) => [v]);
    }
    const result = [];
    arr.forEach((v, index) => {
      getCombination(arr.slice(index + 1), length - 1).forEach((combination) =>
        result.push([v, ...combination])
      );
    });
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
}

const [N, M] = input.shift().split(" ").map(Number);
const table = input.map((line) => line.split(" ").map(Number));
console.log(solution(N, M, table));
