//https://www.acmicpc.net/problem/17404
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
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
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(n, costs) {
  let result = Infinity;

  for (let color = 0; color < 3; color++) {
    const dp = [Infinity, Infinity, Infinity];
    dp[color] = costs[0][color];

    for (let i = 1; i < n; i++) {
      const [a, b, c] = [...dp];

      dp[0] = costs[i][0] + Math.min(b, c);
      dp[1] = costs[i][1] + Math.min(a, c);
      dp[2] = costs[i][2] + Math.min(a, b);
    }

    const [idx1, idx2] = [(i + 1) % 3, (i + 2) % 3];
    result = Math.min(result, dp[idx1], dp[idx2]);
  }

  return result;
}

const N = Number(input());
const costs = Array.from({ length: N }, () => input());
console.log(solution(N, costs));

// 빨 초 파 중 하나로 칠함
// 각각을 칠하는 비용이 주어짐
// 1번 색은 2번, N번 색과 달라야함
// N번 색은 N-1, 1번 색과 달라야함
// i번 색은 i-1, i+1과 색이 달라야함
// 모든 집을 최소 비용으로 칠해야한다.

// 처음에는 점화식을 세워서 예외처리 하는 방식으로 풀음
// 이러면 끝도없음 그래서 첫 부분을 고정하는 방식으로 변경함
// 그 후 맨 마지막은 첫번째를 제외하고 고르면됨
