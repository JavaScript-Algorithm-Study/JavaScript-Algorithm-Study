//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4
5 3
3 2
2 6
6 3
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(N, matrices) {
  // dp[i][j] = i ~ j 를 곱했을 때 최소값
  const dp = Array.from({ length: N }, () => Array(N).fill(Infinity));

  for (let i = 0; i < N; i++) {
    dp[i][i] = 0;
  }

  for (let size = 1; size < N; size++) {
    // 범위 안벗어나게 N - size 해줌
    for (let start = 0; start < N - size; start++) {
      const end = start + size;

      for (let mid = start; mid < end; mid++) {
        const beforeVal = dp[start][end];
        const calcedVal = dp[start][mid] + dp[mid + 1][end] + matrices[start][0] * matrices[mid][1] * matrices[end][1];
        if (beforeVal > calcedVal) {
          dp[start][end] = calcedVal;
        }
      }
    }
  }

  return dp[0][N - 1];
}

const N = Number(input());
const matrices = Array.from({ length: N }, () => input());
console.log(solution(N, matrices));

// 행렬순서 변경 X
// 구해야 하는건 곱셈 연산 횟수의 최솟값
// 순서가 변경되지 않으므로 행렬 크기는 중요하지 않음
// 프로그래머스 사칙연산 문제와 비슷함
