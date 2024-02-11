class Queue {
  L = 0;
  R = 0;
  D = {};

  push(data) {
    this.D[this.R++] = data;
  }
  pop() {
    if (this.L === this.R) {
      return -1;
    }
    const data = this.D[this.L];
    delete this.D[this.L++];
    return data;
  }
  size() {
    return this.R - this.L;
  }
}
function solution(n, paths, gates, summits) {
  let graph = {};

  paths.forEach(([start, end, cost]) => {
    graph[start] ? graph[start].push([end, cost]) : (graph[start] = [[end, cost]]);
    graph[end] ? graph[end].push([start, cost]) : (graph[end] = [[start, cost]]);
  });

  let dArr = new Array(10000001).fill(Infinity);

  function bfs() {
    const queue = new Queue();

    gates.forEach((gate) => {
      queue.push(gate);
    });

    while (queue.size()) {
      const node = queue.pop();

      // 정상이라면
      if (summits.includes(node)) {
        continue;
      }

      for (let i = 0; i < graph[node].length; i++) {
        const [end, cost] = graph[node][i];

        // 짧게 가는데
        if (dArr[end] > Math.max(dArr[node], cost)) {
          // 더 긴 거
          dArr[end] = Math.max(dArr[node], cost);
          queue.push(end);
        }
      }
    }
  }

  gates.forEach((gate) => {
    dArr[gate] = 0;
  });

  bfs();

  let minS = Infinity;
  let minD = Infinity;

  summits.forEach((summit) => {
    if (dArr[summit] < minD) {
      minD = dArr[summit];
      minS = summit;
    } else if (dArr[summit] === minD) {
      minS = Math.min(minS, summit);
    }
  });

  return [minS, minD];
}
