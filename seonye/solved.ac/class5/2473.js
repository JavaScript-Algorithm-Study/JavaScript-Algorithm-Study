const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, values) {
  let answer = [];
  let minVal = Infinity;

  for (let i = 0; i < n - 2; i++) {
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = values[i] + values[left] + values[right];
      if (Math.abs(sum) < minVal) {
        minVal = Math.abs(sum);
        answer = [values[i], values[left], values[right]];
      }
      if (sum < 0) left++;
      else right--;
    }
  }

  return answer.join(' ');
}

const n = Number(input[0]);
const values = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

console.log(solution(n, values));
