/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/150369
난이도 : Level2

1. 문제 설명
일렬로 나열된 n개의 집에 택배 배달
모두 크기가 같은 재활용 택배 상자에 담아 배달, 배달하면서 빈 재활용 택배 상자 수거
i번째 집은 거리 i만큼 떨어져 있다.
또한 i번째 집은 j번째 집과 j-i만큼 떨어져 있다.

트럭에는 재활용 택배 상자를 최대 cap개 실을 수 있다.
트럭 하나로 모든 배달과 수거를 마치고 물류 창고까지 돌아올 수 있는 최소 이동 거리 구하기

2. 풀이
완전 그리디
각 집을 최종 몇번 방문해야하는지 구해야한다.

https://school.programmers.co.kr/questions/43364
*/

function solution(cap, n, deliveries, pickups) {
  let answer = 0;

  let d = 0;
  let p = 0;

  for (let i = n - 1; i >= 0; i--) {
    let cnt = 0;

    d -= deliveries[i];
    p -= pickups[i];

    while (d < 0 || p < 0) {
      d += cap;
      p += cap;
      cnt += 1;
    }

    answer += (i + 1) * 2 * cnt;
  }

  return answer;
}
