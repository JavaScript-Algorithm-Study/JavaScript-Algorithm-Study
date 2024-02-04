function solution(n, t, m, timetable) {
  let times = [];

  timetable.forEach((time) => {
    const [h, m] = time.split(":").map(Number);
    times.push(h * 60 + m);
  });

  times.sort((a, b) => a - b);

  // 마지막 한번 빼고 반복
  for (let i = 0; i < n - 1; i++) {
    const busTime = 9 * 60 + i * t;

    let count = 0;

    for (let j = 0; j < times.length; j++) {
      if (count >= m) {
        break;
      }
      if (times[j] <= busTime) {
        count += 1;
      }
    }
    times = times.slice(count);
  }

  const lastBus = 9 * 60 + (n - 1) * t;

  let answer;

  // 인원 넉넉
  if (times.length < m) {
    answer = lastBus;
  } else {
    answer = lastBus < times[m - 1] - 1 ? lastBus : times[m - 1] - 1;
  }

  return `${String(Math.floor(answer / 60)).padStart(2, "0")}:${String(answer % 60).padStart(2, "0")}`;
}
