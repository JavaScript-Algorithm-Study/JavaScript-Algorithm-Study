function solution(board, aloc, bloc) {
  const R = board.length;
  const C = board[0].length;
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const play = (player, [playerR, playerC], opponentLoc, nMove, board) => {
    if (!board[playerR][playerC]) {
      return [nMove, getNextPlayer(player)];
    }

    const childrenResult = [];
    direction.forEach(([dr, dc]) => {
      const nextR = playerR + dr;
      const nextC = playerC + dc;
      if (outOfRange(nextR, nextC, R, C)) {
        return;
      }

      if (!board[nextR][nextC]) {
        return;
      }

      board[playerR][playerC] = 0;

      const childResult = play(
        getNextPlayer(player),
        opponentLoc,
        [nextR, nextC],
        nMove + 1,
        board
      );
      childrenResult.push(childResult);

      board[playerR][playerC] = 1;
    });

    if (!childrenResult.length) {
      return [nMove, getNextPlayer(player)];
    }

    let minPlayerWin;
    let maxOpponentWin;
    childrenResult.forEach(([childNMove, childWinPlayer]) => {
      if (childWinPlayer === player) {
        minPlayerWin = Math.min(minPlayerWin ?? Infinity, childNMove);
        return;
      }
      maxOpponentWin = Math.max(maxOpponentWin ?? 0, childNMove);
    });

    return minPlayerWin
      ? [minPlayerWin, player]
      : [maxOpponentWin, getNextPlayer(player)];
  };

  const [maxMove] = play(0, aloc, bloc, 0, board);
  return maxMove;
}

function outOfRange(r, c, R, C) {
  return r < 0 || c < 0 || R <= r || C <= c;
}

function getNextPlayer(player) {
  return (player + 1) % 2;
}
