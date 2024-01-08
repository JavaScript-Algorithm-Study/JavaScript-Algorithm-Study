function solution(priorities, location) {
  const arr = [];

  for (let i = 0; i < priorities.length; i++) {
    arr.push({
      l: i,
      p: priorities[i],
    });
  }

  let startIndex = 1;

  while (arr.length) {
    let data = arr.shift();
    let isExist = false;

    for (let i = 0; i < arr.length; i++) {
      if (data.p < arr[i].p) {
        arr.push(data);
        isExist = true;
        break;
      }
    }

    if (isExist) {
      continue;
    }

    if (data.l === location) {
      return startIndex;
    } else {
      startIndex++;
    }
  }
}
