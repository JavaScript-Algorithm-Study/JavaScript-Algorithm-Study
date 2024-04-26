const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

class Queue {
  constructor() {
    this.D = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  push(data) {
    this.D[this.tailIndex++] = data;
  }

  pop() {
    if (this.headIndex === this.tailIndex) return undefined;

    const data = this.D[this.headIndex];
    delete this.D[this.headIndex++];
    return data;
  }

  size() {
    return this.tailIndex - this.headIndex;
  }
}

function solution(n, m, board) {
  const q = new Queue();
  q.push([0, 0, 0]);

  const d = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Array(2).fill(false))
  );
  const dist = Array.from({ length: n }, () => Array(m).fill(0));
  dist[0][0] = 1;
  visited[0][0][0] = true;

  while (q.size() > 0) {
    let [cx, cy, wall] = q.pop();

    if (cx === n - 1 && cy === m - 1) break;

    for (let i = 0; i < 4; i++) {
      const [dx, dy] = d[i];
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      if (board[nx][ny] === 1 && wall === 0 && !visited[nx][ny][1]) {
        visited[nx][ny][1] = true;
        dist[nx][ny] = dist[cx][cy] + 1;
        q.push([nx, ny, 1]);
      }

      if (board[nx][ny] === 0 && !visited[nx][ny][wall]) {
        visited[nx][ny][wall] = true;
        dist[nx][ny] = dist[cx][cy] + 1;
        q.push([nx, ny, wall]);
      }
    }
  }

  return dist[n - 1][m - 1] === 0 ? -1 : dist[n - 1][m - 1];
}

const [n, m] = input[0].split(' ').map(Number);
const board = input.slice(1, n + 1).map((row) => row.split('').map(Number));
console.log(solution(n, m, board));
