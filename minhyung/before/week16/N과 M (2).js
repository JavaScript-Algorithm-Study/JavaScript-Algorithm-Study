// 링크: https://www.acmicpc.net/problem/15650
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3 1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

function solution([N, M]) {
  const getCombis = (now, arr, used, result) => {
    if (arr.length === M) {
      return result + `${arr.join(" ")}\n`;
    }
    for (let i = now; i < N; i++) {
      if (used[i]) continue;
      used[i] = true;
      result = getCombis(i + 1, [...arr, i + 1], used, result);
      used[i] = false;
    }
    return result;
  };
  return getCombis(0, [], {}, "");
}

console.log(solution(input()));
