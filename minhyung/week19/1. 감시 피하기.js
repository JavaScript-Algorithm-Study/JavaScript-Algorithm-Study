//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4
S S S T
X X X X
X X X X
T T T X
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ');})();

const BOARD = {
  TEACHER: "T",
  STUDENT: "S",
  EMPTY: "X",
  WALL: "O",
};

function getTeacherPositions(board) {
  const positions = [];

  board.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === BOARD.TEACHER) {
        positions.push({ y, x });
      }
    });
  });

  return positions;
}

function makeBoardCombinationWithWalls(board, n) {
  const result = [];

  const dfs = (now, wallCnt) => {
    if (wallCnt === 3) {
      const newBoard = board.map((row) => [...row]);
      result.push(newBoard);
      return;
    }

    for (let i = now; i < n * n; i++) {
      const ny = i % n;
      const nx = Math.floor(i / n);

      if (board[ny][nx] !== BOARD.EMPTY) {
        continue;
      }
      const beforeTile = board[ny][nx];

      board[ny][nx] = BOARD.WALL;
      dfs(i + 1, wallCnt + 1);
      board[ny][nx] = beforeTile;
    }
  };

  dfs(0, 0);
  return result;
}

function canStudentGetOut(board, teacherPositions) {
  // prettier-ignore
  const move = [[0,1], [1,0], [0,-1], [-1,0]];

  const canSeeStudent = ({ y, x }) => {
    for (const [yy, xx] of move) {
      let [ny, nx] = [yy + y, xx + x];

      while (board?.[ny]?.[nx]) {
        // 벽이면 다음 방향을 봄
        if (board[ny][nx] === BOARD.WALL) {
          break;
        }
        if (board[ny][nx] === BOARD.STUDENT) {
          return true;
        }
        [ny, nx] = [ny + yy, nx + xx];
      }
    }
  };
  // 모든 선생이 학생을 못보면
  return teacherPositions.every((pos) => !canSeeStudent(pos));
}

function solution(n, board) {
  const teacherPositions = getTeacherPositions(board);
  const boardCombinationWithWalls = makeBoardCombinationWithWalls(board, n);

  // 벽 세워둔것중 하나라도 학생을 못보면 Yes, 아니면 No
  return boardCombinationWithWalls.some((board) => canStudentGetOut(board, teacherPositions)) ? "YES" : "NO";
}

const N = +input();
const board = Array.from({ length: N }, () => input());
console.log(solution(N, board));
