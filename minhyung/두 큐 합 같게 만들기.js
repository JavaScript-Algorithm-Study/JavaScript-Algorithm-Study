// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/118667?language=javascript
// 시작날짜: 2023.10.05
// 시작시간: 10:45
// 종료시간: 12:00
// 소요시간: 01:15

// 첫시도: 결국 하나의 배열에서 돌아갈거라 생각하고 코드를 작성함.
// 하지만 calcCount 에서 계산을 하는 과정에서 반례가 존재함을 알게됨.
// 그래서 아예 처음부터 한개의 큐를 전부 더했다고 가정하고 count를 계산하는 방식으로 변경.

// function solution(queue1, queue2) {
//   const arr = [...queue1, ...queue2];
//   const sum = arr.reduce((sum, cur) => sum + cur, 0);
//   const half = sum / 2;

//   if (sum % 2 !== 0) return -1;

//   const [startIdx, endIdx] = findStartEndIdx([...arr, ...queue1], half);

//   if (startIdx === -1) return -1;

//   return calcCount(startIdx, endIdx, queue1.length);
// }

// function findStartEndIdx(arr, half) {
//   let [left, right] = [0, 0];
//   let sum = 0;

//   while (right !== arr.length && sum !== half) {
//     if (sum < half) {
//       sum += arr[right++];
//     } else {
//       sum -= arr[left++];
//     }
//   }

//   if (sum !== half) return [-1, -1];

//   return [left + 1, right];
// }

// function calcCount(startIdx, endIdx, halfIdx) {
//   let result = 0;

//   if (startIdx < halfIdx && endIdx < halfIdx) {
//     result += endIdx - halfIdx;
//   }
//   if (startIdx > halfIdx) result += halfIdx;
//   else result += startIdx - 1;

//   if (startIdx > halfIdx) result += startIdx - 1 - halfIdx;

//   if (endIdx > halfIdx) result += endIdx - halfIdx;

//   return result;
// }
function solution(queue1, queue2) {
  const getSum = (arr) => arr.reduce((acc, cur) => acc + cur, 0);

  const arr = [...queue1, ...queue2, ...queue1, ...queue2];
  const half = getSum(arr) / 4;

  let [left, right] = [0, queue1.length];
  let sum = getSum(queue1);
  let cnt = 0;

  for (let i = 0; i < queue1.length * 3; i++) {
    if (sum > half) sum -= arr[left++];
    else if (sum < half) sum += arr[right++];
    else return cnt;

    cnt++;
  }
  return -1;
}

console.log(solution([3, 2, 7, 2], [4, 6, 5, 1]));
