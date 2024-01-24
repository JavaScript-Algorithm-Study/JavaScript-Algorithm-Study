/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/60059
난이도 : Level3
*/

function rotate90(key) {
  const temp = [];
  const keyLength = key.length;

  for (let c = 0; c < keyLength; c++) {
    let tempRow = [];
    for (let r = 0; r < keyLength; r++) {
      tempRow.push(key[r][c]);
    }
    temp.push(tempRow.reverse());
  }

  return temp;
}

function solution(key, lock) {
  var answer = false;
  const lockLength = lock.length;
  const lockBoard = Array.from({ length: lockLength * 3 }, () =>
    new Array(lockLength * 3).fill(-1)
  );

  for (let i = 0; i < lock.length; i++) {
    for (let j = 0; j < lock.length; j++) {
      lockBoard[i + lockLength][j + lockLength] = lock[i][j];
    }
  }

  let tempKey = key;
  for (let i = 0; i < 4; i++) {
    let isMatch = false;
    for (let startKeyR = 1; startKeyR < lock.length * 2; startKeyR++) {
      for (let startKeyC = 1; startKeyC < lock.length * 2; startKeyC++) {
        const tempLockBoard = JSON.parse(JSON.stringify(lockBoard));
        for (let keyR = 0; keyR < key.length; keyR++) {
          for (let keyC = 0; keyC < key.length; keyC++) {
            if (
              startKeyR + keyR < lock.length ||
              startKeyR + keyR > lock.length * 2 - 1 ||
              startKeyC + keyC < lock.length ||
              startKeyC + keyC > lock.length * 2 - 1
            )
              continue;
            else {
              tempLockBoard[startKeyR + keyR][startKeyC + keyC] +=
                tempKey[keyR][keyC];
            }
          }
        }
        const lockBoardResult = tempLockBoard
          .slice(lock.length, lock.length * 2)
          .map((row) => row.slice(lock.length, lock.length * 2));
        isMatch = lockBoardResult.some(
          (row) => row.includes(0) || row.includes(2)
        );
        if (!isMatch) {
          return true;
        }
      }
    }
    tempKey = rotate90(tempKey);
  }

  return answer;
}
