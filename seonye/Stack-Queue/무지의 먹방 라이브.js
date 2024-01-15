/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42891
난이도 : Level 2
*/

class Queue {
  constructor() {
    this.data = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(data) {
    this.data[this.tailIndex++] = data;
  }

  dequeue() {
    if (this.headIndex === this.tailIndex) return undefined;
    const data = this.data[this.headIndex];
    delete this.data[this.headIndex++];
    return data;
  }
}

function solution(food_times, k) {
  var answer = 0;
  const q = new Queue();

  for (let i = 0; i < food_times.length; i++) {
    q.enqueue([i + 1, food_times[i]]);
  }

  while (k > 0) {
    const cur = q.dequeue();
    if (!cur) return -1;

    const [food, leftTime] = cur;

    if (leftTime > 1) {
      q.enqueue([food, leftTime - 1]);
    }

    k -= 1;
  }
  const nextFood = q.dequeue();

  answer = nextFood ? nextFood[0] : -1;

  return answer;
}

const food_times = [4, 2, 3, 6, 7, 1, 5, 8];
const k = 27;

console.log(solution(food_times, k));
