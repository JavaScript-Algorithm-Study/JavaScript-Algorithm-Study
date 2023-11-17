// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/64062
// 시작날짜: 2023.11.11
// 시작시간: 15:45
// 종료시간: 17:17
// 소요시간: 01:32

// 만약 숫자를 1씩 늘려서 탐색하면 무조건 시간초과가 남
// 그래서 이진 탐색으로 최소 ~ 최대치를 탐색함 n  * logn
// 이진탐색으로 찾아야 하는건 k가 되는 첫구간
// mid값을 찾아서 stones를 순회해 해당값 미만인지 확인함
// 그래서 미만인 경우가 k회 이상 있다면 못건넌다고 판단함
// 그러고서 right = mid로 설정하고 앞쪽에도 못건너는 구간이 있는지 판단함.

function solution(stones, k) {
  let left = 1;
  let right = 200000000;

  const canCross = (mid) => {
    let zeroCnt = 0;
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] < mid) zeroCnt++;
      else zeroCnt = 0;
      if (zeroCnt >= k) return false;
    }
    return true;
  };

  while (left < right - 1) {
    const mid = parseInt((left + right) / 2);
    if (canCross(mid)) left = mid;
    else right = mid;
  }
  return left;
}
