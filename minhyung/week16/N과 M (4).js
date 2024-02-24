// 링크: https://www.acmicpc.net/problem/15652
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3 3
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

function solution([N, M]) {
  const getCombis = (now, arr, result) => {
    if (arr.length === M) {
      return result + `${arr.join(" ")}\n`;
    }
    for (let i = now; i < N; i++) {
      result = getCombis(i, [...arr, i + 1], result);
    }
    return result;
  };
  return getCombis(0, [], "");
}

console.log(solution(input()));

// 중복조합
