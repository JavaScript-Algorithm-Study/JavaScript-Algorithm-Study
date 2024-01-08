function solution(food_times, k) {
  const [remainFoodTimes, remainK] = clearFood(food_times, k);
  return rotateFood(remainFoodTimes, remainK);
}

function clearFood(foodTimes, k) {
  const FOOD_TIME = 0;
  const FOOD = 1;

  const descendingFoodTimes = foodTimes
    .map((foodTime, food) => [foodTime, food + 1])
    .sort((a, b) => b[FOOD_TIME] - a[FOOD_TIME] || b[FOOD] - a[FOOD]);

  let round = 0;
  while (descendingFoodTimes.length && k > 0) {
    const remainFoodLength = descendingFoodTimes.length;

    const [foodTime] = descendingFoodTimes.at(-1);

    const remainFood = foodTime - round;
    const clearCurFoodRoundTime = remainFoodLength * remainFood;

    if (k < clearCurFoodRoundTime) {
      break;
    }

    k -= clearCurFoodRoundTime;
    round += remainFood;
    while (descendingFoodTimes.at(-1)?.[FOOD_TIME] <= round) {
      descendingFoodTimes.pop();
    }
  }
  return [descendingFoodTimes, k];
}

function rotateFood(foodTimes, k) {
  const FOOD = 1;

  const remainFoodLength = foodTimes.length;
  if (remainFoodLength === 0) {
    return -1;
  }

  k = k % remainFoodLength;
  const ascendingOrderFoodTimes = [...foodTimes].sort(
    (a, b) => a[FOOD] - b[FOOD]
  );

  return ascendingOrderFoodTimes[k][FOOD];
}
