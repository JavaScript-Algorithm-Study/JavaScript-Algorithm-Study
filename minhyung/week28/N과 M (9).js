//https://www.acmicpc.net/problem/15663
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4 4
1 1 1 1
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function getPermutations(numArr, maxSelect, tmpPermutations = [], result = new Set(), visited = {}) {
  if (tmpPermutations.length === maxSelect) {
    result.add(tmpPermutations.join(" "));
    return;
  }
  for (let i = 0; i < numArr.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      getPermutations(numArr, maxSelect, [...tmpPermutations, numArr[i]], result, visited);
      visited[i] = false;
    }
  }

  return result;
}

function solution(maxSelect, numArr) {
  numArr.sort((a, b) => a - b);

  const permutations = getPermutations(numArr, maxSelect);

  return Array.from(permutations).join("\n");
}

const [N, M] = input();
const arr = input();
console.log(solution(M, arr));

// N개 자연수중 M개 고른 수열
// 중복되는 수열 여러면 X
// 사전순으로 증가하는 수열
