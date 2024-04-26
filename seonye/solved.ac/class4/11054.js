const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, arr) {
  const incDP = new Array(n).fill(1);
  const decDP = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    const cur = arr[i];
    let cnt = 1;
    for (let j = 0; j < i; j++) {
      if (cur > arr[j]) cnt = Math.max(cnt, incDP[j] + 1);
    }
    incDP[i] = cnt;
  }

  for (let i = n - 1; i >= 0; i--) {
    const cur = arr[i];
    let cnt = 1;
    for (let j = i + 1; j < n; j++) {
      if (cur > arr[j]) cnt = Math.max(cnt, decDP[j] + 1);
    }
    decDP[i] = cnt;
  }

  return Math.max(...incDP.map((val, index) => val + decDP[index])) - 1;
}

const n = Number(input[0]);
const arr = input[1].trim().split(' ').map(Number);
console.log(solution(n, arr));
