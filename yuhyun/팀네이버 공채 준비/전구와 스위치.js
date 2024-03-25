const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, bulbs, targetBulbs) {
  const result = walk(0, bulbs);
  return result === Infinity ? -1 : result;

  function walk(depth, bulbs) {
    if (depth === N) {
      return bulbs[depth - 1] === targetBulbs[depth - 1] ? 0 : Infinity;
    }

    if (depth === 0) {
      let result = walk(depth + 1, bulbs);

      switchAt(depth, bulbs);
      result = Math.min(result, walk(depth + 1, bulbs) + 1);
      switchAt(depth, bulbs);
      return result;
    }

    if (bulbs[depth - 1] === targetBulbs[depth - 1]) {
      return walk(depth + 1, bulbs);
    }

    switchAt(depth, bulbs);
    const result = walk(depth + 1, bulbs) + 1;
    switchAt(depth, bulbs);
    return result;
  }

  function switchAt(index, bulbs) {
    [-1, 0, 1]
      .map((offset) => index - offset)
      .filter((index) => index >= 0 && index < bulbs.length)
      .forEach((index) => toggle(index, bulbs));
  }

  function toggle(index, bulbs) {
    const OFF = 0;
    const ON = 1;

    bulbs[index] = bulbs[index] === OFF ? ON : OFF;
  }
}

const N = Number(input.shift());
const bulbs = input.shift().split('').map(Number);
const targetBulbs = input.shift().split('').map(Number);
console.log(solution(N, bulbs, targetBulbs));
