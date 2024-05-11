//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4
0 0
0 10
10 10
10 0
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(N, positions) {
  let sum1 = 0;
  let sum2 = 0;

  positions.push(positions[0]);

  for (let i = 0; i < N; i++) {
    sum1 += positions[i][0] * positions[i + 1][1];
    sum2 += positions[i + 1][0] * positions[i][1];
  }

  const result = Math.abs(sum1 - sum2) / 2;
  return result.toFixed(1);
}

const N = +input();
const positions = Array.from({ length: N }, () => input());
console.log(solution(N, positions));

// 참고: https://gaussian37.github.io/math-algorithm-polygon_area/
// 참고: https://ko.wikihow.com/%EB%8B%A4%EA%B0%81%ED%98%95-%EB%84%93%EC%9D%B4-%EA%B5%AC%ED%95%98%EA%B8%B0#:~:text=%EC%A0%95%EB%8B%A4%EA%B0%81%ED%98%95%EC%9D%98%20%EB%84%93%EC%9D%B4%EB%A5%BC%20%EA%B5%AC,%EC%9D%98%20%EC%A4%91%EC%8B%AC%EC%9C%BC%EB%A1%9C%20%EB%AA%A8%EC%9D%B4%EB%8A%94%20%EC%84%A0%EB%B6%84
