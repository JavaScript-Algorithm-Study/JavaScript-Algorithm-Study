/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/92342
난이도 : Level 2

1. 문제 설명
지난대회 우승자 라이언 vs 결승전 상대 어피치
다양한 선수들이 우승하기 원함, 결승전 규칙을 우승자 라이언에게 불리하게 정함
1. 어피치가 n발을 다쏜 후 라이언이 n발을 쏜다.
2. 점수를 계산
  1. 중앙부터 10,9,8,...,1, 과녁 밖은 0
  2. 어피치가 a발을 맞혔고, 라이언이 b발을 맞혔을 때 더많은 화살을 k점에 맞힌 선수가 k점 가져감.
     a=b인 경우 어피치가 k점을 가져감. k점을 여러번 맞혀도 k점만 가져간다.
     a=b=0인 경우 아무도 k점을 가져가지 않는다.
  3. 모든 과녁 점수에 대하여 각 선수의 최종 점수 계산
3. 최종 점수가 더 높은 선수를 우승자로 결정, 단 최종 점수가 같을 경우 어피치가 우승

현재 상황은 어피치가 화살 n발을 다 쏜 후이고 라이언이 화살을 쏠 차례, 라이언은 어피치를 큰 점수 차이로 이기기 위해 n발의 화살을 어떤 과녁 점수에 맞혀야 하는지 구해야한다.

n : 화살의 개수, info : 어피치가 맞힌 과녁 점수의 개수
라이언이 가장 큰 점수 차이로 우승하기 위해 n발의 화살을 어떤 과녁점수에 맞혀야하는지 10점부터 0점까지 순서대로 정수 배열에 담아 return, 라이언이 우승할 수 없는 경우(무조건 지거나, 비기는 경우) return[-1]

가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지인 경우 가장 낮은 점수를 더 많이 맞힌 경우를 return

2. 풀이
const n = 5;
const info = [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];

index = 0 부터 어피치가 맞힌 화살 개수보다 많이 쏜다.
남은 화살 개수로 어피치가 맞힌 활살 개수보다 많이 쏠 수 없는 경우 넘어가고 어피치가 안맞히 과녁점수를 얻는다.


*/
// function solution(n, info) {
//   const aScore = info.map((el, i) => (el ? 10 - i : el)).reduce((a, b) => a + b, 0);
//   let [max, result] = [0, []];

//   const getScore = (arr, count, idx) => {
//     console.log('getScore', arr, count, idx);
//     if (count === n) {
//       let a = aScore;
//       let l = 0;

//       arr.forEach((el, i) => {
//         if (info[i] !== 0 && el > info[i]) {
//           a -= 10 - i;
//           l += 10 - i;
//         }
//         if (info[i] === 0 && el > info[i]) {
//           l += 10 - i;
//         }
//       });

//       if (l - a > max) {
//         max = l - a;
//         result = [arr];
//       } else if (l - a === max) {
//         result.push(arr);
//       }
//       return;
//     }

//     for (let i = idx; i < arr.length; i++) {
//       if (arr[i] > info[i]) continue;

//       const tempArr = arr.slice();
//       tempArr[i] += 1;

//       getScore(tempArr, count + 1, i);
//     }
//   };

//   getScore(Array(11).fill(0), 0, 0);
//   if (result.length === 0 || max === 0) return [-1];

//   result.sort((a, b) => {
//     for (let i = a.length - 1; i >= 0; i -= 1) {
//       if (a[i] !== b[i]) {
//         return b[i] - a[i];
//       }
//     }
//   });

//   return result[0];
// }

function solution(n, info) {
  let answer = [-1];
  let winScore = 0;
  // 점수차 계산
  function calcScore(info, result) {
    return info.reduce((a, c, i) => {
      if (c < result[i]) return a + 10 - i;
      else if (c === 0 && result[i] === 0) return a;
      else return a - 10 + i;
    }, 0);
  }
  function dfs(n, result, idx) {
    // 남은 화살이 없다면 리턴
    if (n === 0) {
      const score = calcScore(info, result);
      if (winScore < score) {
        winScore = score;
        answer = result;
      }
      return;
    }
    // 작은 점수 화살부터 쏘기
    for (let i = idx; i < 11; i++) {
      const score = 10 - i;
      const copy = [...result];
      if (n > info[score]) {
        copy[score] = info[score] + 1;
        dfs(n - copy[score], copy, i + 1);
      } else {
        copy[10] += n;
        dfs(0, copy, i + 1);
      }
    }
    // 남은 화살은 모두 작은 화살에 쏘기
    const copy = [...result];
    copy[10] += n;
    dfs(0, copy, -1);
  }
  dfs(n, new Array(11).fill(0), 0);
  return answer;
}

const n = 9;
const info = [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1];

console.log(solution(n, info));
