function solution(str1, str2) {
  const K = 65536;

  const multiSet1 = toMultiSet(str1);
  const multiSet2 = toMultiSet(str2);

  const union = unionMultiSet(multiSet1, multiSet2);
  const intersection = intersectionMultiSet(multiSet1, multiSet2);

  const unionSize = countFrequencyMap(union);
  const intersectionSize = countFrequencyMap(intersection);

  return Math.floor((unionSize === 0 ? 1 : intersectionSize / unionSize) * K);
}

function toMultiSet(str) {
  const multiSet = [];
  for (let index = 0; index < str.length - 1; index += 1) {
    const element = str.substring(index, index + 2).toLowerCase();
    if (!/^[a-z]{2}$/.test(element)) continue;
    multiSet.push(element);
  }
  return multiSet;
}

function unionMultiSet(setA, setB) {
  const mapA = calcFrequency(setA);
  const mapB = calcFrequency(setB);
  const unionMap = new Map(mapA);

  mapB.forEach((frequency, element) => {
    if (unionMap.has(element) && unionMap.get(element) >= frequency) {
      return;
    }

    unionMap.set(element, frequency);
  });

  return unionMap;
}

function intersectionMultiSet(setA, setB) {
  const mapA = calcFrequency(setA);
  const mapB = calcFrequency(setB);
  const intersectionMap = new Map();

  mapA.forEach((frequency, element) => {
    if (!mapB.has(element)) return;
    const min = Math.min(frequency, mapB.get(element));
    intersectionMap.set(element, min);
  });

  return intersectionMap;
}

function calcFrequency(set) {
  const map = new Map();
  set.forEach((element) => {
    const frequency = map.get(element) ?? 0;
    map.set(element, frequency + 1);
  });
  return map;
}

function countFrequencyMap(frequencyMap) {
  let cnt = 0;
  frequencyMap.forEach((frequency) => (cnt += frequency));
  return cnt;
}
