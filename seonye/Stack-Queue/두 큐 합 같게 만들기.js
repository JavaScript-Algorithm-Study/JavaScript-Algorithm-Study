/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/118667
난이도 : Level 2

1. 문제 설명
길이가 같은 두 개의 큐가 주어지고, 하나의 큐를 골라 원소를 추출하여 다른 큐에 집어넣는 작업을 통해 각 큐의 원소 합이 같도록 만든다.
한번의 dequeue과 enqueue를 합쳐서 1회 수행한 것으로 간주하여, 최소 작업 횟수를 구하자.


2. 풀이
각 큐의 원소 합을 같게 만들 수 없는 경우
- 모든 원소의 합이 짝수가 아닌 경우
- 큐의 원소 중 큐의 원소 합이 되어야할 숫자보다 큰 원소가 있는 경우
- 두 개의 큐를 이어 붙였을때, 연속되는 원소의 합으로 목표합을 만들 수 없는 경우

시간초과 해결
큐에 데이터를 저장할 변수의 형식을 객체로 변경하여 dequeue의 시간복잡도를 O(1)로 줄임
enqueue와 dequeue를 할 때마다 큐의 합을 구하여 시간복잡도를 O(1)로 줄임

최악의 경우 queue1의 원소를 모두 queue2로 보내고
queue2의 원소 하나를 제외한 모든 원소를 다시 queue1으로 보내는 경우로 
큐의 길이의 * 3으로 설정
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
  const queue1 = input[0].split(' ').map(Number);
  const queue2 = input[1].split(' ').map(Number);

  console.log(solution(queue1, queue2));
});

class Queue {
  constructor() {
    this.queue = {};
    this.headIndex = 0;
    this.tailIndex = 0;
    this.sum = 0;
  }

  enqueue(num) {
    this.queue[this.tailIndex] = num;
    this.tailIndex++;
    this.sum += num;
  }

  dequeue() {
    if (this.headIndex === this.tailIndex) return undefined;
    const item = this.queue[this.headIndex];
    delete this.queue[this.headIndex];
    this.headIndex++;
    this.sum -= item;
    return item;
  }

  peek() {
    return this.queue[this.headIndex];
  }

  getLength() {
    return this.tailIndex - this.headIndex;
  }

  hasLargerElement(num) {
    return Object.values(this.queue).filter((element) => element > num).length > 0 ? true : false;
  }
}

function solution(queue1, queue2) {
  let answer = -1;
  let list1 = new Queue();
  let list2 = new Queue();

  queue1.forEach((element) => {
    list1.enqueue(element);
  });
  queue2.forEach((element) => {
    list2.enqueue(element);
  });

  const totalSum = list1.sum + list2.sum;
  // 모든 큐의 원소의 합계가 홀수인 경우 -1 리턴
  if (totalSum % 2 !== 0) return answer;

  // 큐의 원소 중 목표 합계의 값보다 큰 원소가 있는 경우 -1리턴
  const goalSum = totalSum / 2;
  if (list1.hasLargerElement(goalSum)) return answer;
  if (list2.hasLargerElement(goalSum)) return answer;

  answer = 0;
  let isGetSameSum = false;

  while (answer < queue1.length * 3) {
    let list1Sum = list1.sum;
    let list2Sum = list2.sum;

    if (list1Sum > list2Sum) {
      const element = list1.dequeue();
      list2.enqueue(element);
    } else if (list1Sum < list2Sum) {
      const element = list2.dequeue();
      list1.enqueue(element);
    } else {
      isGetSameSum = true;
      break;
    }

    answer++;
  }

  return isGetSameSum ? answer : -1;
}
