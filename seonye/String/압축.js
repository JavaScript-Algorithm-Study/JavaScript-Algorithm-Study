/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/17684
난이도 : Level 2

1. 문제설명
LZW 압축
1. 길이가 1인 모든 단어를 포함하도록 사전 초기화
2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w 찾음
3. w에 해당하는 사전의 색인 번호 출력, 입력에서 w 제거
4. 입력에서 처리되지 않은 다음 글자가 남아있으면 w+c에 해당 단어 사전 등록
5. 2로 돌아감

영문 대문자만 처리

2. 풀이

*/
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = '';

rl.on('line', (line) => {
  input = line.trim();
  rl.close();
});

rl.on('close', () => {
  console.log(solution(input));
});

function solution(s) {
  const answer = [];
  const A_CODE = 'A'.charCodeAt();
  const Z_CODE = 'Z'.charCodeAt();
  const AtoZArr = Array.from({ length: Z_CODE - A_CODE + 1 }, (_, index) => {
    const charCode = A_CODE + index;
    return String.fromCharCode(charCode);
  });

  const dictionary = AtoZArr.reduce((acc, curr, i) => {
    acc[curr] = i + 1;
    return acc;
  }, {});
  let nextDictValue = Object.keys(dictionary).length + 1;

  const findInput = (startIdx) => {
    let result = startIdx;
    for (let i = startIdx; i < s.length; i++) {
      const word = s.slice(startIdx, i + 1);
      if (dictionary[word] !== undefined) result = i;
      else break;
    }
    return result;
  };

  let startIdx = 0;

  while (startIdx < s.length) {
    const endIdx = findInput(startIdx);
    const input = s.slice(startIdx, endIdx + 1);

    answer.push(dictionary[input]);

    if (endIdx !== s.length - 1) {
      const registerWord = s.slice(startIdx, endIdx + 2);
      dictionary[registerWord] = nextDictValue++;
    }
    startIdx += input.length;
  }

  return answer;
}
