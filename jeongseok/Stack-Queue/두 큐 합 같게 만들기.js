class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.sum = 0;
  }

  queue(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
    this.sum += data;
  }

  dequeue() {
    if (this.length === 0) {
      return -1;
    }

    const returnData = this.head.data;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }
    this.length--;
    this.sum -= returnData;
    return returnData;
  }
}

function solution(queue1, queue2) {
  let count = 0;

  const q1 = new Queue();
  const q2 = new Queue();

  for (let i = 0; i < queue1.length; i++) {
    q1.queue(queue1[i]);
    q2.queue(queue2[i]);
  }

  while (q1.sum !== q2.sum) {
    if (count > queue1.length * 2 + 1) {
      break;
    }

    if (q1.sum > q2.sum) {
      q2.queue(q1.dequeue());
    } else {
      q1.queue(q2.dequeue());
    }
    count += 1;
  }

  return q1.sum === q2.sum ? count : -1;
}
