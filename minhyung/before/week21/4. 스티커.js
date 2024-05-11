//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
2
5
50 10 100 20 40
30 50 70 10 60
7
10 30 10 50 100 20 40
20 40 30 50 60 20 80
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(n, dp) {
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 2; j++) {
      dp[j][i] = Math.max(
        dp[j][i] + (dp[j]?.[i - 2] ?? 0),
        dp[j][i] + (dp[Math.abs(j - 1)]?.[i - 2] ?? 0),
        dp[j][i] + (dp[Math.abs(j - 1)][i - 1] ?? 0)
      );
    }
  }
  return Math.max(dp[0][n - 1], dp[1][n - 1]);
}

const T = +input();
let result = "";

for (let i = 0; i < T; i++) {
  const n = +input();
  const board = Array.from({ length: 2 }, () => input());
  result += `${solution(n, board)}\n`;
}

console.log(result);

// 스티커 2n개 구매함
// 스티커 하나 떼면 상하좌우의 스티커를 뗄 수 없음
// 스티커에 점수를 매김. 점수의 합이 최대가 되도록 스티커를 뗄거임

//

// dp[i][j-2
// 50 10 100 20 40
// 30 50 70 10 60
// 50 40  200 140
// 30 100 120 210

// 60 120 140
