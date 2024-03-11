const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, K, times, rules, W) {
  const prev_build = new Array(N + 1).fill(0);
  const graph = Array.from({ length: N + 1 }, () => []);
  const dp = [...times];

  for (let i = 0; i < rules.length; i++) {
    const [X, Y] = rules[i];
    graph[X].push(Y);
    prev_build[Y] += 1;
  }

  const q = [];

  for (let i = 1; i <= N; i++) {
    if (prev_build[i] === 0) q.push(i);
  }

  while (q.length > 0) {
    const cur = q.shift();

    for (let next_build of graph[cur]) {
      dp[next_build] = Math.max(dp[next_build], dp[cur] + times[next_build]);
      prev_build[next_build] -= 1;

      if (prev_build[next_build] === 0) q.push(next_build);
    }
  }

  console.log(dp[W]);
}

let tc = Number(input[0]);

let idx = 1;
for (let i = 0; i < tc; i++) {
  const [N, K] = input[idx++].split(' ').map(Number);
  const times = input[idx++].split(' ').map(Number);
  const rules = input.slice(idx, idx + K).map((time) => time.split(' ').map(Number));
  idx += K;
  const W = Number(input[idx++]);
  times.unshift(-1);

  solution(N, K, times, rules, W);
}
