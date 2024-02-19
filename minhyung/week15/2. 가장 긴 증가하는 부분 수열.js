// 링크: https://www.acmicpc.net/problem/11053
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
6
10 20 10 30 20 10
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const N = +input();
const A = input();

const dp = Array(N).fill(0);
dp[0] = 1;

for (let i = 1; i < N; i++) {
  let max = 1;
  for (let j = 0; j < i; j++) {
    // 나보다 작은 수면서 max보다 클 때
    if (A[j] < A[i] && dp[j] >= max) {
      max = dp[j] + 1;
    }
  }
  dp[i] = max;
}

console.log(Math.max(...dp));
