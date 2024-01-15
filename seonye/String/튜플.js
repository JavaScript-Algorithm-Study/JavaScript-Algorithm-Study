/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/64065
난이도 : Level 2
*/

function solution(s) {
  var answer = [];

  let elements = s
    .slice(1, s.length - 1)
    .split('},{')
    .map((ele) => ele.replace(/[{}]/g, '').split(',').map(Number))
    .sort((a, b) => a.length - b.length);

  answer.push(elements[0][0]);

  for (let i = 1; i < elements.length; i++) {
    for (let j = 0; j < elements[i].length; j++) {
      if (!answer.includes(elements[i][j])) {
        answer.push(elements[i][j]);
        break;
      }
    }
  }

  return answer;
}
