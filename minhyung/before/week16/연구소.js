const stdin =
  process.platform === "linux"
    ? require("fs").readFileSync(0, "utf-8").trim().split("\n")
    : `
4 6
0 0 0 0 0 0
1 0 0 0 0 2
1 1 1 0 0 2
0 0 0 0 0 2
`
        .trim()
        .split("\n");
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const EMPTY = 0;
const WALL = 1;
const VIRUS = 2;

const countEmptySpace = (board) => board.flat().filter((kindOfWall) => kindOfWall === EMPTY).length;

const findVirusPos = (board) => {
  const viruses = [];
  board.forEach((row, rowIdx) => {
    row.forEach((kindOfWall, colIdx) => {
      if (kindOfWall === VIRUS) {
        viruses.push([rowIdx, colIdx]);
      }
    });
  });
  return viruses;
};

function spreadVirus(board, viruses) {
  const move = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const q = [...viruses];

  while (q.length) {
    const [y, x] = q.shift();

    for (const [yy, xx] of move) {
      const [ny, nx] = [y + yy, x + xx];
      if (board?.[ny]?.[nx] !== EMPTY) continue;

      board[ny][nx] = VIRUS;
      q.push([ny, nx]);
    }
  }
}

function solution(maxRow, maxCol, board) {
  const viruses = findVirusPos(board);

  const findMaxSafeArea = (y, x, wallCnt, maxSafeArea) => {
    if (wallCnt === 3) {
      const nowBoard = board.map((row) => [...row]);
      spreadVirus(nowBoard, viruses);
      return Math.max(maxSafeArea, countEmptySpace(nowBoard));
    }

    for (let i = y; i < maxRow; i++) {
      for (let j = x; j < maxCol; j++) {
        if (board[i][j] !== EMPTY) continue;

        board[i][j] = WALL;
        maxSafeArea = findMaxSafeArea(i, j + 1, wallCnt + 1, maxSafeArea);
        board[i][j] = EMPTY;
      }
      x = 0;
    }

    return maxSafeArea;
  };

  return findMaxSafeArea(0, 0, 0, 0);
}

const [N, M] = input();
const board = Array.from({ length: N }, () => input());
console.log(solution(N, M, board));

// 1. 벽을 3개 세우고
// 2. 바이러스를 퍼트리고
// 3. 남은 0 개수를 센다.
