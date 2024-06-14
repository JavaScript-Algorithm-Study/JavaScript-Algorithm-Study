//https://www.acmicpc.net/problem/2473
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
7
-2 -3 -24 -6 98 100 61
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(n, arr) {
  arr.sort((a, b) => a - b);

  let result = {
    left: 0,
    mid: 0,
    right: 0,
    sum: Infinity,
  };

  for (let left = 0; left < n - 2; left++) {
    let mid = left + 1;
    let right = n - 1;

    while (mid < right) {
      const sum = arr[left] + arr[mid] + arr[right];
      const sumABS = Math.abs(sum);

      if (sumABS < result.sum) {
        result = {
          left,
          mid,
          right,
          sum: sumABS,
        };
      }

      if (sum > 0) right -= 1;
      else mid += 1;
    }
  }

  return [arr[result.left], arr[result.mid], arr[result.right]].join(" ");
}

const n = input();
const arr = input();
console.log(solution(n, arr));

// 현재 sum >= [left + 1] + [right] : 왼쪽을 옮김
// 현재 sum  < [left] + [right - 1] : 오른쪽을 옮김
// while 조건문은 left < right - 1
// 그 후 left ~ right 사이에서 더했을 떄 절대값이 가장 작은걸 찾음
// 1. 왼쪽 오른쪽 투포인터로 찾고 그 후에 mid 찾기: 안됨 -> left+right 더했을 때 최솟값이 아닌데 mid더하니까 최솟값인 예외가 존재
// 2. 왼쪽을 고정, 가운데, 오른쪽을 투포인터로 찾기: 됨!!
