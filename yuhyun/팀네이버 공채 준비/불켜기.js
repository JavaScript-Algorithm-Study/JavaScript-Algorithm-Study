const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, M, switches) {
  const PAD = 1;
  const START = [1 - PAD, 1 - PAD];
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const graph = createGraph(
    N,
    switches.map((edge) => edge.map((v) => v - PAD))
  );

  const queue = createQueue();
  const lightOn = Array.from(Array(N), () => Array(N).fill(false));
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  let result = 0;
  queue.push(START);
  lightOn[START[0]][START[1]] = true;
  visited[START[0]][START[1]] = true;
  result += 1;

  const connected = [];

  while (!queue.isEmpty()) {
    const [row, col] = queue.pop();

    graph[row][col].forEach(([nr, nc]) => {
      if (lightOn[nr][nc]) {
        return;
      }

      result += 1;
      lightOn[nr][nc] = true;

      if (hasCoord([nr, nc], connected)) {
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      }
    });

    DIRECTIONS.map(([dr, dc]) => [row + dr, col + dc])
      .filter(([nr, nc]) => !outOfRange(nr, nc, N) && !visited[nr][nc])
      .forEach(([nr, nc]) => {
        if (lightOn[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
          return;
        }

        if (hasCoord([nr, nc], connected)) {
          return;
        }

        connected.push([nr, nc]);
      });
  }

  return result;

  function hasCoord([targetRow, targetCol], array) {
    return array.find(([row, col]) => row === targetRow && col === targetCol);
  }

  function outOfRange(row, col, N) {
    return row < 0 || col < 0 || row >= N || col >= N;
  }

  function createQueue() {
    let head = 0;
    const queue = [];

    function isEmpty() {
      return queue.length === head;
    }

    function push(value) {
      queue.push(value);
    }

    function pop() {
      return isEmpty() ? null : queue[head++];
    }

    return { isEmpty, push, pop };
  }

  function createGraph(nNode, edges) {
    const result = Array.from(Array(nNode), () => Array.from(Array(nNode), () => []));
    edges.forEach(([rowA, colA, rowB, colB]) => {
      result[rowA][colA].push([rowB, colB]);
    });
    return result;
  }
}

const [N, M] = input.shift().split(' ').map(Number);
const switches = input.map((line) => line.split(' ').map(Number));
console.log(solution(N, M, switches));
