function solution(n, info) {
  let maxScoreDiff = -Infinity;
  let maxRyanInfo = [-1];

  const { length } = info;

  const calcScoreDiff = (ryanInfo) => {
    return info
      .map((apeachHit, index) => [
        apeachHit,
        ryanInfo[index],
        length - index - 1,
      ])
      .reduce((acc, [apeachHit, ryanHit, score]) => {
        if (ryanHit === 0 && apeachHit === 0) {
          return acc;
        }
        return ryanHit <= apeachHit ? acc - score : acc + score;
      }, 0);
  };

  const compareInfo = (infoA, infoB) => {
    const { length } = infoA;
    for (let i = length - 1; i >= 0; i--) {
      const diff = infoA[i] - infoB[i];

      if (diff < 0) {
        return 1;
      }

      if (diff > 0) {
        return -1;
      }
    }
    return 0;
  };

  const dfs = (index, restArrow, ryanInfo) => {
    if (index === length - 1 || restArrow === 0) {
      ryanInfo[index] += restArrow;

      const scoreDiff = calcScoreDiff(ryanInfo);

      if (
        scoreDiff === maxScoreDiff &&
        compareInfo(ryanInfo, maxRyanInfo) < 0
      ) {
        maxRyanInfo = [...ryanInfo];
      }

      if (scoreDiff > maxScoreDiff) {
        maxScoreDiff = scoreDiff;
        maxRyanInfo = [...ryanInfo];
      }

      ryanInfo[index] -= restArrow;
      return;
    }

    const apeachHit = info[index];

    if (restArrow > apeachHit) {
      const ryanHit = apeachHit + 1;
      ryanInfo[index] += ryanHit;
      dfs(index + 1, restArrow - ryanHit, ryanInfo);
      ryanInfo[index] -= ryanHit;
    }

    if (restArrow === apeachHit) {
      ryanInfo[index] += apeachHit;
      dfs(index + 1, restArrow - apeachHit, ryanInfo);
      ryanInfo[index] -= apeachHit;
    }

    dfs(index + 1, restArrow, ryanInfo);
  };

  dfs(0, n, Array(length).fill(0));
  return maxScoreDiff <= 0 ? [-1] : maxRyanInfo;
}
