function solution(m, n, board) {
  const splitedBoard = board.map((row) => row.split(""));
  let nRemoved = 0;

  while (true) {
    const twoByTwoPositions = [];
    for (let r = 0; r < m - 1; r += 1) {
      for (let c = 0; c < n - 1; c += 1) {
        if (splitedBoard[r][c] === " ") {
          continue;
        }

        if (isTwoByTwo(r, c, splitedBoard)) {
          twoByTwoPositions.push([r, c]);
        }
      }
    }

    if (!twoByTwoPositions.length) {
      break;
    }

    twoByTwoPositions.forEach(
      ([r, c]) => (nRemoved += removeTwoByTwo(r, c, splitedBoard))
    );
    drop(splitedBoard);
  }

  return nRemoved;
}

function removeTwoByTwo(r, c, board) {
  let nRemoved = 0;
  const direction = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  direction.forEach(([dr, dc]) => {
    const nextR = r + dr;
    const nextC = c + dc;
    if (board[nextR][nextC] === " ") {
      return;
    }

    board[nextR][nextC] = " ";
    nRemoved += 1;
  });
  return nRemoved;
}

function drop(board) {
  const [R, C] = getBoardSize(board);

  for (let c = 0; c < C; c += 1) {
    const current = [];
    for (let r = 0; r < R; r += 1) {
      if (board[r][c] !== " ") {
        current.push(board[r][c]);
        board[r][c] = " ";
      }
    }

    let topR = R - 1;
    while (current.length) {
      const character = current.pop();
      board[topR][c] = character;
      topR -= 1;
    }
  }

  return board;
}

function isTwoByTwo(r, c, board) {
  const direction = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  const character = board[r][c];

  return direction.every(([dr, dc]) => {
    const nextR = r + dr;
    const nextC = c + dc;
    if (outOfRange(nextR, nextC, ...getBoardSize(board))) {
      return false;
    }

    return character === board[nextR][nextC];
  });
}

function getBoardSize(board) {
  return [board.length, board[0].length];
}

function outOfRange(r, c, R, C) {
  return r < 0 || c < 0 || R <= r || C <= c;
}
