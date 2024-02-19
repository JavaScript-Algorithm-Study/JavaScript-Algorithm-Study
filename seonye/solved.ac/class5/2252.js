const path = require('path');
const fs = require('fs');
const input = fs
  .readFileSync(path.join(__dirname, 'dev', 'stdin'))
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.trim());

const [N, M] = input[0].split(' ').map(Number);
let graph = Array.from({ length: N + 1 }, () => []);
let degree = new Array(N + 1).fill(0);

for (let i = 1; i < M + 1; i++) {
  const [prev, cur] = input[i].split(' ').map(Number);
  graph[prev].push(cur);
  degree[cur] += 1;
}

const q = [];
for (let i = 1; i < N + 1; i++) {
  if (degree[i] === 0) q.push(i);
}

const answer = [];

while (q.length > 0) {
  let cur = q.pop();
  answer.push(cur);

  for (let next of graph[cur]) {
    degree[next]--;
    if (degree[next] === 0) q.push(next);
  }
}

console.log(answer.join(' '));
