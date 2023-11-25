function solution(lines) {
  const timeLines = lines.map((line) => {
    const [date, time, processTime] = line.split(" ");
    const [year, month, day] = date.split("-").map(Number);
    const [h, m, ss] = time.split(":");
    const [s, ms] = ss.split(".");

    const [processS, processMs] = processTime
      .substring(0, processTime.length - 1)
      .split(".");

    const endDate = new Date(
      year,
      month - 1,
      day,
      ...[h, m, s, ms].map(Number)
    );
    const startDate = new Date(endDate);
    startDate.setSeconds(startDate.getSeconds() - Number(processS));
    startDate.setMilliseconds(
      startDate.getMilliseconds() - Number(processMs ?? 0)
    );
    startDate.setMilliseconds(startDate.getMilliseconds() + 1);
    return [startDate, endDate];
  });

  let max = 0;
  const { length } = timeLines;
  for (let left = 0; left < length; left++) {
    let nProcessed = 0;
    const [_, leftEnd] = timeLines[left];
    const afterOneSecond = new Date(leftEnd);
    afterOneSecond.setSeconds(leftEnd.getSeconds() + 1);
    afterOneSecond.setMilliseconds(leftEnd.getMilliseconds() - 1);

    for (let right = left; right < length; right++) {
      const [rightStart] = timeLines[right];
      if (rightStart <= afterOneSecond) {
        nProcessed += 1;
      }
    }

    max = Math.max(max, nProcessed);
  }

  return max;
}
