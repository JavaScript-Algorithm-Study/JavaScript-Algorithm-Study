const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, infos, plan) {
  console.log(n, m, infos, plan);
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (infos[i][j] === 1) {
        graph[i + 1].push(j + 1);
        graph[j + 1].push(i + 1);
      }
    }
  }

  console.log(graph);
}

const n = Number(input[0]);
const m = Number(input[1]);
const infos = input.slice(2, 2 + n).map((row) => row.trim().split(' ').map(Number));
const plan = input[n + 2].trim().split(' ').map(Number);

console.log(solution(n, m, infos, plan));
