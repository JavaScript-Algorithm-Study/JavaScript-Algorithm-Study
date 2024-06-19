const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(v, info) {
  const edges = Array.from({ length: v + 1 }, () => []);

  for (let i = 0; i < info.length; i++) {
    const [from, to, d] = info[i];

    edges[from].push([to, d]);
    edges[to].push([from, d]);
  }

  let max = 0;
  let maxNode = 0;
  let visited = new Array(v + 1).fill(false);

  function dfs(start, dist) {
    visited[start] = true;

    if (dist > max) {
      max = dist;
      maxNode = start;
    }

    for (let [nx, nxDist] of edges[start]) {
      if (!visited[nx]) dfs(nx, dist + nxDist);
    }
  }

  dfs(1, 0);

  max = 0;
  visited = new Array(v + 1).fill(false);
  dfs(maxNode, 0);

  return max;
}

const v = Number(input[0]);
const info = input.slice(1).map((row) => row.split(' ').map(Number));
console.log(solution(v, info));
