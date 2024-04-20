//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4 3
1 2 3 4
2 3 4 5
3 4 5 6
4 5 6 7
2 2 3 4
3 4 3 4
1 1 4 4
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function prefixSum(N, board, position) {
  for (let i = 0; i < N; i++) {
    for (let j = 1; j < N; j++) {
      if (position === "x") {
        board[i][j] += board[i][j - 1];
      }
      if (position === "y") {
        board[j][i] += board[j - 1][i];
      }
    }
  }
}
function solution(N, board, positions) {
  let result = "";

  // 가로방향
  prefixSum(N, board, "x");
  // 세로방향
  prefixSum(N, board, "y");

  positions.forEach(([y1, x1, y2, x2]) => {
    x1--, y1--, x2--, y2--;
    // [y][x] - [y2][x1-1] - [y1-1][x2] + [y1-1][x1-1]
    const topLeft = board?.[y1 - 1]?.[x1 - 1] ?? 0;
    const topRight = board?.[y1 - 1]?.[x2] ?? 0;
    const bottomLeft = board[y2]?.[x1 - 1] ?? 0;
    const bottomRight = board[y2][x2];

    const sum = bottomRight - bottomLeft - topRight + topLeft;
    result += `${sum}\n`;
  });

  return result;
}

const [N, M] = input();
const board = Array.from({ length: N }, () => input());
const positions = Array.from({ length: M }, () => input());
console.log(solution(N, board, positions));
