/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/17677
난이도 : Level 2
*/

const str1 = 'FRANCE';
const str2 = 'french';

function solution(str1, str2) {
  var answer = 0;
  const string1 = str1.toLowerCase();
  const string2 = str2.toLowerCase();

  const str1Dic = {};
  const str2Dic = {};

  for (let i = 0; i < string1.length - 1; i++) {
    const word = string1.slice(i, i + 2);
    if (/[a-z]{2}/.test(word)) {
      if (str1Dic[word]) str1Dic[word] += 1;
      else str1Dic[word] = 1;
    }
  }

  for (let i = 0; i < string2.length - 1; i++) {
    const word = string2.slice(i, i + 2);
    if (/[a-z]{2}/.test(word)) {
      if (str2Dic[word]) str2Dic[word] += 1;
      else str2Dic[word] = 1;
    }
  }

  const sameCnt = Object.entries(str1Dic)
    .map((value) => {
      const [word, count] = value;
      if (str2Dic[word]) return Math.min(count, str2Dic[word]);
      else return 0;
    })
    .reduce((acc, value) => acc + value, 0);

  const unionDic = Object.entries(str1Dic).reduce((acc, value) => {
    const [word, count] = value;
    if (str2Dic[word]) acc[word] = Math.max(count, str2Dic[word]);
    else acc[word] = count;

    return acc;
  }, {});

  Object.entries(str2Dic).forEach((value) => {
    const [word, count] = value;
    if (!unionDic[word]) unionDic[word] = count;
  });

  const unionCnt = Object.values(unionDic).reduce((a, b) => a + b, 0);

  answer = Math.floor((sameCnt / unionCnt) * 65536);

  return isNaN(answer) ? 65536 : answer;
}

console.log(solution(str1, str2));
