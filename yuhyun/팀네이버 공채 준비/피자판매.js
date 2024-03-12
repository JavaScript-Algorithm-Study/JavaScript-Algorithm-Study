const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(size, A, B, pizzaA, pizzaB) {
  const sizesA = getSizes(pizzaA);
  const sizesB = getSizes(pizzaB);

  return [...sizesA]
    .map(([sizeA, countA]) => (sizesB.get(size - sizeA) ?? 0) * countA)
    .reduce((acc, cur) => acc + cur, 0);

  function getSizes(pizza) {
    const prefixSum = [0, ...pizza, ...pizza];
    for (let index = 1; index < prefixSum.length; index += 1) {
      prefixSum[index] += prefixSum[index - 1];
    }

    const { length } = pizza;
    const result = new Map();
    for (let n = 1; n < length; n += 1) {
      for (let start = 0; start < length; start += 1) {
        const end = start + n;
        const size = prefixSum[end] - prefixSum[start];
        const count = result.get(size) ?? 0;
        result.set(size, count + 1);
      }
    }
    result.set(prefixSum[length], 1);
    result.set(0, 1);
    return result;
  }
}

const size = Number(input.shift());
const [A, B] = input.shift().split(' ').map(Number);
const pizzaA = input.splice(0, A).map(Number);
const pizzaB = input.map(Number);
console.log(solution(size, A, B, pizzaA, pizzaB));
