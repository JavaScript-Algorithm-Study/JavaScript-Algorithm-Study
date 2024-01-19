function solution(brown, yellow) {
  const total = brown + yellow;

  const maxHeight = Math.floor(Math.sqrt(total));

  for (let height = 3; height < maxHeight + 1; height += 1) {
    if (total % height !== 0) {
      continue;
    }

    const width = total / height;
    const curYellow = (width - 2) * (height - 2);

    if (curYellow === yellow) {
      return [width, height];
    }
  }

  return [-1, -1];
}
