const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, M, T, nJobBoard, timeBoard) {
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  const MOVEMENT_TIME = 1;

  const dp = Array.from(Array(N), () => Array.from(Array(M), () => Array(T + 1).fill(null)));

  dp[0][0][T] = 0;

  for (let row = 0; row < N; row += 1) {
    for (let col = 0; col < M; col += 1) {
      const nJob = nJobBoard[row][col];
      const execTime = timeBoard[row][col];

      for (let time = execTime; time < T + 1; time += 1) {
        if (dp[row][col][time] === null) {
          continue;
        }

        dp[row][col][time - execTime] = Math.max(
          dp[row][col][time - execTime] ?? 0,
          dp[row][col][time] + nJob
        );
      }

      for (const [dr, dc] of DIRECTIONS) {
        const nr = row + dr;
        const nc = col + dc;
        if (!dp[nr]?.[nc]) {
          continue;
        }

        for (let time = MOVEMENT_TIME; time < T + 1; time += 1) {
          const maxNJob = dp[row][col][time];
          if (maxNJob === null) {
            continue;
          }

          dp[nr][nc][time - MOVEMENT_TIME] = Math.max(
            dp[nr][nc][time - MOVEMENT_TIME] ?? 0,
            maxNJob
          );
        }
      }
    }
  }

  return Math.max(...dp[N - 1][M - 1]);
}

const [N, M, T] = input.shift().split(' ').map(Number);
const nJobBoard = input.splice(0, N).map((line) => line.split(' ').map(Number));
const timeBoard = input.splice(0, N).map((line) => line.split(' ').map(Number));
console.log(solution(N, M, T, nJobBoard, timeBoard));
