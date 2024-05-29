const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split(' ');

function solution(A, B) {
  let cnt = 1;
  while (B !== A && A < B) {
    if (B % 2 !== 0) {
      B = B.toString();
      const b_size = B.length;
      if (B[b_size - 1] === '1') B = Number(B.slice(0, b_size - 1));
      else break;
    } else B /= 2;
    cnt += 1;
  }

  if (B !== A) cnt = -1;

  return cnt;
}

const [A, B] = input.map(Number);
console.log(solution(A, B));
