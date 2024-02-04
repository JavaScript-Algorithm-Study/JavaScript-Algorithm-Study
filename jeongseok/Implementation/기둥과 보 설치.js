function solution(n, build_frame) {
  const gi = Array.from(Array(n + 1), () => Array(n + 1).fill(0));
  const bo = Array.from(Array(n + 1), () => Array(n + 1).fill(0));

  build_frame.forEach(([x, y, a, b]) => {
    if (a === 0) {
      if (b === 0) {
        gi[x][y] = 0;
        if (!canDelete(gi, bo, n)) {
          gi[x][y] = 1;
        }
      }
      if (b === 1) {
        if (canGi(gi, bo, x, y)) {
          gi[x][y] = 1;
        }
      }
    }
    if (a === 1) {
      if (b === 0) {
        bo[x][y] = 0;
        if (!canDelete(gi, bo, n)) {
          bo[x][y] = 1;
        }
      }
      if (b === 1) {
        if (canBo(gi, bo, x, y)) {
          bo[x][y] = 1;
        }
      }
    }
  });

  const result = [];
  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      if (gi[i][j]) {
        result.push([i, j, 0]);
      }
      if (bo[i][j]) {
        result.push([i, j, 1]);
      }
    }
  }

  return result;
}

function canDelete(gi, bo, n) {
  for (let i = 0; i < n + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      if (gi[i][j] && !canGi(gi, bo, i, j)) {
        return 0;
      }
      if (bo[i][j] && !canBo(gi, bo, i, j)) {
        return 0;
      }
    }
  }
  return 1;
}

function canGi(gi, bo, x, y) {
  if (y === 0) {
    return 1;
  }
  if (y > 0 && gi[x][y - 1]) {
    return 1;
  }
  if ((x > 0 && bo[x - 1][y]) || bo[x][y]) {
    return 1;
  }
  return 0;
}

function canBo(pillar, bar, x, y) {
  if ((y > 0 && pillar[x][y - 1]) || pillar[x + 1][y - 1]) {
    return 1;
  }
  if (x > 0 && bar[x - 1][y] && bar[x + 1][y]) {
    return 1;
  }
  return 0;
}
