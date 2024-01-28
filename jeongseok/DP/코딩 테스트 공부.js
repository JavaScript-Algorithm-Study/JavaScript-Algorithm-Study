// 50% 확률로 효율성을 통과하는 신기한 코드

function max(a, b) {
  return a < b ? b : a;
}

function min(a, b) {
  return a < b ? a : b;
}

function solution(alp, cop, problems) {
  let maxAlp = alp;
  let maxCop = cop;

  for (let i = 0; i < problems.length; i++) {
    maxAlp = max(maxAlp, problems[i][0]);
    maxCop = max(maxCop, problems[i][1]);
  }

  // 최대 크기 설정안하면 시간 초과
  let dp = Array.from(Array(maxAlp + 1), () => Array(maxCop + 1).fill(Infinity));

  dp[alp][cop] = 0;

  for (let i = alp + 1; i < maxAlp + 1; i++) {
    dp[i][cop] = dp[i - 1][cop] + 1;
  }

  for (let i = cop + 1; i < maxCop + 1; i++) {
    dp[alp][i] = dp[alp][i - 1] + 1;
  }

  for (let i = alp + 1; i < maxAlp + 1; i++) {
    for (let j = cop + 1; j < maxCop + 1; j++) {
      dp[i][j] = dp[i - 1][j - 1] + 2;
    }
  }

  for (let i = alp; i < maxAlp + 1; i++) {
    for (let j = cop; j < maxCop + 1; j++) {
      for (const [a, c, ar, cr, cost] of problems) {
        if (i < a || j < c) {
          continue;
        }

        const afterAlp = min(i + ar, maxAlp);
        const afterCop = min(j + cr, maxCop);

        dp[afterAlp][afterCop] = min(dp[afterAlp][afterCop], dp[i][j] + cost);
      }
    }
  }

  return dp[maxAlp][maxCop];
}
