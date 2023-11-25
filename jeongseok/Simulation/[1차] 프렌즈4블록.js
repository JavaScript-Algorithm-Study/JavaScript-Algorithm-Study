function solution(m, n, board) {
  let count = 0;

  let charMap = Array.from(Array(m), () => Array(n).fill(0));

  for (let i = 0; i < board.length; i++) {
    charMap[i] = [...board[i].split("")];
  }

  let breakMap = Array.from(Array(m), () => Array(n).fill(0));

  while (1) {
    let canBreak = false;
    breakMap = Array.from(Array(m), () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (charMap[i][j] !== " ") {
          if (checkBreak(i, j, charMap[i][j])) {
            canBreak = true;
          }
        }
      }
    }

    if (!canBreak) {
      break;
    }

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (breakMap[i][j] === 1) {
          count += 1;
          charMap[i][j] = " ";
        }
      }
    }

    for (let i = m - 1; i > 0; i--) {
      for (let j = 0; j < n; j++) {
        if (charMap[i][j] === " ") {
          for (let k = i - 1; k >= 0; k--) {
            if (charMap[k][j] !== " ") {
              [charMap[i][j], charMap[k][j]] = [charMap[k][j], charMap[i][j]];
              break;
            }
          }
        }
      }
    }
  }

  function checkBreak(y, x, str) {
    if (y + 1 >= m || x + 1 >= n) {
      return false;
    }

    if (str === charMap[y][x + 1] && str === charMap[y + 1][x + 1] && str === charMap[y + 1][x]) {
      breakMap[y][x] = 1;
      breakMap[y][x + 1] = 1;
      breakMap[y + 1][x + 1] = 1;
      breakMap[y + 1][x] = 1;
      return true;
    }
    return false;
  }

  return count;
}
