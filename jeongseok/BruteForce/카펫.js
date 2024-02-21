// 가로 >= 세로
function solution(brown, yellow) {
  let yellowHeight = 1;
  while (1) {
    if (yellow % yellowHeight === 0) {
      let brownCount = (yellow / yellowHeight) * 2 + yellowHeight * 2 + 4;

      if (brownCount === brown) {
        break;
      }
    }

    yellowHeight++;
  }

  return [yellow / yellowHeight + 2, yellowHeight + 2];
}
