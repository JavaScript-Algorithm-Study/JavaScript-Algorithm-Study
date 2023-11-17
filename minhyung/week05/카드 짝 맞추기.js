// 문제링크: school.programmers.co.kr/learn/courses/30/lessons/72415
// 시작날짜: 2023.11.11
// 시작시간: 15:43
// 종료시간: 2시간 초과해서 해설 보고 풀이함.
// 4 x 4 크기 격자로 표시됨
// 8가지 캐릭터 그림이 그려진 카드 2장씩 무작위 배치
// 유저가 2장 선택 후 같은그림
//  -> 화면에서 사라짐
// 같은그림 아님
//  -> 원래 상태로 뒷면이 보이도록 뒤집힘
// 모든 카드를 화면에서 사라지게 하면 게임 종료

// 카드는 `커서`를 이용해 선택
// 커서는 현재 선택한 위치를 표시하는 테두리 상자임.

// 방향키 ←, ↑, ↓, → 중 하나를누르면 해당 방향으로 1칸이동
// ctrl과 함께 누르면 해당 방향의 가장 가까운 카드로 한번에 이동
//  -> 만약 해당 방향에 카드가 없으면 그 방향의 마지막 칸으로 이동
// 만약 해당 누른 키 방향으로 이동 가능한 카드, 공간이 없다면 카드는 움직이지 않음

// 뒤집을 때는 enter를 입력
// 앞면이 1장이면 앞면 유지
// 앞면이 2장일 때
//  -> 같은 카드라면 화면에서 제거
//  -> 다른 카드라면 원래대로 뒤집음

// 남은 카드를 모두 제거하는데 필요한 키 조작 횟수의 최솟값 구하고싶음.
// Enter, 방향키, ctrl + 방향키 = 조작 1회
// ctrl + 방향키 누르면 바로 가지는게 아니라 다른 카드가 존재할 경우 그 만큼 dist가 늘어남

function solution(board, r, c) {
  const cardTypeNumber = getCardTypeNumber(board);
  const cardLocation = getCardLocation(board);
  const permu = getPermu(cardTypeNumber, [], new Set(), []);

  let nowOrder = [];
  let result = Infinity;

  const dfs = (nowPos, dist, order) => {
    if (order === cardTypeNumber) {
      return dist;
    }
    const nowCard = nowOrder[order];
    const [pos1, pos2] = cardLocation.get(nowCard);

    // 현재좌표 -> 1 -> 2
    const fromPos1Dist =
      getToGoalDist(board, nowPos, pos1) + getToGoalDist(board, pos1, pos2);
    // 현재좌표 -> 2 -> 1
    const fromPos2Dist =
      getToGoalDist(board, nowPos, pos2) + getToGoalDist(board, pos2, pos1);

    board[pos1.y][pos1.x] = board[pos2.y][pos2.x] = 0;

    const result = Math.min(
      dfs(pos2, dist + fromPos1Dist + 2, order + 1),
      dfs(pos1, dist + fromPos2Dist + 2, order + 1)
    );

    board[pos1.y][pos1.x] = board[pos2.y][pos2.x] = nowCard;

    return result;
  };

  permu.forEach((_nowOrder) => {
    nowOrder = _nowOrder;
    const dfsResult = dfs({ y: r, x: c }, 0, 0);
    result = dfsResult < result ? dfsResult : result;
  });

  return result;
}

function getCardTypeNumber(board) {
  return new Set(Array.from(board.flat().filter((num) => num !== 0))).size;
}

function getCardLocation(board) {
  const cardLocation = new Map();

  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) {
        return;
      }
      const num = board[i][j];
      cardLocation.has(num)
        ? cardLocation.get(num).push({ y: i, x: j })
        : cardLocation.set(num, [{ y: i, x: j }]);
    });
  });

  return cardLocation;
}

function getPermu(cardTypeNumber, result, used, arr) {
  if (arr.length === cardTypeNumber) {
    result.push(arr);
    return;
  }
  for (let i = 1; i <= cardTypeNumber; i++) {
    if (used.has(i)) {
      continue;
    }
    used.add(i);
    getPermu(cardTypeNumber, result, used, [...arr, i]);
    used.delete(i);
  }
  return result;
}

function isInBoard(y, x) {
  return y >= 0 && y < 4 && x >= 0 && x < 4;
}

function getToGoalDist(board, origin, destination) {
  const next = [ [-1, 0], [0, 1], [1, 0], [0, -1]]; // prettier-ignore
  const visited = Array.from({ length: 4 }, () => Array(4).fill(false));
  const q = [];

  q.push([origin.y, origin.x, 0]);
  visited[origin.y][origin.x] = true;

  while (q.length) {
    const [y, x, dist] = q.shift();

    if (y === destination.y && x === destination.x) {
      return dist;
    }

    for (const [yy, xx] of next) {
      const [nyCtrl, nxCtrl] = getNextPosUsingCtrl(board, { y, x }, yy, xx);
      if (!visited[nyCtrl][nxCtrl]) {
        q.push([nyCtrl, nxCtrl, dist + 1]);
        visited[nyCtrl][nxCtrl] = true;
      }

      const [ny, nx] = [yy + y, xx + x];
      if (!isInBoard(ny, nx) || visited[ny][nx]) {
        continue;
      }
      q.push([ny, nx, dist + 1]);
      visited[ny][nx] = true;
    }
  }
}

function getNextPosUsingCtrl(board, nowPos, yy, xx) {
  let { y, x } = nowPos;
  let i = 1;
  while (true) {
    const [ny, nx] = [y + yy * i, x + xx * i];
    if (!isInBoard(ny, nx)) break;
    y = ny;
    x = nx;
    if (board[y][x] !== 0) break;
  }
  return [y, x];
}

const a = solution(
  [
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  0,
  0
);
console.log(a);
