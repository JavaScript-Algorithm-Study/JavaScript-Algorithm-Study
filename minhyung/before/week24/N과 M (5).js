//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3 1
4 5 2
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

// N개의 자연수중 길이가 M인 수열
// N개의 자연수는 모두 다른 수
// 순열 구하면 될듯?
function getPermutation(inputArray, maxPickNum, pickedNum = [], result = "", visited = {}) {
  if (pickedNum.length === maxPickNum) {
    return result + `${pickedNum.join(" ")}\n`;
  }

  for (let i = 0; i < inputArray.length; i++) {
    if (visited[i]) continue;

    visited[i] = true;

    result = getPermutation(inputArray, maxPickNum, [...pickedNum, inputArray[i]], result, visited);

    visited[i] = false;
  }

  return result;
}
function solution(N, M, arr) {
  return getPermutation(arr, M);
}

const [N, M] = input();
const arr = input();
arr.sort((a, b) => a - b);

console.log(solution(N, M, arr));
