function solution(priorities, location) {
  const PRIORITY = 0;
  const ORDER = 1;

  const ascendingPriorities = [...priorities].sort((a, b) => a - b);
  const queue = new Queue();

  priorities.map((priority, order) => queue.push([priority, order]));

  let curOrder = 1;
  while (ascendingPriorities.length) {
    const maxPriority = ascendingPriorities.pop();

    while (queue.peek()[PRIORITY] !== maxPriority) {
      const process = queue.pop();
      queue.push(process);
    }

    const executedProcess = queue.pop();
    if (executedProcess[ORDER] === location) {
      break;
    }

    curOrder += 1;
  }

  return curOrder;
}

class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.size = 0;
  }

  push(value) {
    this.queue.push(value);
    this.size += 1;
  }

  pop() {
    const value = this.queue[this.head];
    this.head += 1;
    this.size -= 1;
    return value;
  }

  isEmpty() {
    return this.size === this.head;
  }

  peek() {
    return this.queue[this.head];
  }
}
