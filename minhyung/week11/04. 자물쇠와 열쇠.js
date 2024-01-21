// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/60059
// 시작날짜: 2024.01.21
// 시작시간: 18:47
// 종료시간: 23:37
// 소요시간: 04:50

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
