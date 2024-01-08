function solution(s) {
  const array = JSON.parse(s.replaceAll("{", "[").replaceAll("}", "]"));
  const ascendingLengthArray = array.sort((a, b) => a.length - b.length);

  const set = new Set();
  const tuple = [];

  ascendingLengthArray.forEach((subArray) => {
    subArray.forEach((element) => {
      if (set.has(element)) {
        return;
      }

      set.add(element);
      tuple.push(element);
    });
  });

  return tuple;
}
