function solution(info, query) {
  const caseMap = (() => {
    const AND = " and ";
    const ANY = "-";
    const N_FIELD = 4;
    const TOTAL_CASE = 2 ** N_FIELD;

    const scoreAscendingFn = (a, b) => a - b;

    const map = new Map();

    const addInfo = (infoString) => {
      const infoArray = infoString.split(" ");
      const score = parseInt(infoArray.pop(), 10);

      for (let curCase = 0; curCase < TOTAL_CASE; curCase += 1) {
        const curCaseBinary = curCase.toString(2).padStart(N_FIELD, "0");
        const curKey = infoArray
          .map((curField, index) => {
            const anyField = curCaseBinary[index] === "0";
            return anyField ? ANY : curField;
          })
          .join(AND);

        const scoreArray = map.get(curKey) ?? [];
        scoreArray.push(score);
        map.set(curKey, scoreArray);
      }
    };

    const sort = () => {
      map.forEach((scoreArray) => scoreArray.sort(scoreAscendingFn));
    };

    const getScoreArray = (key) => {
      return map.get(key);
    };

    return { addInfo, sort, getScoreArray };
  })();

  const lowerBound = (array, target) => {
    let low = -1;
    let high = array.length;
    while (low + 1 < high) {
      const mid = Math.floor((low + high) / 2);
      if (array[mid] >= target) {
        high = mid;
        continue;
      }
      low = mid;
    }
    return high;
  };

  const parseQuery = (queryString) => {
    const queryArray = queryString.split(" ");
    const score = parseInt(queryArray.pop(), 10);
    const caseMapKey = queryArray.join(" ");
    return [caseMapKey, score];
  };

  const count = ([caseMapKey, minScore]) => {
    const scoreArray = caseMap.getScoreArray(caseMapKey) ?? [];
    return scoreArray.length - lowerBound(scoreArray, minScore);
  };

  info.forEach(caseMap.addInfo);
  caseMap.sort();
  return query.map(parseQuery).map(count);
}
