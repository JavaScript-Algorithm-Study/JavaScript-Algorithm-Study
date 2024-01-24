/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/118668
난이도 : Level3
*/

function solution(alp, cop, problems) {
  var answer = 0;

  let alp_goal = alp;
  let cop_goal = cop;

  for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
    if (alp_req > alp_goal) alp_goal = alp_req;
    if (cop_req > cop_goal) cop_goal = cop_req;
  }

  const dp = [...Array(alp_goal + 1)].map((_, a) =>
    [...Array(cop_goal + 1)].map((__, c) => a + c - alp - cop)
  );

  for (let i = alp; i <= alp_goal; i++) {
    for (let j = cop; j <= cop_goal; j++) {
      for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        if (alp_req > i || cop_req > j) continue;
        const alp_next = i + alp_rwd > alp_goal ? alp_goal : i + alp_rwd;
        const cop_next = j + cop_rwd > cop_goal ? cop_goal : j + cop_rwd;

        dp[alp_next][cop_next] = Math.min(
          dp[alp_next][cop_next],
          dp[i][j] + cost
        );
      }
    }
  }

  answer = dp[alp_goal][cop_goal];
  return answer;
}

console.log(solution(alp, cop, problems));
