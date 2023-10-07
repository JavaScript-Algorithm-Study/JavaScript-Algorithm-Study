/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/60057
난이도 : Level 2

1. 문제설명
문자열을 1개 이상의 단위로 잘라 압축하여 더 짧은 문자열로 표현
압축할 문자열 s를 1개이상의 단위로 문자열을 잘라 압축하여 표현한 문자열중 가장 짧은 것을 구하라

2. 풀이

최소 단위 : 1
최대 단위 : 문자열의 길이 / 2
최소 문자열 길이 : 문자열의 길이 / 2 + 1
최대 문자열 길이 : 뮨자열의 길이

문자열의 길이가 1000이하이므로 시간복잡도가 O(N^2)이어도 풀릴 것 같다.

앞에서 부터 단위만큼 문자열을 자른 배열을 만든다.
이중반복문을 통해 앞에서 부터 중복을 확인하면서 최소 압축 문자열을 구함.

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
  let answer = s.length;
  let unit = 1;
  const MAX_UNIT = Math.floor(s.length / 2);

  while (unit <= MAX_UNIT) {
    let result = '';
    const sliceStrArr = s
      .split('')
      .map((_, i) => {
        if (i % unit !== 0) return;
        return s.slice(i, i + unit);
      })
      .filter((w) => w !== undefined);

    for (let i = 0; i < sliceStrArr.length; i++) {
      const temp = [sliceStrArr[i]];
      const curr = sliceStrArr[i];
      let isDuplicate = false;

      for (let j = i + 1; j < sliceStrArr.length; j++) {
        if (curr !== sliceStrArr[j]) {
          break;
        }
        temp.push(sliceStrArr[j]);
        isDuplicate = true;
      }
      if (!isDuplicate) result += temp[0];
      else {
        result += temp.length + temp[0];
        i += temp.length - 1;
      }
    }
    if (result.length < answer) answer = result.length;
    unit += 1;
  }

  return answer;
}
