function solution(food_times, k) {
  let answer = -1;
  let totalTime = food_times.reduce((stack, ele) => stack + ele, 0);
  let food_info = food_times
    .map((ele, index) => [index, ele])
    .sort((a, b) => a[1] - b[1]);

  if (totalTime <= k) return -1;

  let last_food_time = 0;
  for (let i = 0; i < food_times.length; i++) {
    const cur_food_time = food_info[i][1];
    const rest_foods = food_info.length - i;

    // 해당 음식을 다 먹는데 걸리는 시간
    const eat_time = (cur_food_time - last_food_time) * rest_foods;
    last_food_time = cur_food_time;

    if (k < eat_time) {
      food_info = food_info.slice(i).sort((a, b) => a[0] - b[0]);
      // 마지막이라 +1 해줘야함
      answer = food_info[k % rest_foods][0] + 1;
      break;
    }
    k -= eat_time;
  }

  return answer;
}
