const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, sequence) {
  const longestIncreasingSubsequence = [];
  sequence.forEach((num) => {
    if (!longestIncreasingSubsequence.length || longestIncreasingSubsequence.at(-1) < num) {
      longestIncreasingSubsequence.push(num);
      return;
    }

    const lowerBoundIndex = getLowerBound(num, longestIncreasingSubsequence);
    longestIncreasingSubsequence[lowerBoundIndex] = num;
  });

  return longestIncreasingSubsequence.length;

  function getLowerBound(target, array) {
    let left = -1;
    let right = array.length;
    while (left + 1 < right) {
      const mid = Math.floor((left + right) / 2);
      if (array[mid] < target) {
        left = mid;
        continue;
      }
      right = mid;
    }
    return right;
  }
}

const N = Number(input.shift());
const sequence = input[0].split(' ').map(Number);
console.log(solution(N, sequence));
