const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, compareResults) {
  const PADDING = 1;
  const graph = Array.from(Array(N), () => []);
  const indegrees = Array(N).fill(0);
  compareResults.forEach(([studentA, studentB]) => {
    graph[studentA - PADDING].push(studentB - PADDING);
    indegrees[studentB - PADDING] += 1;
  });

  const result = [];
  const queue = new Queue();
  indegrees.forEach((indegree, node) => {
    if (indegree === 0) {
      queue.push(node);
    }
  });

  while (!queue.isEmpty()) {
    const cur = queue.pop();
    result.push(cur + PADDING);

    graph[cur].forEach((next) => {
      indegrees[next] -= 1;
      if (indegrees[next] === 0) {
        queue.push(next);
      }
    });
  }
  return result.join(" ");
}

class Queue {
  head = 0;
  queue = [];

  push(value) {
    this.queue.push(value);
  }

  pop() {
    return this.queue[this.head++];
  }

  isEmpty() {
    return this.queue.length === this.head;
  }
}

const [N, M] = input.shift().split(" ").map(Number);
console.log(
  solution(
    N,
    M,
    input.map((line) => line.split(" ").map(Number))
  )
);
