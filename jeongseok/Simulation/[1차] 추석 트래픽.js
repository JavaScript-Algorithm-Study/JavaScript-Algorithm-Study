function solution(lines) {
  const newLines = [];

  lines.forEach((ele) => {
    const [date, time, range] = ele.split(" ");

    const [h, m, s] = time.split(":");

    const all = h * 3600 * 1000 + m * 60 * 1000 + s * 1000;

    let start = all - range.replace("s", "") * 1000 + 1;

    newLines.push({ start, end: +all });
  });

  let count = 0;

  for (let i = 0; i < newLines.length; i++) {
    let tmpCount = 1;

    let tEnd = newLines[i].end + 1000;

    for (let j = i + 1; j < newLines.length; j++) {
      if (newLines[j].start < tEnd) {
        tmpCount += 1;
      }
    }

    count = Math.max(count, tmpCount);
  }

  return count;
}
