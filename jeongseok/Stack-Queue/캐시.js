const MIN_VALUE = 999999;

function solution(cacheSize, cities) {
  let executeTime = 0;

  cities = cities.map((city) => {
    return city.toLowerCase();
  });

  const queue = new Map();

  for (let i = 0; i < cities.length; i++) {
    const isExistCache = queue.has(cities[i]);

    if (!isExistCache) {
      if (queue.size < cacheSize) {
        queue.set(cities[i], i);
      } else {
        let minValue = MIN_VALUE;
        let minKey = undefined;

        queue.forEach((value, key) => {
          minValue > value && ((minKey = key), (minValue = value));
        });

        if (minValue != MIN_VALUE) {
          queue.delete(minKey);
          queue.set(cities[i], i);
        }
      }
      executeTime += 5;
    } else {
      queue.set(cities[i], i);
      executeTime += 1;
    }
  }
  return executeTime;
}
