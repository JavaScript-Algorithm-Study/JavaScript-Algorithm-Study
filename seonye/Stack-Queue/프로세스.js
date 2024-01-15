/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42587
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

function solution(priorities, location) {
  var answer = 0;
  const queue = new Queue();

  for (let i = 0; i < priorities.length; i++) {
    queue.enqueue([i, priorities[i]]);
  }

  const sortPriorities = [...priorities].sort();

  while (true) {
    let value = queue.dequeue();
    let p = sortPriorities.pop();

    if (value[1] === p) {
      answer += 1;
      if (value[0] === location) break;
    } else {
      queue.enqueue(value);
      sortPriorities.push(p);
    }
  }

  return answer;
}
