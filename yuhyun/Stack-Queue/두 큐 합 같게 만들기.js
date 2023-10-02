function solution(queue1, queue2) {
  const INVALID = -1;

  const add = (a, b) => a + b;
  const isOdd = (num) => num % 2 === 1;

  const list = [...queue1, ...queue2];

  const total = list.reduce(add, 0);
  if (isOdd(total)) {
    return INVALID;
  }

  let result = 0;
  let start = 0;
  let end = queue1.length;
  let cur = queue1.reduce(add, 0);
  const target = total / 2;

  while (end <= list.length) {
    if (cur === target) {
      return result;
    }

    if (cur < target) {
      cur += list[end];
      end += 1;
    } else {
      cur -= list[start];
      start += 1;
    }

    result += 1;
  }

  return INVALID;
}
