/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/17680
난이도 : Level 2

1. 문제설명
각 도시 이름은 대소문자를 구분하지 않고, 도시이름 배열을 순서대로 처리할 때, '총 실행시간' 출력

2. 풀이
빈 캐시배열을 두고, 배열의 크기가 캐시크기를 넘어갈때 dequeue을 해준다.
배열은 큐 자료구조를 사용한다.

실패 케이스
11번 시간초과

*/
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
  input.push(line.trim());
  if (input.length === 2) rl.close();
});

rl.on('close', () => {
  const cacheSize = Number(input[0]);
  const cities = input[1]
    .slice(1, input[1].length - 1)
    .split(',')
    .map((city) => city.trim().replaceAll('"', ''));

  console.log(solution(cacheSize, cities));
});

class Queue {
  constructor() {
    this.queue = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(num) {
    this.queue[this.tailIndex] = num;
    this.tailIndex++;
  }

  dequeue() {
    if (this.headIndex === this.tailIndex) return undefined;
    const item = this.queue[this.headIndex];
    delete this.queue[this.headIndex];
    this.headIndex++;
    return item;
  }

  delete(cityIndex) {
    if (Number(cityIndex) === this.headIndex) this.dequeue();
    else {
      delete this.queue[cityIndex];
      Object.keys(this.queue).forEach((k, v) => {
        if (Number(k) > Number(cityIndex)) {
          const city = this.queue[k];
          delete this.queue[k];
          this.queue[--k] = city;
        }
      });
      this.tailIndex--;
    }
  }

  getLength() {
    return this.tailIndex - this.headIndex;
  }
}

function solution(cacheSize, cities) {
  let answer = 0;
  let cacheArr = new Queue();

  if (cacheSize === 0) return cities.length * 5;

  cities.forEach((city) => {
    const currCity = city.toLowerCase();
    if (Object.values(cacheArr.queue).includes(currCity)) {
      let cityIndex = Object.keys(cacheArr.queue).find((key) => cacheArr.queue[key] === currCity);
      cacheArr.delete(cityIndex);
      cacheArr.enqueue(currCity);

      answer += 1;
    } else {
      if (cacheArr.getLength() === cacheSize) {
        cacheArr.dequeue();
      }
      cacheArr.enqueue(currCity);
      answer += 5;
    }
  });

  return answer;
}
