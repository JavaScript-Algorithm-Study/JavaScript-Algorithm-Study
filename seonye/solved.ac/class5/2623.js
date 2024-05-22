const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, infos) {
  let graph = Array.from({ length: n + 1 }, () => []);
  let indegree = Array(n + 1).fill(0);

  for (let i = 0; i < m; i++) {
    let [cnt, ...list] = infos[i];
    for (let j = 0; j < cnt - 1; j++) {
      const from = list[j];
      const to = list[j + 1];
      graph[from].push(to);
      indegree[to]++;
    }
  }

  let queue = [];
  let ans = [];
  for (let i = 1; i <= n; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    let cur = queue.shift();
    ans.push(cur);
    for (let next of graph[cur]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }

  return ans.length === n ? ans.join('\n') : 0;
}

const [n, m] = input[0].split(' ').map(Number);
const infos = input.slice(1).map((row) => row.trim().split(' ').map(Number));
console.log(solution(n, m, infos));
