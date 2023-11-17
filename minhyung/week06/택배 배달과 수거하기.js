// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/150369#
// 시작날짜: 2023.11.17
// 시작시간: 17:20
// 종료시간: 19:40
// 소요시간: 02:20

// 1. 배달 / 수거를 스택에 넣음
// 2. 배달먼저 스택에서 cap 꽉 찰 때 까지 처리함
// 3. 수거도 cpa 꽉 찰 때 까지 처리함
// 4. 배달 혹은 수거중에 빼기 시작했던 숫자가 더 큰 길이 * 2 를 더함
// 5. 두개의 index가 모두 0이 될 때 까지 while을 반복함

// 모두 0일 때 예외처리를 해주고서 풀게됨.

function processAndGetDist(stor, arr, cap, type) {
  let { p, d } = stor;
  let now = type === "p" ? p : d;

  let nextDelivery = arr.length;
  while (arr.length) {
    const lastIdx = arr.length - 1;

    if (now + arr[lastIdx] > cap) {
      const overBox = cap - now;
      arr[lastIdx] -= overBox;
      now = cap;
      break;
    } else {
      now += arr.pop();
    }
    nextDelivery -= 1;
  }

  type === "p" ? (stor.p = now) : (stor.d = now);

  return nextDelivery;
}
function findHasBoxLastIdx(n, deliveries, pickups) {
  for (let i = n - 1; i >= 0; i--) {
    if (deliveries[i] !== 0 || pickups[i] !== 0) {
      return i;
    }
  }
}
function solution(cap, n, deliveries, pickups) {
  const stor = { d: 0, p: 0 };
  const lastIdx = findHasBoxLastIdx(n, deliveries, pickups);
  let result = (lastIdx + 1) * 2;

  while (deliveries.length || pickups.length) {
    let nextDelivery = processAndGetDist(stor, deliveries, cap, "d");
    let nextPickup = processAndGetDist(stor, pickups, cap, "p");

    stor.p = stor.d = 0;
    result += Math.max(nextDelivery, nextPickup) * 2;
  }

  return result || 0;
}
