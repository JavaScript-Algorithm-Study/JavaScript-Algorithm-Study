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

function solution(n, k, r, roads, cowsPos) {
  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];
  const roadPos = Array.from({ length: n }, () => Array(n));
  let count = 0;

  for ([r1, c1, r2, c2] of roads) {
    roadPos[r1][c1] = roadPos[r1][c1]
      ? [...roadPos[r1][c1], [r2, c2].join('')]
      : [[r2, c2].join('')];
    roadPos[r2][c2] = roadPos[r2][c2]
      ? [...roadPos[r2][c2], [r1, c1].join('')]
      : [[r1, c1].join('')];
  }

  function bfs(r, c, visited) {
    const q = new Queue();
    q.push([r, c]);
    visited[r][c] = true;

    while (q.size() > 0) {
      const [cur_r, cur_c] = q.pop();

      for (let i = 0; i < 4; i++) {
        let nr = cur_r + dr[i];
        let nc = cur_c + dc[i];

        if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
        if (visited[nr][nc]) continue;
        if (
          roadPos[cur_r][cur_c] &&
          roadPos[cur_r][cur_c].includes([nr, nc].join(''))
        )
          continue;

        q.push([nr, nc]);
        visited[nr][nc] = true;
      }
    }
  }

  for (let i = 0; i < cowsPos.length; i++) {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const [cow_r, cow_c] = cowsPos[i];

    bfs(cow_r, cow_c, visited);

    for (let j = i + 1; j < cowsPos.length; j++) {
      const [row, col] = cowsPos[j];
      if (!visited[row][col]) count++;
    }
  }

  return count;
}

const [n, k, r] = input[0].split(' ').map(Number);
const roads = input
  .slice(1, 1 + r)
  .map((r) => r.split(' ').map((c) => Number(c) - 1));
const cowsPos = input
  .slice(1 + r, 1 + r + k)
  .map((cow) => cow.split(' ').map((c) => Number(c) - 1));
console.log(solution(n, k, r, roads, cowsPos));
