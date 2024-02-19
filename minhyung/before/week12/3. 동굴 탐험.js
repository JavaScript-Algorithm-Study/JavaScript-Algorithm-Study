// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/67260
// 풀이날짜: 2024.01.28

class Queue {
  l = 0;
  r = 0;
  d = {};
  push(dd) {
    this.d[this.r++] = dd;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.d[this.l];
    delete this.d[this.l++];
    return result;
  }
  isEmpty() {
    return this.l === this.r;
  }
}

function getOneWayGraphWithInDegree(g, now, visit, newGraph, inDegree) {
  g[now].forEach((next) => {
    if (visit[next]) return;
    visit[next] = true;

    newGraph[now] ? newGraph[now].push(next) : (newGraph[now] = [next]);
    inDegree[next]++;
    getOneWayGraphWithInDegree(g, next, visit, newGraph, inDegree);
  });
  return [newGraph, inDegree];
}

function solution(n, path, order) {
  const g = {};

  // 일단 그래프 양방향으로 그림
  path.forEach(([from, to]) => {
    g[from] ? g[from].push(to) : (g[from] = [to]);
    g[to] ? g[to].push(from) : (g[to] = [from]);
  });

  // 그래프 다시 한방향으로 그림
  const visit = Array(n).fill(false);
  visit[0] = true;
  const [g2, inDegree] = getOneWayGraphWithInDegree(g, 0, visit, {}, Array(n).fill(0));

  // 방향 추가해줌
  order.forEach(([from, to]) => {
    g2[from] ? g2[from].push(to) : (g2[from] = [to]);
    inDegree[to]++;
  });

  // 위상정렬
  const q = new Queue();
  q.push(0);

  while (!q.isEmpty()) {
    const now = q.pop();
    // 방금 뺀 애에 연결돼 있는 노드들을 -1함 이 때 0이라면 큐에 추가함
    g2[now]?.forEach((next) => {
      if (--inDegree[next] === 0) {
        q.push(next);
      }
    });
  }

  return inDegree.every((num) => num === 0);
}
