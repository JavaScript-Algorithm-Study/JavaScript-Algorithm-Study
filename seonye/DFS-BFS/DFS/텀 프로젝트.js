//https://www.acmicpc.net/problem/9466
//방향 그래프 내 사이클을 판별

const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function dfs(x, graph, visited, finished, result) {
  visited[x] = true;
  let y = graph[x];

  if (!visited[y]) dfs(y, graph, visited, finished, result);
  else if (!finished[y]) {
    while (y != x) {
      result.push(y);
      y = graph[y];
    }
    result.push(x);
  }
  finished[x] = true;
}

function solution(n, students) {
  let graph = [0, ...students];
  let visited = new Array(n + 1).fill(false);
  let finished = new Array(n + 1).fill(false);
  let result = [];

  for (let x = 1; x <= n; x++) {
    if (!visited[x]) dfs(x, graph, visited, finished, result);
  }

  return n - result.length;
}

const tc = Number(input[0]);
for (let i = 0; i < tc; i++) {
  const n = Number(input[i * 2 + 1]);
  const students = input[(i + 1) * 2].split(' ').map(Number);
  console.log(solution(n, students));
}
