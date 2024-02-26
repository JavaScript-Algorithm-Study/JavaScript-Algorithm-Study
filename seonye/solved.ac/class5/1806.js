const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, S, numArr) {
  let start = (end = 0);
  let sum = numArr[start];
  let minLen = 100000;

  while (start <= end && start < N && end < N) {
    if (sum >= S && minLen > end - start + 1) {
      minLen = end - start + 1;
    }

    if (sum <= S) {
      end += 1;
      sum += numArr[end];
    } else {
      sum -= numArr[start];
      start += 1;
    }
  }

  return minLen === 100000 ? 0 : minLen;
}

const [N, S] = input[0].trim().split(' ').map(Number);
const numArr = input[1].trim().split(' ').map(Number);

console.log(solution(N, S, numArr));
