const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, info) {
  function paint(colorNum) {
    let dp = Array.from({ length: n }, () => []);

    for (let i = 0; i < 3; i++) {
      //두 번째 집 색 칠하기
      if (i === colorNum) dp[1][i] = Infinity;
      else dp[1][i] = info[1][i] + info[0][colorNum];
    }

    for (let i = 2; i < n; i++) {
      dp[i][0] = info[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
      dp[i][1] = info[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
      dp[i][2] = info[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
    }

    return Math.min(...dp[n - 1].filter((_, i) => i !== colorNum));
  }

  let answer = Infinity;
  for (let i = 0; i < 3; i++) {
    //첫 번째 집 색 바꾸기
    answer = Math.min(answer, paint(i));
  }

  return answer;
}

const n = Number(input[0]);
const info = input.slice(1, 1 + n).map((row) => row.split(' ').map(Number));
console.log(solution(n, info));
