// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/92343
// 시작날짜: 2024.01.11
// 시작시간: 14:53
// 종료시간: 17:11
// 소요시간: 02:18
// 내가 모은 양수 <= 늑대수 -> 늑대가 모든 양을 잡아먹음
// 늑대에게 잡히지 않도록 최대한 많은 수의 양을 모야서 루트 노드로 돌아와야함.

// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8], [4, 9], [4, 10], [5, 11], [5, 12], [6, 13], [6, 14], [7, 15], [7, 16]]
// 위 값이 입력으로 주어질 경우 시간초과 발생.
// 이를 해결하기 위해 memoization을 사용함.
// 방법은 각 노드에서 갈 수 있는 노드들을 모두 탐색하면서
//
const SHEEP = 0;
const WOLF = 1;

function solution(info, edges) {
  let result = 0;
  const memo = {};
  const G = edges.reduce((acc, [to, from]) => {
    acc[to] ? acc[to].push(from) : (acc[to] = [from]);
    return acc;
  }, {});

  const find = (now, canGoNodes, sheep, wolf, visit = "0") => {
    if (memo[visit]) return;
    memo[visit] = true;

    if (info[now] === SHEEP) sheep++;
    else wolf++;

    if (sheep <= wolf) return;

    result = Math.max(sheep, result);

    canGoNodes.forEach((next) => {
      // 다음 갈 수 있는 노드들에서 자신을 제외
      const nexts = [...canGoNodes, ...(G[next] ?? [])].filter((node) => node !== next);
      find(next, nexts, sheep, wolf, visit | (1 << next));
    });
  };

  find(0, [...G[0]], 0, 0);

  return result;
}

// 우선 그래프를 만들어줌
// 현재 시점에서 갈 수 있는곳을 모두 탐색해봐야함.
// 탐색하면서 가장 많은 양의 합을 결과로 넣음 (양<늑대 일때만)
// 다음으로 갈 수 있는곳을 추가해서 함수안에 넣어줌
