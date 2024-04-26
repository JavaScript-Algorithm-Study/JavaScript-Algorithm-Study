const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, info) {
  const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

  for (let i = 1; i <= n; i++) {
    dist[i][i] = 0;
  }

  for ([a, b, cost] of info) {
    dist[a][b] = Math.min(dist[a][b], cost);
  }

  for (let k = 1; k <= n; k++) {
    for (let y = 1; y <= n; y++) {
      for (let x = 1; x <= n; x++) {
        dist[y][x] = Math.min(dist[y][x], dist[y][k] + dist[k][x]);
      }
    }
  }

  return dist
    .slice(1)
    .map((row) =>
      row
        .slice(1)
        .map((c) => (c === Infinity ? 0 : c))
        .join(' ')
    )
    .join('\n');
}

const n = Number(input[0]);
const m = Number(input[1]);
const info = input.slice(2, 2 + m).map((info) => info.split(' ').map(Number));

console.log(solution(n, m, info));
