// 링크: https://www.acmicpc.net/problem/1149

//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
8
71 39 44
32 83 55
51 37 63
89 29 100
83 58 11
65 13 15
47 25 29
60 66 19
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

// 빨, 초, 파 중 하나로 칠해야함
const N = +input();
const dp = input();

for (let i = 0; i < N - 1; i++) {
  const beforeDP = [...dp];
  const [a, b, c] = input();
  dp[0] = a + Math.min(beforeDP[1], beforeDP[2]);
  dp[1] = b + Math.min(beforeDP[0], beforeDP[2]);
  dp[2] = c + Math.min(beforeDP[0], beforeDP[1]);
}

console.log(Math.min(...dp));
