const canBlock = [
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [1, 1],
    [0, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
];

const canBlack = [
  [
    [0, 1],
    [0, 2],
  ],
  [
    [0, 0],
    [1, 0],
  ],
  [
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
  ],
  [
    [0, 0],
    [0, 2],
  ],
];

let N;

function validatePos(y, x) {
  // 불가능한 좌표
  if (x < 0 || y < 0 || y > N - 1 || x > N - 1) {
    return false;
  }

  return true;
}

function check(y, x, board) {
  for (let i = 0; i < canBlock.length; i++) {
    let targetY = y + canBlock[i][0][0];
    let targetX = x + canBlock[i][0][1];

    if (!validatePos(targetY, targetX)) {
      continue;
    }

    if (board[targetY][targetX] === "B" || board[targetY][targetX] === 0) {
      continue;
    }

    const isSameNumber = canBlock[i].every((block) => {
      if (!validatePos(y + block[0], x + block[1])) {
        return false;
      }
      return board[targetY][targetX] === board[y + block[0]][x + block[1]];
    });

    const isBlack = canBlack[i].every((block) => {
      if (!validatePos(y + block[0], x + block[1])) {
        return false;
      }
      return board[y + block[0]][x + block[1]] === "B";
    });

    if (isSameNumber && isBlack) {
      canBlock[i].map((block) => {
        board[y + block[0]][x + block[1]] = 0;
      });

      canBlack[i].map((block) => {
        board[y + block[0]][x + block[1]] = 0;
      });

      return 1;
    }
  }

  return 0;
}

function solution(board) {
  N = board.length;

  let answer = 0;

  while (1) {
    let curAnswer = answer;

    // 가장 윗줄
    for (let i = 0; i < N; i++) {
      if (board[0][i] === 0) {
        board[0][i] = "B";
      }
    }

    for (let i = 1; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let canBuild = true;

        for (let k = i - 1; k > -1; k--) {
          // 검은색 아니면서 블록이 있다면
          if (board[k][j] > 0) {
            canBuild = false;
            break;
          }
        }

        if (canBuild && board[i][j] === 0) {
          board[i][j] = "B";
        }
      }
    }

    for (let i = 0; i < N - 1; i++) {
      for (let j = 0; j < N - 1; j++) {
        if (board[i][j] > 0 || board[i][j] === "B") {
          curAnswer += check(i, j, board);
        }
      }
    }

    if (answer === curAnswer) {
      break;
    }

    answer = curAnswer;
  }

  return answer;
}
