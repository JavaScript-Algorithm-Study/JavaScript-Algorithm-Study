// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/118670
// 시작날짜: 2024.02.05

class Node {
  constructor(data) {
    this.data = data;
    this.front = null;
    this.back = null;
  }
}
class Deque {
  front = null;
  back = null;
  size = 0;
  push(data, d1, d2) {
    const node = new Node(data);

    if (!this.front) {
      this[d1] = node;
      this[d2] = node;
    } else {
      node[d2] = this[d1];
      this[d1][d1] = node;
      this[d1] = node;
    }

    this.size += 1;
  }
  pop(d1, d2) {
    const result = this[d1].data;

    if (this.size === 1) {
      this.front = null;
      this.back = null;
    } else {
      this[d1] = this[d1][d2];
    }

    this.size -= 1;
    return result;
  }
  pushFront(data) {
    this.push(data, "front", "back");
  }
  pushBack(data) {
    this.push(data, "back", "front");
  }
  popFront() {
    return this.pop("front", "back");
  }
  popBack() {
    return this.pop("back", "front");
  }
  isEmpty() {
    return this.size === 0;
  }
}

const makeDeque = (rc) => {
  const [좌_데크, 중_데크, 우_데크] = [new Deque(), new Deque(), new Deque()];

  rc.forEach((row) => {
    const 임시_중_데크 = new Deque();
    row.forEach((col, x) => {
      if (x === 0) {
        좌_데크.pushBack(col);
      } else if (x === row.length - 1) {
        우_데크.pushBack(col);
      } else {
        임시_중_데크.pushBack(col);
      }
    });
    중_데크.pushBack(임시_중_데크);
  });

  return [좌_데크, 중_데크, 우_데크];
};
const executeCommand = (operations, 좌_데크, 중_데크, 우_데크) => {
  operations.forEach((op) => {
    if (op === "Rotate") {
      const 중상_데크 = 중_데크.popFront();
      const 중하_데크 = 중_데크.popBack();
      // 상단
      중상_데크.pushFront(좌_데크.popFront());
      우_데크.pushFront(중상_데크.popBack());
      // 하단
      중하_데크.pushBack(우_데크.popBack());
      좌_데크.pushBack(중하_데크.popFront());
      // 복구
      중_데크.pushFront(중상_데크);
      중_데크.pushBack(중하_데크);
    }
    if (op === "ShiftRow") {
      좌_데크.pushFront(좌_데크.popBack());
      중_데크.pushFront(중_데크.popBack());
      우_데크.pushFront(우_데크.popBack());
    }
  });
  return [좌_데크, 중_데크, 우_데크];
};
const makeResult = ([l, m, r]) => {
  const result = [];
  while (!l.isEmpty()) {
    const row = [];
    const midDeque = m.popFront();

    row.push(l.popFront());

    while (!midDeque.isEmpty()) {
      row.push(midDeque.popFront());
    }

    row.push(r.popFront());

    result.push(row);
  }
  return result;
};

const solution = (rc, operations) => makeResult(executeCommand(operations, ...makeDeque(rc)));
