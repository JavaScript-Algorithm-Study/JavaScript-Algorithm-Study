const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);

class Queue {
  constructor() {
    this.head = 0;
    this.tail = 0;
    this.size = 0;
    this.data = {};
  }

  enqueue(data) {
    this.data[this.tail++] = data;
    this.size++;
  }

  dequeue() {
    if (this.head === this.tail) {
      return -1;
    }
    const returnNode = this.data[this.head];
    delete this.data[this.head++];
    this.size--;
    return returnNode;
  }
}

function topoSort() {
  const queue = new Queue();

  const order = [];

  dArr.forEach((edge, index) => {
    if (edge === 0 && index !== 0) {
      queue.enqueue(index);
    }
  });

  while (queue.size) {
    const edgeIndex = queue.dequeue();
    order.push(edgeIndex);

    graph[edgeIndex].forEach((edge) => {
      dArr[edge] -= 1;

      if (dArr[edge] === 0) {
        queue.enqueue(edge);
      }
    });
  }

  return order;
}

const graph = Array.from(Array(N + 1), () => []);
const dArr = new Array(N + 1).fill(0);

input.forEach((line) => {
  const [a, b] = line.split(" ").map(Number);
  graph[a].push(b);
  dArr[b] += 1;
});

const answer = topoSort();

console.log(answer.join(" "));
