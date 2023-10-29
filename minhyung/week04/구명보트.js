// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42885
// 시작날짜: 2023.10.27
// 시작시간: 21:22
// 종료시간: 22:30
// 소요시간: 01:08

// 전체 탐색은 안됨, 해시맵은 어떨까?
// 몸무게별 사람을 저장해둠

// 투포인터.
// 몸무게 최소, 최대를 저장해둠? 그럴필요 없을듯
// 1. 왼쪽 포인터: 0, 오른쪽 포인터: people.length - 1, boat = 1, 현재무게 = 오른쪽
// 2. if 오른쪽 포인터의 값 + 왼쪽 포인터의 값 <= 한계:
//      왼쪽 ++
//      현재무게 += 왼쪽
// 3. else:
//      오른쪽 포인터 --
//      구명보트 ++
//      현재무게 = 오른쪽
// 4. 왼쪽 === 오른쪽: break;

// 16 ~ 22?
// 최대 2명...아...
function solution(people, limit) {
  const dict = {};
  people = people.sort((a, b) => a - b);
  people.forEach((w) => {
    dict[w] = (dict[w] || 0) + 1;
  });

  let [l, r] = [0, people.length - 1];
  let boat = 1;
  let nowW = people[r];
  let cnt = 1;

  while (l < r) {
    const min = people[l];
    if (nowW + min > limit || cnt === 2) {
      boat++;
      nowW = people[--r];
      cnt = 1;
    } else {
      nowW += min;
      l++;
      cnt++;
    }
  }

  return boat;
}
