const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, nCow, nRoad, roads, cows) {
  const roadSet = createRoadSet();
  roads.forEach(([rowA, colA, rowB, colB]) =>
    roadSet.add([rowA - 1, colA - 1], [rowB - 1, colB - 1])
  );

  const cowSet = createCowSet();
  cows.forEach(([row, col]) => cowSet.add([row - 1, col - 1]));

  const visited = Array.from(Array(N), () => Array(N).fill(false));

  let result = 0;
  for (let row = 0; row < N; row += 1) {
    for (let col = 0; col < N; col += 1) {
      if (visited[row][col]) {
        continue;
      }
      const subNCow = bfs(row, col, roadSet, cowSet, visited);
      result += subNCow * (nCow - subNCow);
    }
  }

  return result / 2;

  function bfs(row, col, roadSet, cowSet, visited) {
    const DIRECTIONS = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const queue = createQueue();
    queue.push([row, col]);
    visited[row][col] = true;

    let nCow = 0;
    while (!queue.isEmpty()) {
      const curCoord = queue.pop();

      if (cowSet.has(curCoord)) {
        nCow += 1;
      }

      DIRECTIONS.map((dirCoord) => sumCoord(curCoord, dirCoord))
        .filter(
          ([nextRow, nextCol]) =>
            !outOfRange(nextRow, nextCol) &&
            !visited[nextRow][nextCol] &&
            !roadSet.has(curCoord, [nextRow, nextCol])
        )
        .forEach(([nextRow, nextCol]) => {
          visited[nextRow][nextCol] = true;
          queue.push([nextRow, nextCol]);
        });
    }

    return nCow;
  }

  function outOfRange(row, col) {
    return row < 0 || col < 0 || row >= N || col >= N;
  }

  function sumCoord([rowA, colA], [rowB, colB]) {
    return [rowA + rowB, colA + colB];
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

  function createRoadSet() {
    const roadSet = new Set(roads);

    const toKey = ([rowA, colA], [rowB, colB]) => {
      const diff = rowA - rowB || colA - colB;
      return diff <= 0 ? [rowA, colA, rowB, colB].join(' ') : [rowB, colB, rowA, colA].join(' ');
    };

    const add = (coordA, coordB) => {
      roadSet.add(toKey(coordA, coordB));
    };

    const has = (coordA, coordB) => {
      return roadSet.has(toKey(coordA, coordB));
    };

    return { add, has };
  }

  function createCowSet() {
    const cowSet = new Set();

    const toKey = (coord) => {
      return coord.join(' ');
    };

    const add = (coord) => {
      cowSet.add(toKey(coord));
    };

    const has = (coord) => {
      return cowSet.has(toKey(coord));
    };

    return { add, has };
  }
}

const [N, K, R] = input.shift().split(' ').map(Number);
const roads = input.splice(0, R).map((line) => line.split(' ').map(Number));
const cows = input.map((line) => line.split(' ').map(Number));
console.log(solution(N, K, R, roads, cows));
