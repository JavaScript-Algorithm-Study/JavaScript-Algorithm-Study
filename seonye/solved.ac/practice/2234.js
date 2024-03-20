const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, M, info) {
  const dec = 11;
  const board = info.map((row) => row.map((i) => i.toString(2).padStart(4, '0')));
  const graph = Array.from({ length: N }, () => Array.from({ length: M }, () => []));

  function posValidation(x, y) {
    if (x < 0 || x >= N || y < 0 || y >= M) return false;
    return true;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const [bottom, right, top, left] = board[j][i].split('').map(Number);

      if (bottom === 0 && posValidation(i, j + 1)) {
        graph[i][j].push([i, j + 1]);
      }
      if (right === 0 && posValidation(i + 1, j)) {
        graph[i][j].push([i + 1, j]);
      }
      if (top === 0 && posValidation(i, j - 1)) {
        graph[i][j].push([i, j - 1]);
      }
      if (left === 0 && posValidation(i - 1, j)) {
        graph[i][j].push([i - 1, j]);
      }
    }
  }

  let visited = Array.from({ length: N }, () => Array(M).fill(false));

  function bfs(x, y) {
    let roomSize = 0;
    const q = [[x, y]];

    visited[x][y] = true;
    roomSize += 1;

    while (q.length > 0) {
      const [cx, cy] = q.shift();

      for (let [nx, ny] of graph[cx][cy]) {
        if (!visited[nx][ny]) {
          roomSize += 1;
          visited[nx][ny] = true;
          q.push([nx, ny]);
        }
      }
    }

    return roomSize;
  }

  let maxRoomSize = 0;
  let roomCnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visited[i][j]) {
        maxRoomSize = Math.max(maxRoomSize, bfs(i, j));
        roomCnt += 1;
      }
    }
  }

  console.log(roomCnt, maxRoomSize);
}

const [N, M] = input[0].split(' ').map(Number);
const info = input.slice(1).map((row) => row.trim().split(' ').map(Number));
console.log(solution(N, M, info));
