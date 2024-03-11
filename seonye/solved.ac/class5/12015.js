const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(A, arr) {
  function binarySearch(start, end, target) {
    let mid;

    while (start < end) {
      mid = parseInt((start + end) / 2);
      if (lis[mid] < target) start = mid + 1;
      else end = mid;
    }

    return end;
  }

  const lis = [];
  lis[0] = arr[0];
  let j = 0;

  for (let i = 1; i < A; i++) {
    if (lis[j] < arr[i]) {
      lis[j + 1] = arr[i];
      j += 1;
    } else {
      let idx = binarySearch(0, j, arr[i]);
      lis[idx] = arr[i];
    }
  }

  return lis.length;
}

const A = Number(input[0]);
const arr = input[1].split(' ').map(Number);

console.log(solution(A, arr));
