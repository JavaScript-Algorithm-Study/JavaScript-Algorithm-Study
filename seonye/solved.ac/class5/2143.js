const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(t, n, m, arr1, arr2) {
  const first_map = {};

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += arr1[j];
      if (first_map[sum]) first_map[sum]++;
      else first_map[sum] = 1;
    }
  }

  let answer = 0;
  for (let i = 0; i < m; i++) {
    let sum = 0;
    for (let j = i; j < m; j++) {
      sum += arr2[j];
      if (first_map[t - sum]) {
        answer += first_map[t - sum];
      }
    }
  }

  return answer;
}

const t = Number(input[0]);
const n = Number(input[1]);
const arr1 = input[2].split(' ').map(Number);
const m = Number(input[3]);
const arr2 = input[4].split(' ').map(Number);
console.log(solution(t, n, m, arr1, arr2));
