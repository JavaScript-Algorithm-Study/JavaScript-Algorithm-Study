//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
7
10 20 30 15 10 40 25
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function lowerBound(arr, num) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] < num) start = mid + 1;
    else end = mid;
  }

  return end;
}
function solution(n, arr) {
  const numOrder = [[0, arr[0]]];
  const LIS = [arr[0]];

  arr.forEach((arrNum, arrIndex) => {
    if (arrIndex === 0) return;

    // 마지막 값보다 크면 바로넣음
    if (LIS.at(-1) < arrNum) {
      LIS.push(arrNum);
      numOrder.push([LIS.length - 1, arrNum]);
    }
    // 아니면 num보다 큰 index를 구해옴
    else {
      const nextIndex = lowerBound(LIS, arrNum);
      LIS[nextIndex] = arrNum;
      numOrder.push([nextIndex, arrNum]);
    }
  });

  let lastIdx = LIS.length - 1;
  let result = [];

  numOrder.reverse().forEach(([idx, num]) => {
    if (idx === lastIdx) {
      result.push(num);
      lastIdx--;
    }
  });

  return `${result.length}\n${result.reverse().join(" ")}`;
}

const n = +input();
const arr = input();
console.log(solution(n, arr));
