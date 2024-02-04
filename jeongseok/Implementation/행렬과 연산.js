class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  pushFront(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const prevHead = this.head;
      prevHead.prev = node;
      this.head = node;
      this.head.next = prevHead;
    }

    this.size++;
  }

  popFront() {
    if (!this.size) {
      return -1;
    }

    const returnValue = this.head.data;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.size--;

    return returnValue;
  }

  pushBack(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const prevTail = this.tail;
      prevTail.next = node;
      node.prev = prevTail;
      this.tail = node;
    }

    this.size++;
  }

  popBack() {
    if (!this.size) {
      return -1;
    }

    const returnValue = this.tail.data;

    if (this.size === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;

    return returnValue;
  }
}

function solution(rc, operations) {
  const lq = new Deque();
  const rq = new Deque();

  const mq = new Deque();

  for (let i = 0; i < rc.length; i++) {
    const midQ = new Deque();

    for (let j = 0; j < rc[0].length; j++) {
      if (j === 0) {
        lq.pushBack(rc[i][j]);
      } else if (j === rc[0].length - 1) {
        rq.pushBack(rc[i][j]);
      } else {
        midQ.pushBack(rc[i][j]);
      }
    }

    mq.pushBack(midQ);
  }

  operations.forEach((op) => {
    if (op === "Rotate") {
      // 왼쪽 헤드
      const lqData = lq.popFront();

      // 중간 헤드 덱
      const mqHead = mq.popFront();

      // 중간 헤드 덱 앞에 넣기
      mqHead.pushFront(lqData);

      // 중간 헤드 덱 마지막 뽑기
      const mqData = mqHead.popBack();

      // 중간 헤드 덱 다시 넣기
      mq.pushFront(mqHead);

      // 오른쪽 덱에 넣기
      rq.pushFront(mqData);

      // 오른쪽 덱 꼬리
      const rqData = rq.popBack();

      // 중간 꼬리 덱
      const mqTail = mq.popBack();

      mqTail.pushBack(rqData);

      // 중간 꼬리 덱 첫 번째
      const mqData2 = mqTail.popFront();

      mq.pushBack(mqTail);

      lq.pushBack(mqData2);
    }

    if (op === "ShiftRow") {
      const lqData = lq.popBack();
      lq.pushFront(lqData);

      const rqData = rq.popBack();
      rq.pushFront(rqData);

      mq.pushFront(mq.popBack());
    }
  });

  let answer = [];

  for (let i = 0; i < rc.length; i++) {
    let row = [];

    const midQ = mq.popFront();

    for (let j = 0; j < rc[0].length; j++) {
      if (j === 0) {
        row.push(lq.popFront());
      } else if (j === rc[0].length - 1) {
        row.push(rq.popFront());
      } else {
        row.push(midQ.popFront());
      }
    }

    answer.push(row);
  }

  return answer;
}
