//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5
1 3 1 2 1
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(N, arr) {
  const dp = Array.from({ length: N }, () => Array(2).fill(1));

  // 현재 이전까지 dp를 돌음
  // [0] = 증가, [1] = 감소
  // 이전 < 현재 (증가만 가능): [0] = max(현재, 이전[0])
  // 이전 > 현재 (감소만 가능): [1] = max(현재, 이전[0], 이전[1])
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        dp[i][0] = Math.max(dp[i][0], dp[j][0] + 1);
      }
      if (arr[j] > arr[i]) {
        dp[i][1] = Math.max(dp[i][1], dp[j][0] + 1, dp[j][1] + 1);
      }
    }
  }

  let max = 0;
  dp.forEach(([a, b]) => {
    max = Math.max(max, a, b);
  });

  return max;
}

const N = +input();
const arr = input();
console.log(solution(N, arr));
