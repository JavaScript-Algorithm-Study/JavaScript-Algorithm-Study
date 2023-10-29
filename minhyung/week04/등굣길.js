// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42898
// 시작날짜: 2023.10.28
// 시작시간: 17:20
// 종료시간: 18:17
// 소요시간: 00:57

// 문제를 잘못 이해했다... 최단거리가 아니라 모든 경우의 수를 구하는게 문제.
// 모듈러 연산은 생각보다 시간이 걸린다 -> 필요할 때만 모듈러 연산 적용하자

function solution(m, n, puddles) {
  const board = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => 0)
  );
  const canGo = (y, x) =>
    x >= 0 && x < m && y >= 0 && y < n && board[y][x] !== "p";
  puddles.forEach(([x, y]) => (board[y - 1][x - 1] = "p"));
  board[0][0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) continue;
      if (board[i][j] === "p") continue;

      const left = canGo(i, j - 1) ? board[i][j - 1] : 0;
      const top = canGo(i - 1, j) ? board[i - 1][j] : 0;

      board[i][j] = left + top;
      if (board[i][j] >= 1_000_000_007) {
        board[i][j] %= 1_000_000_007;
      }
    }
  }
  return board[n - 1][m - 1];
}
