const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, exp) {
  const DP_SIZE = (N + 1) / 2;
  const numbers = exp.filter((_, i) => i % 2 === 0).map(Number);
  const maxDP = Array.from({ length: DP_SIZE }, () =>
    new Array(DP_SIZE).fill(-Infinity)
  );
  const minDP = Array.from({ length: DP_SIZE }, () =>
    new Array(DP_SIZE).fill(Infinity)
  );

  function calc(a, b, op) {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
    }
  }

  for (let i = 0; i < DP_SIZE; i++) {
    maxDP[i][i] = numbers[i];
    minDP[i][i] = numbers[i];
  }

  for (let len = 1; len < DP_SIZE; len++) {
    for (let i = 0; i < DP_SIZE - len; i++) {
      const j = i + len;

      for (let k = i; k < j; k++) {
        const ops = exp[2 * k + 1];
        maxDP[i][j] = Math.max(
          maxDP[i][j],
          calc(maxDP[i][k], maxDP[k + 1][j], ops)
        );
        maxDP[i][j] = Math.max(
          maxDP[i][j],
          calc(maxDP[i][k], minDP[k + 1][j], ops)
        );
        maxDP[i][j] = Math.max(
          maxDP[i][j],
          calc(minDP[i][k], maxDP[k + 1][j], ops)
        );
        maxDP[i][j] = Math.max(
          maxDP[i][j],
          calc(minDP[i][k], minDP[k + 1][j], ops)
        );

        minDP[i][j] = Math.min(
          minDP[i][j],
          calc(maxDP[i][k], maxDP[k + 1][j], ops)
        );
        minDP[i][j] = Math.min(
          minDP[i][j],
          calc(maxDP[i][k], minDP[k + 1][j], ops)
        );
        minDP[i][j] = Math.min(
          minDP[i][j],
          calc(minDP[i][k], maxDP[k + 1][j], ops)
        );
        minDP[i][j] = Math.min(
          minDP[i][j],
          calc(minDP[i][k], minDP[k + 1][j], ops)
        );
      }
    }
  }

  return maxDP[0][DP_SIZE - 1];
}

const N = Number(input[0]);
const exp = input[1].trim().split('');

console.log(solution(N, exp));
