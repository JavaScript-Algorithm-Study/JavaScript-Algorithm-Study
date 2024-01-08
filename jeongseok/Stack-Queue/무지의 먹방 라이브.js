function solution(food_times, k) {
  let arr = [];

  let foods = 0;

  food_times.map((ele, index) => {
    arr.push({ index: index + 1, size: ele });
    foods += ele;
  });

  if (foods <= k) {
    return -1;
  }

  arr.sort((a, b) => {
    return a.size - b.size;
  });

  let repeat = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      repeat.push(arr[i].size);
    } else {
      repeat.push(arr[i].size - arr[i - 1].size);
    }
  }

  let remainIndex = 0;

  for (let i = 0; i < repeat.length; i++) {
    // 해당 음식을 이미 다 먹었다면
    if (repeat[i].size === 0) {
      arr[i].size = 0;
      continue;
    }

    // 해당 음식이 0이 될때 까지 반복을 못돌리면
    if (k - (repeat.length - i) * repeat[i] < 0) {
      remainIndex = k;
      break;
    } else {
      k = k - (repeat.length - i) * repeat[i];
      arr[i].size = 0;
    }
  }

  arr = arr.filter((ele) => {
    return ele.size !== 0;
  });

  arr.sort((a, b) => {
    return a.index - b.index;
  });

  return arr[remainIndex % arr.length].index;
}
