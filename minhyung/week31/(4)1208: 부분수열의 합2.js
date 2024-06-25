//https://www.acmicpc.net/problem/1208
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5 0
-7 -3 -2 5 0
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number)})();

function solution(N, goal, arr) {
  const midIdx = Math.floor(arr.length / 2);
  const leftSums = {};
  let result = 0;

  function left(now, sum, end) {
    if (now < end) leftSums[sum] = (leftSums[sum] ?? 0) + 1;
    else return;

    for (let i = now; i < end; i++) {
      left(i + 1, sum + arr[i], end);
    }
  }
  function right(now, sum, end) {
    if (leftSums[goal - sum]) result += leftSums[goal - sum];
    if (now === end) return;

    for (let i = now; i < end; i++) {
      right(i + 1, sum + arr[i], end);
    }
  }

  left(0, 0, midIdx + 1);
  right(midIdx, 0, N);

  return goal === 0 ? result - 1 : result;
}

const [N, S] = input();
const arr = input();

console.log(solution(N, S, arr));

// 그냥 조합 = 2^40 = 개큼
