function turn(key) {
  const turnArr = Array.from(Array(key.length), () => Array(key.length).fill(0));

  for (let i = 0; i < key.length; i++) {
    for (let j = 0; j < key.length; j++) {
      turnArr[i][j] = key[key.length - 1 - j][i];
    }
  }

  return turnArr;
}

function solution(key, lock) {
  const len = lock.length + key.length * 2 - 2;

  const arr = Array.from(Array(len), () => Array(len).fill(0));

  for (let i = key.length - 1; i < len - key.length + 1; i++) {
    for (let j = key.length - 1; j < len - key.length + 1; j++) {
      arr[i][j] = lock[i - key.length + 1][j - key.length + 1];
    }
  }

  // 모든 key 경우의 수 구하기
  let keyArr = [key.map((v) => [...v])];
  for (let i = 0; i < 3; i++) {
    keyArr.push(turn(keyArr[keyArr.length - 1]));
  }

  for (let i = 0; i < 4; i++) {
    const targetKeyArr = keyArr[i];

    // 모든 경우 탐색
    for (let j = 0; j < key.length + lock.length - 1; j++) {
      for (let k = 0; k < key.length + lock.length - 1; k++) {
        let copyArr = arr.map((v) => [...v]);

        for (let y = 0; y < key.length; y++) {
          for (let x = 0; x < key.length; x++) {
            copyArr[j + y][k + x] += targetKeyArr[y][x];
          }
        }

        let flag = true;

        for (let ii = key.length - 1; ii < copyArr.length - key.length + 1; ii++) {
          for (let jj = key.length - 1; jj < copyArr.length - key.length + 1; jj++) {
            if (copyArr[ii][jj] !== 1) {
              flag = false;
            }
          }
        }

        if (flag) {
          return true;
        }
      }
    }
  }

  return false;
}
