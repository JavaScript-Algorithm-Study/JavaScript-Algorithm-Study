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

function solution(n, m, info) {
  const switches = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => []));
  const lightBoard = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));
  const q = new Queue();
  const visited = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));

  for (let i = 0; i < m; i++) {
    const [x, y, a, b] = info[i];
    switches[y][x].push([b, a]);
  }

  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];
  q.push([1, 1]);
  visited[1][1] = true;
  lightBoard[1][1] = true;

  while (q.size() > 0) {
    const [curY, curX] = q.pop();

    for (let [sY, sX] of switches[curY][curX]) {
      if (!lightBoard[sY][sX]) {
        lightBoard[sY][sX] = true;
        if (visited[sY][sX]) q.push([sY, sX]);
      }
    }

    for (let i = 0; i < 4; i++) {
      const ny = curY + dy[i];
      const nx = curX + dx[i];
      if (ny < 1 || ny > n || nx < 1 || nx > n) continue;
      if (visited[ny][nx]) continue;

      visited[ny][nx] = true;
      if (lightBoard[ny][nx] === true) q.push([ny, nx]);
    }
  }

  return lightBoard.map((row) => row.filter((cell) => cell === true).length).reduce((a, b) => a + b, 0);
}

const [n, m] = input[0].split(' ').map(Number);
const info = input.slice(1, 1 + m).map((row) => row.trim().split(' ').map(Number));
console.log(solution(n, m, info));
