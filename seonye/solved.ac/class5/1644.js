const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split(' ');

function solution(N) {
  //에라토스테네스의 체
  function findPrime(N) {
    const num_arr = Array.from({ length: N + 1 }, (_, i) => i);
    num_arr[1] = 0;

    for (let i = 2; i <= N; i++) {
      if (num_arr[i] === 0) continue;

      for (let j = i * 2; j <= N; j += i) {
        num_arr[j] = 0;
      }
    }

    return num_arr.filter((num) => num !== 0);
  }

  const primes = findPrime(N);
  let left = (sum = cnt = 0);

  for (let right = 0; right < primes.length; right++) {
    sum += primes[right];

    while (sum > N) {
      sum -= primes[left];
      left += 1;
    }

    if (sum === N) cnt += 1;
  }

  return cnt;
}

const N = Number(input[0]);
console.log(solution(N));
