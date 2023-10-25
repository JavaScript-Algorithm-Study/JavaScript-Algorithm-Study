/*
문제 : https://www.acmicpc.net/problem/21939
난이도 : Gold4

1. 문제 설명
problems : [문제 번호, 난이도] 배열
명령어
recommend x : x가 1인 경우 가장 어려운 문제 출력, 여러개일 경우 문제 번호 큰 것 출력
              x -1인 경우 가장 쉬운 문제 출력, 여러개일 경우 문제 번호 작은 것 출력
add P L : 난이도가 L인 문제번호 P 추가
solved P : 문제 번호 P 제거 

2. 풀이

*/
const path = require('path');
const fs = require('fs');
const input = fs.readFileSync(path.join(__dirname, 'dev', 'stdin')).toString().trim().split('\n');

const answer = [];
const N = Number(input[0]);
const hard = new Map();

for (let i = 1; i < N + 1; i++) {
  const [p_num, p_hard] = input[i].trim().split(' ').map(Number);
  if (!hard.has(p_hard)) hard.set(p_hard, new Set([p_num]));
  else hard.get(p_hard).add(p_num);
}

const M = Number(input[N + 1]);

for (let i = N + 2; i < N + M + 2; i++) {
  const option = input[i].trim().split(' ');
  const command = option[0];
  const [P, L] = [option[1], option[2]].map(Number);

  switch (command) {
    case 'add':
      if (hard.has(L)) hard.get(L).add(P);
      else hard.set(L, new Set([P]));
      break;
    case 'solved':
      const hardKey = hard.keys();
      let findKey;

      for (let key of hardKey) {
        if (hard.get(key).has(P)) {
          findKey = key;
          break;
        }
      }

      hard.get(findKey).delete(P);
      if (hard.get(findKey).size === 0) hard.delete(findKey);
      break;
    case 'recommend':
      const sortedHardKey = Array.from(hard.keys()).sort((a, b) => a - b);
      let recommendProblems, targetKey;

      if (P === 1) {
        targetKey = sortedHardKey[hard.size - 1];
        recommendProblems = hard.get(targetKey);
        answer.push(Math.max.apply(this, [...recommendProblems]));
      } else if (P === -1) {
        targetKey = sortedHardKey[0];
        recommendProblems = hard.get(targetKey);
        answer.push(Math.min.apply(this, [...recommendProblems]));
      }

      break;
  }
}

console.log(answer.join('\n'));
