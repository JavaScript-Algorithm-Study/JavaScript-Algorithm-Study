// 8개의 캐릭터, 2장씩
// 같은 그림이라면 사라짐

// 1. 방향키 누르면 상하좌우 이동
// 2-1. ctrl + 방향키는 해당 방향에 가장 가까운 카드로 이동
// 2-2. 만약 해당 방향에 아무것도 없다면 해당 방향의 마지막 칸으로이동
// 2-3. 못 움직이면 가만히 있음
// 3. 엔터 누르면 카드 선택

// 방향키, 엔터, ctrl + 방향키 전부 조작 횟수 1로 계산

const moveY = [0, 0, -1, 1, 0, 0, -1, 1];
const moveX = [-1, 1, 0, 0, -1, 1, 0, 0];

function isValidPos(y, x) {
  if (y < 0 || x < 0 || y >= 4 || x >= 4) {
    return false;
  }
  return true;
}

function solution(board, r, c) {
  let count = 0;

  function bfs(y, x) {
    let isPickCharacter = 0;
    let originY;
    let originX;

    let queue = [];
    queue.push({ y, x });

    // 초기 좌표에 캐릭터가 있다면
    if (board[y][x]) {
      count += 1;
      isPickCharacter = 1;
      originY = y;
      originX = x;
    }

    let isVisited = Array.from(Array(4), () => Array(4).fill(0));
    isVisited[y][x] = 1;

    while (queue.length) {
      const { y, x } = queue.shift();

      for (let i = 0; i < 8; i++) {
        let newY;
        let newX;

        if (i < 4) {
          newY = y + moveY[i];
          newX = x + moveX[i];

          // 유효하면서 방문 안한곳
          if (isValidPos(newY, newX) && !isVisited[newY][newX]) {
            isVisited[newY][newX] = isVisited[y][x] + 1;
            queue.push({ y: newY, x: newX }); // 방문 처리후 queue에 삽입

            // 첫 캐릭터 선택이면서 캐릭터가 있다면
            if (isPickCharacter === 0 && board[newY][newX]) {
              isPickCharacter = 1;
              originY = newY;
              originX = newX;
              count += isVisited[newY][newX] + 1; // 엔터까지 포함
              isVisited = Array.from(Array(4), () => Array(4).fill(0));
              isVisited[newY][newX] = 1;
            }

            // 두번째 캐릭터 선택이면서 처음 선택한 캐릭터와 같다면
            else if (isPickCharacter === 1 && board[originY][originX] !== board[newY][newX] && board[newY][newX] !== 0) {
              board[newY][newX] = 0;
              board[originY][originX] = 0;
              count += isVisited[newY][newX] + 1; // 엔터 입력까지 포함
              isPickCharacter = 0;
              isVisited = Array.from(Array(4), () => Array(4).fill(0));
              isVisited[newY][newX] = 1;
            } else {
              isVisited[newY][newX] = isVisited[y][x] + 1;
            }
          }
        }

        if (i >= 4) {
          let isFind = false;
          let canMove = true;
          for (let j = 1; j < 4; j++) {
            const tmpY = y + moveY[i] * j;
            const tmpX = x + moveX[i] * j;

            if (!isValidPos(tmpY, tmpX)) {
              canMove = false;
              break;
            }

            if (board[tmpY][tmpX]) {
              newY = y + moveY[i] * j;
              newX = x + moveX[i] * j;
              isFind = true;
              break;
            }
          }

          if (!canMove) {
            break;
          }

          if (!isFind) {
            if (moveY[i] === -1) {
              newY = 0;
              newX = x;
            }

            if (moveY[i] === 1) {
              newY = 3;
              newX = x;
            }

            if (moveX[i] === -1) {
              newX = 0;
              newY = y;
            }

            if (moveX[i] === 1) {
              newX = 3;
              newY = y;
            }
          }
        }

        // 방문 안한 곳
        if (isValidPos(newY, newX) && !isVisited[newY][newX]) {
          isVisited[newY][newX] = isVisited[y][x] + 1;
          queue.push({ y: newY, x: newX }); // 방문 처리후 queue에 삽입

          // 첫 캐릭터 선택이면서 캐릭터가 있다면
          if (isPickCharacter === 0 && board[newY][newX]) {
            isPickCharacter = 1;
            originY = newY;
            originX = newX;
            count += isVisited[newY][newX] + 1; // 엔터까지 포함
            isVisited = Array.from(Array(4), () => Array(4).fill(0));
            isVisited[newY][newX] = 1;
          }

          // 두번째 캐릭터 선택이면서 처음 선택한 캐릭터와 같다면
          else if (isPickCharacter === 1 && board[originY][originX] !== board[newY][newX] && board[newY][newX] !== 0) {
            board[newY][newX] = 0;
            board[originY][originX] = 0;
            count += isVisited[newY][newX] + 1; // 엔터 입력까지 포함
            isPickCharacter = 0;
            isVisited = Array.from(Array(4), () => Array(4).fill(0));
            isVisited[newY][newX] = 1;
          } else {
            isVisited[newY][newX] = isVisited[y][x] + 1;
          }
        }
      }
    }
  }

  bfs(r, c);
  return count;
}
