function solution(n, weak, dist) {
  let min = Infinity;

  const memoize = (fn) => {
    const cache = new Map();

    return (...args) => {
      const key = args.join(" ");
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };

  const circularNumber = (index, array) => {
    const { length } = array;
    return (index + length) % length;
  };

  const calcDiff = (start, end) => {
    if (start < end) {
      return end - start;
    }
    return n - start + end;
  };

  const repair = memoize((workerDist, weakIndex) => {
    let curIndex = weakIndex;
    const result = [curIndex];

    while (workerDist > 0) {
      const cur = weak[curIndex];

      const nextWeakIndex = circularNumber(curIndex + 1, weak);
      const next = weak[nextWeakIndex];

      const diff = calcDiff(cur, next);

      if (workerDist < diff) {
        break;
      }

      workerDist -= diff;
      curIndex = nextWeakIndex;
      result.push(nextWeakIndex);
    }

    return result;
  });

  const dfs = (weakIndex, depth, repaired, restWorker) => {
    if (depth === repaired.length) {
      const repairedAll = repaired.every((v) => v);
      if (repairedAll) {
        min = Math.min(min, dist.length - restWorker.length);
      }
      return;
    }

    const nextWeakIndex = circularNumber(weakIndex + 1, weak);

    if (repaired[weakIndex]) {
      dfs(nextWeakIndex, depth + 1, repaired, restWorker);
      return;
    }

    restWorker.forEach((workerDist, workerIndex) => {
      const repairedIndices = repair(workerDist, weakIndex).filter(
        (index) => !repaired[index]
      );

      repairedIndices.forEach(
        (repairedIndex) => (repaired[repairedIndex] = true)
      );

      dfs(
        nextWeakIndex,
        depth + 1,
        repaired,
        restWorker.filter((_, index) => index !== workerIndex)
      );

      repairedIndices.forEach(
        (repairedIndex) => (repaired[repairedIndex] = false)
      );
    });
  };

  weak.forEach((_, start) => {
    dfs(start, 0, Array(weak.length).fill(false), dist);
  });

  return min === Infinity ? -1 : min;
}
