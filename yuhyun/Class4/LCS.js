const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(stringA, stringB) {
  const lengthA = stringA.length;
  const lengthB = stringB.length;

  const dp = Array.from(Array(lengthA), () => Array(lengthB).fill(0));
  for (let indexA = 0; indexA < lengthA; indexA += 1) {
    const charA = stringA[indexA];
    for (let indexB = 0; indexB < lengthB; indexB += 1) {
      const charB = stringB[indexB];

      if (charA === charB) {
        dp[indexA][indexB] = (dp?.[indexA - 1]?.[indexB - 1] ?? 0) + 1;
      }

      dp[indexA][indexB] = Math.max(
        dp[indexA][indexB],
        dp?.[indexA - 1]?.[indexB] ?? 0,
        dp[indexA]?.[indexB - 1] ?? 0
      );
    }
  }

  return dp[lengthA - 1][lengthB - 1];
}

const [stringA, stringB] = input;
console.log(solution(stringA, stringB));
