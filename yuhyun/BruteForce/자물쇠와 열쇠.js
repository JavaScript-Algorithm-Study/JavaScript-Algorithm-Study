function solution(key, lock) {
  const M = key.length;
  const N = lock.length;

  const keys = [key];
  for (let deg = 90; deg < 360; deg += 90) {
    keys.push(rotate90DegClockwise(keys.at(-1)));
  }

  return keys.some((curKey) => {
    for (let offsetR = M - 1; offsetR > -N; offsetR -= 1) {
      for (let offsetC = M - 1; offsetC > -N; offsetC -= 1) {
        const open = canOpen(curKey, lock, offsetR, offsetC);
        if (open) return true;
      }
    }
    return false;
  });
}

function canOpen(key, lock, offsetR, offsetC) {
  const 홈 = 0;

  for (let r = 0; r < lock.length; r += 1) {
    for (let c = 0; c < lock[r].length; c += 1) {
      const keyR = r + offsetR;
      const keyC = c + offsetC;

      const keyValue = key?.[keyR]?.[keyC] ?? 홈;
      const lockValue = lock[r][c];

      if (lockValue === keyValue) {
        return false;
      }
    }
  }

  return true;
}

function rotate90DegClockwise(table) {
  const ROW = table.length;
  const COL = table[0].length;

  const rotated = Array.from(Array(COL), () => Array(ROW));
  table.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      rotated[colIndex][ROW - rowIndex - 1] = value;
    });
  });

  return rotated;
}
