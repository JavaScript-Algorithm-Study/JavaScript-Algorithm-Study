const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split(' ');

function solution(N) {
  const primeNumbers = getPrimeNumbers(N);
  let result = 0;

  let end = 0;
  let acc = 0;
  const { length } = primeNumbers;
  for (const primeNumber of primeNumbers) {
    while (end < length && acc < N) {
      acc += primeNumbers[end++];
    }

    if (acc === N) {
      result += 1;
    }

    acc -= primeNumber;
  }

  return result;

  function getPrimeNumbers(N) {
    const result = [];
    const isPrimeNumber = Array(N + 1).fill(true);
    isPrimeNumber[0] = isPrimeNumber[1] = false;
    for (let i = 2; i < N + 1; i += 1) {
      if (isPrimeNumber[i]) {
        result.push(i);
      }

      for (let next = i * i; next < N + 1; next += i) {
        isPrimeNumber[next] = false;
      }
    }

    return result;
  }
}

const N = Number(input[0]);
console.log(solution(N));
