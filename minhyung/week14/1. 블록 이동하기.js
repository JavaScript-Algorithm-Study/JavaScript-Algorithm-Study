function canMove(board, y, x, isHorizontal) {
  if (board?.[y]?.[x] === undefined || board?.[y]?.[x] === 1) {
    return false;
  }
  // 가로면 오른쪽 옆도 봐야함
  if (isHorizontal && board?.[y]?.[x + 1] === 1) {
    return false;
  }
  // 세로면 아래도 봐야함
  if (!isHorizontal && board?.[y + 1]?.[x] === 1) {
    return false;
  }
  return true;
}
// function canRotate(board, y, x,)
function getNextMoves(board, y, x, isHorizontal) {
  // 가로일 때: isHorizontal변경 -> 세로
  // 가로일 때: y-1, isHorizontal변경 -> 세로
  // 가로일 때: x+1, isHorizontal변경 -> 세로
  // 가로일 때: y-1, x+1, isHorizontal변경 -> 세로

  // 세로일 때: isHorizontal변경 -> 가로
  // 세로일 때: x-1, isHorizontal변경 -> 가로
  // 세로일 때: y+1, isHorizontal변경 -> 가로
  // 세로일 때: y+1, x-1, isHorizontal변경-> 가로
  let a = isHorizontal ? -1 : 1;
  let b = isHorizontal ? 1 : -1;

  return [
    [y + 1, x, isHorizontal],
    [y - 1, x, isHorizontal],
    [y, x + 1, isHorizontal],
    [y, x - 1, isHorizontal],
    board?.[y + 1]?.[x + 1] === 0 ? [y, x, !isHorizontal] : [],
    board?.[y - 1]?.[x + 1] === 0 ? [y + a, x, !isHorizontal] : [],
    board?.[y + 1]?.[x] === 0 ? [y, x + b, !isHorizontal] : [],
    board?.[y - 1]?.[x] === 0 ? [y + a, x + b, !isHorizontal] : [],
  ];
}

function solution(board) {
  const [goalY, goalX] = [board.length - 1, board[0].length - 1];
  const dist = Array.from({ length: goalY + 1 }, () => Array(goalX).fill(Infinity));
  const q = [[0, 0, 0, true]];
  dist[0][0] = 0;
  // console.log(board, board[2][1]);
  while (q.length) {
    const [y, x, time, isHorizontal] = q.shift();
    console.log(y, x, time, isHorizontal ? "가로" : "세로");

    if (board?.[y]?.[x] && y === goalY && x === goalX) return time;
    if (isHorizontal && board?.[y]?.[x + 1] && y === goalY && x + 1 === goalX) return time;
    if (!isHorizontal && board?.[y + 1]?.[x] && y + 1 === goalY && x === goalX) return time;

    const nextMoves = getNextMoves(board, y, x, isHorizontal);
    nextMoves.forEach(([ny, nx, nIsHorizontal]) => {
      if (!canMove(board, ny, nx, nIsHorizontal)) return;
      if (dist?.[ny]?.[nx] <= time + 1) return;

      dist[ny][nx] = time + 1;
      q.push([ny, nx, time + 1, nIsHorizontal]);
    });
  }
  return -1;
}
