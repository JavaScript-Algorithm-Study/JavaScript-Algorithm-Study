/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/60061
난이도 : Level3
*/

function solution(n, build_frame) {
  var answer = [];

  function makeString(arr) {
    const [x, y, stuff] = arr;
    return `${x}_${y}_${stuff}`;
  }

  function check(answer) {
    for (let i = 0; i < answer.length; i++) {
      const [x, y, stuff, operation] = answer[i].split('_').map(Number);
      if (stuff === 0) {
        if (
          y === 0 ||
          answer.includes(makeString([x - 1, y, 1])) ||
          answer.includes(makeString([x, y, 1])) ||
          answer.includes(makeString([x, y - 1, 0]))
        )
          continue;
        return false;
      } else {
        if (
          answer.includes(makeString([x, y - 1, 0])) ||
          answer.includes(makeString([x + 1, y - 1, 0])) ||
          (answer.includes(makeString([x - 1, y, 1])) && answer.includes(makeString([x + 1, y, 1])))
        )
          continue;
        return false;
      }
    }
    return true;
  }

  for (let i = 0; i < build_frame.length; i++) {
    const [x, y, stuff, operation] = build_frame[i];
    if (operation === 1) {
      answer.push(makeString([x, y, stuff]));
      if (!check(answer)) answer.pop();
    } else {
      const idx = answer.indexOf(makeString([x, y, stuff]));
      answer.splice(idx, 1);

      if (!check(answer)) answer.push(makeString([x, y, stuff]));
    }
  }

  answer = answer.map((ele) => ele.split('_').map(Number));
  answer.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  return answer;
}
