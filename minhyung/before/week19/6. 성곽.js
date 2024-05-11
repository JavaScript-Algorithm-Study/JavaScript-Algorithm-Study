//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3 3
0 0 0
0 0 0
0 0 0
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const TILE = {
  WALL: "1",
  EMPTY: "0",
};
function solution(maxRow, maxCol, board) {
  // 8 아래벽, 4 오른쪽벽, 2 위벽, 1 왼쪽벽
  // prettier-ignore
  const move = [[1,0], [0,1], [-1,0], [0,-1]]
  const visited = Array.from({ length: maxRow }, () => Array(maxCol).fill(0));
  const roomSizes = {};

  const searchRoomSize = (y, x, roomSize = 1, roomNum) => {
    if (visited[y][x] !== 0) return 0;
    visited[y][x] = roomNum;

    const now = board[y][x].toString(2).padStart(4, "0").split("");

    // 현재 위치로부터 네 방향을 봐봄
    now.forEach((tile, direction) => {
      const [moveY, moveX] = move[direction];
      const [nextY, nextX] = [y + moveY, x + moveX];

      if (tile === TILE.WALL) return;
      if (board?.[nextY]?.[nextX] === undefined) return;

      roomSize = Math.max(roomSize, searchRoomSize(nextY, nextX, roomSize + 1, roomNum));
    });

    return roomSize;
  };

  // 방 정보 탐색
  let roomNum = 1;
  for (let i = 0; i < maxRow; i++) {
    for (let j = 0; j < maxCol; j++) {
      if (visited[i][j]) continue;
      roomSizes[roomNum] = searchRoomSize(i, j, 1, roomNum);
      roomNum++;
    }
  }

  // 네방향 탐색하면서 다른방 있는지 봐봄
  let biggestRoomSizeWithBrokenWall = roomSizes[1];
  for (let i = 0; i < maxRow; i++) {
    for (let j = 0; j < maxCol; j++) {
      const nowRoomNum = visited[i][j];

      move.forEach(([moveY, moveX]) => {
        // 상하좌우 보면서 다른 방 있는지 확인.
        const [nextY, nextX] = [i + moveY, j + moveX];
        if (!board?.[nextY]?.[nextX]) return;

        // 같은 방인지 확인
        const nextRoomNum = visited[nextY][nextX];
        if (nowRoomNum === nextRoomNum) return;

        if (biggestRoomSizeWithBrokenWall < roomSizes[nowRoomNum] + roomSizes[nextRoomNum]) {
          biggestRoomSizeWithBrokenWall = roomSizes[nowRoomNum] + roomSizes[nextRoomNum];
        }
      });
    }
  }

  const numRooms = Object.keys(roomSizes).length;
  const biggestRoomSize = Math.max(...Object.values(roomSizes));

  return [numRooms, biggestRoomSize, biggestRoomSizeWithBrokenWall].join("\n");
}

const [N, M] = input();
const board = Array.from({ length: M }, () => input());
console.log(solution(M, N, board));

// board 나가는곳 체크, 가장 큰 값 구하는거 에서 실수함
// 전부 0을 넣었을 때를 확인하지 않았었음
