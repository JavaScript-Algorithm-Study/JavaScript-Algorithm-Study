/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42898
난이도 : Level3

1. 문제
물에 잠기지 않은 지역을 통해 학교를 가자
m x n 크기의 격자모양
m : row, n: col
왼쪽 위 : (1, 1) 집
오른쪽 아래 : (m, n) 학교
puddles : 물에 잠긴 지역의 좌표가 담긴 2차원 배열
오른쪽과 아래쪽으로만 움직여 집에서 학교까지 갈 수 있는 최단경로의 개수를 1000000007로 나눈 나머지를 return

제한 사항
m, n은 1이상 100이하의 자연수, 둘 다 1인 경우는 없다
물에 잠긴 지역은 0개 이상 10개 이하
집과 학교가 물에 잠긴 경우는 입력으로 주어지지 x

2. 풀이
초기값 : 첫 행과 첫 열은 1, 단 첫 행과 첫 열에 장애물이 있는 경우 그 장애물을 넘어서 다음 칸으로 이동할 수 있는 방법은 없으므로 0으로 설정한다.

dp[j][i] = dp[j-1][i] + dp[j][i-1]
dp값을 저장할 때 1000000007로 나눈 나머지를 넣어줘야 효율성테스트까지 통과할 수 있다..

*/

function solution(m, n, puddles) {
  let answer = 0;

  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 0; i < puddles.length; i++) {
    const [x, y] = puddles[i];
    dp[y][x] = -1;
    if (x === 1) {
      for (let j = y; j <= n; j++) dp[j][x] = -1;
    }
    if (y === 1) {
      for (let j = x; j <= m; j++) dp[y][j] = -1;
    }
  }

  for (let _n = 1; _n <= n; _n++) {
    for (let _m = 1; _m <= m; _m++) {
      if (dp[_n][_m] === -1) continue;
      if (_n === 1 || _m === 1) dp[_n][_m] = 1;
      else {
        const upValue = dp[_n - 1][_m] !== -1 ? dp[_n - 1][_m] : 0;
        const leftValue = dp[_n][_m - 1] !== -1 ? dp[_n][_m - 1] : 0;
        dp[_n][_m] = upValue + leftValue;
        dp[_n][_m] %= 1000000007;
      }
      console.log(_m, _n, dp);
    }
  }

  answer = dp[n][m];

  return answer;
}
