//풀이 참고
//https://nahwasa.com/entry/%EB%B0%B1%EC%A4%80-1918-%EC%9E%90%EB%B0%94-%ED%9B%84%EC%9C%84-%ED%91%9C%EA%B8%B0%EC%8B%9D-boj-1918-java

const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split(' ');

function solution(exp) {
  const list = [];
  let answer = '';
  const opPriority = {};
  opPriority['*'] = opPriority['/'] = 1;
  opPriority['+'] = opPriority['-'] = -1;

  for (let s of exp) {
    if (s === '(') {
      list.push(s);
      continue;
    } else if (s === ')') {
      while (list.length > 0 && list.at(-1) !== '(') {
        answer += list.pop();
      }
      list.pop();
      continue;
    } else if (s >= 'A') {
      answer += s;
      continue;
    }

    while (list.length > 0 && opPriority[list.at(-1)] >= opPriority[s]) {
      answer += list.pop();
    }
    list.push(s);
  }

  while (list.length > 0) {
    answer += list.pop();
  }

  return answer;
}

const exp = input[0].split('');
console.log(solution(exp));
