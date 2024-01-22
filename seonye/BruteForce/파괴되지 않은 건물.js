/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/92344
난이도 : Level3

누적합
*/

function solution(board, skill) {
  var answer = 0;

  const row = board.length;
  const col = board[0].length;

  const effectBoard = Array.from({ length: row + 1 }, () =>
    Array(col + 1).fill(0)
  );

  skill.forEach((ele) => {
    const [type, r1, c1, r2, c2, degree] = ele;
    const effectDegree = type === 1 ? -degree : degree;

    effectBoard[r1][c1] += effectDegree;
    effectBoard[r1][c2 + 1] += -effectDegree;
    effectBoard[r2 + 1][c1] += -effectDegree;
    effectBoard[r2 + 1][c2 + 1] += effectDegree;
  });

  for (let r = 0; r < row; r++) {
    for (let c = 1; c < col + 1; c++) {
      effectBoard[r][c] += effectBoard[r][c - 1];
    }
  }

  for (let c = 0; c < col; c++) {
    for (let r = 1; r < row + 1; r++) {
      effectBoard[r][c] += effectBoard[r - 1][c];
    }
  }

  answer = board
    .map(
      (row, i) => row.filter((cell, j) => cell + effectBoard[i][j] > 0).length
    )
    .reduce((acc, cur) => acc + cur, 0);

  return answer;
}
