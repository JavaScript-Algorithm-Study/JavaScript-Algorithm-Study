function solution(board, skill) {
  const N = board.length;
  const M = board[0].length;

  const prefixSum = Array.from(Array(N), () => Array(M).fill(0));

  skill
    .map(([type, r1, c1, r2, c2, absoluteDegree]) => [
      r1,
      c1,
      r2,
      c2,
      type === 1 ? -absoluteDegree : absoluteDegree,
    ])
    .forEach(([r1, c1, r2, c2, degree]) => {
      safeUpdateCell(r1, c1, degree, prefixSum);
      safeUpdateCell(r1, c2 + 1, -degree, prefixSum);
      safeUpdateCell(r2 + 1, c1, -degree, prefixSum);
      safeUpdateCell(r2 + 1, c2 + 1, degree, prefixSum);
    });

  for (let r = 0; r < N; r += 1) {
    for (let c = 1; c < M; c += 1) {
      prefixSum[r][c] += prefixSum[r][c - 1];
    }
  }

  for (let r = 1; r < N; r += 1) {
    for (let c = 0; c < M; c += 1) {
      prefixSum[r][c] += prefixSum[r - 1][c];
    }
  }

  return board
    .map((row, r) =>
      row
        .map((value, c) => (value + prefixSum[r][c] > 0 ? 1 : 0))
        .reduce(sum, 0)
    )
    .reduce(sum, 0);
}

function sum(acc, cur) {
  return acc + cur;
}

function safeUpdateCell(r, c, value, table) {
  if (outOfRange(r, c, table.length, table[0].length)) return;
  table[r][c] += value;
}

function outOfRange(r, c, R, C) {
  return r < 0 || c < 0 || R <= r || C <= c;
}
