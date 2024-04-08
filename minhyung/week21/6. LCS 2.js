//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
ACAYKP
CAPCAK
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split("")))();

function solution(arr1, arr2) {
  const [n, m] = [arr1.length, arr2.length];
  const dp = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr1[i] === arr2[j]) {
        dp[i][j] = (dp?.[i - 1]?.[j - 1] ?? 0) + 1;
      } else {
        dp[i][j] = Math.max(dp?.[i - 1]?.[j] ?? 0, dp?.[i]?.[j - 1] ?? 0);
      }
    }
  }

  let result = "";
  let i = n - 1;
  let j = m - 1;
  while (i >= 0 && j >= 0 && dp[i][j] !== 0) {
    if (dp[i - 1]?.[j] === dp[i][j]) {
      i--;
    } else if (dp[i]?.[j - 1] === dp[i][j]) {
      j--;
    } else {
      result = arr1[i] + result;
      i--, j--;
    }
  }

  return `${result.length}\n${result}`;
}

console.log(solution(input(), input()));
