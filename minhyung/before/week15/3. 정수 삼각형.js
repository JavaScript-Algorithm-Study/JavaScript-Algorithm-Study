// 링크: https://www.acmicpc.net/problem/1932
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const N = +input();
const dp = Array(N).fill(0);
dp[0] = +input();

for (let i = 0; i < N - 1; i++) {
  const arr = input();
  const beforeDp = [...dp];

  for (let j = 0; j < arr.length; j++) {
    dp[j] = arr[j];
    if (j === 0) {
      dp[j] += beforeDp[j];
    } else if (j === arr.length - 1) {
      dp[j] += beforeDp[j - 1];
    } else {
      dp[j] += Math.max(beforeDp[j], beforeDp[j - 1]);
    }
  }
}

console.log(Math.max(...dp));
