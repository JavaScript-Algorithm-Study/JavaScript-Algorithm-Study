// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/60059
// 시작날짜: 2024.01.21
// 시작시간: 18:47
// 종료시간: 24:37
// 소요시간: 05:50

function rotateArrayToRight(array) {
  const rotatedArrayToRight = [];
  const N = array.length;
  for (let x = 0; x < N; x++) {
    const newCols = [];
    for (let y = N - 1; y >= 0; y--) {
      newCols.push(array[y][x]);
    }
    rotatedArrayToRight.push(newCols);
  }
  return rotatedArrayToRight;
}

function isCorrectKey(key, lock, y, x, si, sj) {
  const tmpLock = [...lock.map((col) => [...col])];
  const N = key.length;
  for (let i = si; i < N; i++) {
    for (let j = sj; j < N; j++) {
      const [lockY, lockX] = [y + i, x + j];
      if (lock?.[lockY]?.[lockX] === undefined) continue;
      if (key?.[i]?.[j] === undefined) continue;

      if (lock[lockY][lockX] === key[i][j]) return false;
      else tmpLock[lockY][lockX] += key[i][j];
    }
  }
  return tmpLock.every((row) => row.every((col) => col === 1));
}
function solution(key, lock) {
  const N = lock.length; // 자물쇠
  const M = key.length; // 열쇠
  for (let r = 0; r < 4; r++) {
    // 아래는 현재 키, key의 오른쪽 일부만 lock에 걸칠수있을수도 있어서 1-M
    for (let y = -M; y < N; y++) {
      for (let x = -M; x < N; x++) {
        if (
          isCorrectKey(key, lock, y, x, 0, 0) || // 왼위
          isCorrectKey(key, lock, y, x, 0, M - x - 1) || // 오위
          isCorrectKey(key, lock, y, x, M - y - 1, 0) || // 왼아
          isCorrectKey(key, lock, y, x, M - y - 1, M - x - 1) //오아
        ) {
          return true;
        }
      }
    }
    key = rotateArrayToRight(key);
  }
  return false;
}

// 아래는 그냥 리팩토링
// function rotateKey(key) {
//   return key[0].map((_, colIdx) => key.map((_, rowIdx) => key[key.length - rowIdx - 1][colIdx]));
// }

// function isKeyFitInLock(key, lockArr, offsetY, offsetX) {
//   const lock = lockArr.map((row) => [...row]);

//   // key의 시작지점이 i,
//   for (let i = 0; i < key.length; i++) {
//     for (let j = 0; j < key.length; j++) {
//       const [lockY, lockX] = [offsetY + i, offsetX + j];
//       if (lock?.[lockY]?.[lockX] === undefined) continue;

//       lock[lockY][lockX] += key[i][j];
//     }
//   }

//   return lock.every((row) => row.every((col) => col === 1));
// }

// function solution(key, lock) {
//   const range = Array.from(Array(lock.length + key.length), (_, i) => i - 1);

//   for (let rotation = 0; rotation < 4; rotation++) {
//     if (range.some((y) => range.some((x) => isKeyFitInLock(key, lock, y, x)))) {
//       return true;
//     } else {
//       key = rotateKey(key);
//     }
//   }

//   return false;
// }

// 열쇠는 회전과 이동이 가능함
// 돌기를 홈에 맞게 채우면 자물쇠가 열림
// 영역을 벗어난 부분(보드밖)에 있는 열쇠의 홈, 돌기는 자물쇠 여는데 영향 주지않음
// 하지만 자물쇠 영역 내에서는 열쇠 돌기와 자물쇠 홈이 정확히 일치해야함
// 열쇠 돌기, 자물쇠 돌기가 충돌하면 안됨.
// 자물쇠의 모든 홈을 채워야 자물쇠가 열림

//     0, 0      M-1, 0
//     0, M-1    M-1, M-1
