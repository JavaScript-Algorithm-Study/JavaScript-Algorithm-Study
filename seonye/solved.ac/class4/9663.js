const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split(' ');

function solution(N) {
  const row = new Array(N).fill(0);

  let cnt = 0;

  function possible(x) {
    for (let i = 0; i < x; i++) {
      if (row[x] === row[i]) return false;
      if (Math.abs(row[x] - row[i]) === x - i) return false;
    }
    return true;
  }

  function dfs(depth) {
    if (depth === N) {
      cnt += 1;
      return;
    }

    for (let i = 0; i < N; i++) {
      row[depth] = i;
      if (possible(depth)) dfs(depth + 1);
    }
  }

  dfs(0);

  return cnt;
}

const N = Number(input[0]);
console.log(solution(N));
