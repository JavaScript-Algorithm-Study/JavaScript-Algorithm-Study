function solution(n, info) {
  let maxScore = 0;
  let maxArr;
  let l_arr = new Array(11).fill(0);

  function backtracking(depth, arrow) {
    if (arrow === n) {
      checkWin();
      return;
    }

    for (let i = depth; i < 11; i++) {
      l_arr[i] += 1;
      backtracking(i, arrow + 1);
      l_arr[i] -= 1;
    }
  }

  function checkWin() {
    let l_s = 0;
    let a_s = 0;

    for (let i = 0; i < 11; i++) {
      if (l_arr[i] > info[i]) {
        l_s += 10 - i;
      } else if (l_arr[i] < info[i]) {
        a_s += 10 - i;
      } else if (info[i] > 0 && info[i] === l_arr[i]) {
        a_s += 10 - i;
      }
    }

    if (l_s - a_s > 0 && l_s - a_s > maxScore) {
      maxScore = l_s - a_s;
      maxArr = [...l_arr];
    } else if (l_s - a_s > 0 && l_s - a_s === maxScore) {
      for (let i = 0; i < 11; i++) {
        if (l_arr[10 - i] === maxArr[10 - i]) {
          continue;
        } else if (l_arr[10 - i] > maxArr[10 - i]) {
          maxArr = [...l_arr];
        } else {
          break;
        }
      }
    }

    return;
  }

  backtracking(0, 0);

  return maxScore === 0 ? [-1] : maxArr;
}
