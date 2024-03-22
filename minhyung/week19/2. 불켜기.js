//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4 3
1 1 1 2
1 1 3 2
3 2 2 2
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

class Queue {
  l = 0;
  r = 0;
  d = {};
  push(data) {
    this.d[this.r++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    return this.d[this.l++];
  }
  isEmpty() {
    return this.l === this.r;
  }
}

function solution(edges) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const lightGraph = {};
  const lightPlaces = {};
  const visited = {};
  const queue = new Queue();

  edges.forEach(([x, y, a, b]) => {
    const from = [x, y];
    const to = [a, b];
    lightGraph[from] ? lightGraph[from].push(to) : (lightGraph[from] = [to]);
  });

  queue.push([1, 1]);
  visited["1,1"] = true;
  // 여기서 불을 밝히지 않은걸 초기화 해주지 않아서 매우 많은 시간을 날림...
  lightPlaces["1,1"] = true;

  while (!queue.isEmpty()) {
    const [x, y] = queue.pop();

    lightGraph[[x, y]]?.forEach(([lx, ly]) => {
      // 불 킨적이 있으면 또 키지않음
      if (lightPlaces[[lx, ly]]) return;

      // 1. 해당 위치에 연결된 스위치를 켬
      lightPlaces[[lx, ly]] = true;

      const canGoSomeDirection = directions.some(([xx, yy]) => visited[[xx + lx, yy + ly]]);
      // 2. 현재 위치 움직일수 있다면 움직여줌
      if (canGoSomeDirection) {
        visited[[lx, ly]] = true;
        queue.push([lx, ly]);
      }
    });

    // 3. 현재 방 주변에 불 켜진곳이 있는지 봐봄
    directions.forEach(([xx, yy]) => {
      const [nx, ny] = [x + xx, y + yy];

      // 만약 네방향중 한곳의 스위치가 켜져있고
      // 그곳이 방문했던적 없으면 방문해봄
      if (lightPlaces[[nx, ny]] && !visited[[nx, ny]]) {
        visited[[nx, ny]] = true;
        queue.push([nx, ny]);
      }
    });
  }

  return Object.keys(lightPlaces).length;
}

// N: 보드크기, M: 간선개수
const [N, M] = input();
const edges = Array.from({ length: M }, () => input());
console.log(solution(edges));
