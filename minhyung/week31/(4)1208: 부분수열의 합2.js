//https://www.acmicpc.net/problem/1208
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5 0
-7 -3 -2 5 8
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number)})();

function getSums(arr, now, end, sum = 0, result = new Map()) {
  result.set(sum, (result.get(sum) ?? 0) + 1);

  for (let i = now; i < end; i++) {
    getSums(arr, i + 1, end, sum + arr[i], result);
  }

  return result;
}
function solution(N, goal, arr) {
  const midIdx = Math.floor(arr.length / 2);
  const leftSums = getSums(arr, 0, midIdx);
  const rightSums = getSums(arr, midIdx, N);
  let result = 0;

  rightSums.forEach((count, num) => {
    if (leftSums.has(S - num)) {
      result += leftSums.get(S - num) * count;
    }
  });

  return goal === 0 ? result - 1 : result;
}

const [N, S] = input();
const arr = input();

console.log(solution(N, S, arr));

// 그냥 조합 = 2^40 = 개큼
