/*
남학생 : 스위치 번호 = 받은 수의 배수, 그 스위치 상태 바꿈
여학생 : 자기가 받은 수와 같은 번호가 붙은 스위치를 중심으로 좌우가 대칭이면서
가장 많은 스위치를 포함하는 구간을 찾아 그 구간에 속한 스위치 모두 바꿈,(홀수개)
만약 좌우가 다른 상태면 해당 번호의 스위치만 바꿈
*/

const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, switches, turns) {
  const temp = [-1, ...switches];

  for (let [gender, num] of turns) {
    if (gender === 1) {
      for (let i = num; i < n + 1; i += num) {
        temp[i] = Number(!temp[i]);
      }
      continue;
    }

    if (num === 1 || num === n) temp[num] = Number(!temp[num]);
    else {
      const dist = Math.min(num - 1, n - num);

      for (let j = 1; j <= dist; j++) {
        if (temp[num - j] === temp[num + j]) {
          if (j === dist) {
            for (let k = num - j; k < num + j + 1; k++) {
              temp[k] = Number(!temp[k]);
            }
          }
          continue;
        }

        if (j === 1) {
          temp[num] = Number(!temp[num]);
          break;
        }
        for (let k = num - j + 1; k < num + j; k++) {
          temp[k] = Number(!temp[k]);
        }
        break;
      }
    }
  }

  let printN = Math.ceil((temp.length - 1) / 20);
  let answer = [];

  for (let i = 1; i < printN + 1; i++) {
    answer.push(temp.slice(1 + 20 * (i - 1), 1 + 20 * i).join(' '));
  }

  return answer.join('\n');
}

const n = Number(input[0]);
const switches = input[1].split(' ').map(Number);
const m = Number(input[2]);
const turns = input.slice(3, 3 + m).map((row) => row.trim().split(' ').map(Number));

console.log(solution(n, m, switches, turns));
