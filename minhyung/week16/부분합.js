// 링크: https://www.acmicpc.net/problem/1806
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
10 15
5 1 3 5 10 7 4 9 2 8
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

function solution(seq, seqLen, minSum) {
  let r = 0;
  let sum = 0;
  let result = Infinity;

  for (let l = 0; l < seqLen; l++) {
    // minSum 넘어갈 때 까지
    while (r < seqLen && sum < minSum) {
      sum += seq[r++];
    }
    if (sum >= minSum) {
      const len = r - l;
      result = Math.min(len, result);
    }

    sum -= seq[l];
  }

  return result === Infinity ? 0 : result;
}

const [N, S] = input();
const seq = input();

console.log(solution(seq, N, S));

// 10 20 30 40 // 10
//1 1 1// 4
// 1 2 3// 1
