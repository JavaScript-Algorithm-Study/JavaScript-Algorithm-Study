/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42842
난이도 : Level2
*/
function solution(brown, yellow) {
  var answer = [];
  let col = 3;
  const rowColSum = (brown + 4) / 2;

  while (col < rowColSum) {
    const row = rowColSum - col;
    if ((row - 2) * (col - 2) === yellow) {
      break;
    }
    col += 1;
  }

  answer = [rowColSum - col, col];

  return answer;
}
