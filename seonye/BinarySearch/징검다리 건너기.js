/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/64062
난이도 : Level 3

1. 문제 설명
징검다리 규칙
- 디딤돌 숫자, 밟을 때마다 1씩 줄어듬
- 디딤돌 숫자 0이 되면 더이상 밟을 수 없고, 다음 디딤돌로 한번에 여러칸 가야함
- 다음 디딤돌이 여러개인 경우 무조건 가까운 디딤돌로 건너뛸 수 있음

한 번에 한 명씩 징검다리를 건너야함

입력
stones : 디딤돌에 적힌 숫자가 순서대로 담긴 배열
k : 한 번에 건너뛸 수 있는 디딤돌의 최대 칸수

출력
최대 몇 명까지 징검다리를 건널 수 있는지 구하시오

제한 사항
- 징검다리를 건너야 하는 니니즈 친구들의 수는 무제한
- stones 배열의 크기는 최대 20만
- stones 배열 각 원소들의 값은 최대 2억
- k는 1이상 stones의 길이 이하인 자연수

2. 풀이
0이 연속해서 k번 나오면 더 이상 친구들이 못 건넌다.
x : 건넌 친구의 수, 최소 값 0 최대값 stones 배열 원소의 최대값
f(x) : x명의 친구가 건넜을 때 stones배열의 연속된 0보다 작은 징검다리의 최대 개수
*/

function countZero(arr, cnt) {
  let maxZeros = 0;
  let zeroCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] - cnt <= 0) {
      zeroCount++;
      maxZeros = Math.max(maxZeros, zeroCount);
    } else {
      zeroCount = 0;
    }
  }

  return maxZeros;
}

function solution(stones, k) {
  let start = 0;
  let end = 200000000;

  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    let zeroCount = countZero(stones, mid);

    if (zeroCount >= k) {
      end = mid - 1;
    } else start = mid + 1;
  }

  return start;
}
