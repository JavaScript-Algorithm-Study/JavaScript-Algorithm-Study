/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/118670
난이도 : Level4

효율성 불통 : 1,2,4,5,6,7,9
*/
const operations = ['ShiftRow', 'Rotate', 'ShiftRow', 'Rotate'];

function solution(rc, operations) {
  const rowLen = rc.length;
  const colLen = rc[0].length;

  function shiftRow(arr, rNum) {
    const lastRow = arr.splice(rNum - 1, 1);

    return lastRow.concat(arr);
  }

  function rotate(arr, rNum, cNum) {
    const result = JSON.parse(JSON.stringify(arr));

    result[0][0] = arr[1][0];

    for (let i = 1; i < cNum; i++) {
      result[0][i] = arr[0][i - 1];
    }

    for (let i = 1; i < rNum; i++) {
      result[i][cNum - 1] = arr[i - 1][cNum - 1];
    }

    for (let i = 0; i < cNum - 1; i++) {
      result[rNum - 1][i] = arr[rNum - 1][i + 1];
    }

    for (let i = 1; i < rNum - 1; i++) {
      result[i][0] = arr[i + 1][0];
    }

    return result;
  }

  for (let opr of operations) {
    if (opr === 'ShiftRow') rc = shiftRow(rc, rowLen);
    else rc = rotate(rc, rowLen, colLen);
  }

  return rc;
}
