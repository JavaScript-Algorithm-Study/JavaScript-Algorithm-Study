function strToInt(time) {
  const [h, m, s] = time.split(":").map(Number);

  return h * 3600 + m * 60 + s;
}

function solution(play_time, adv_time, logs) {
  const pTime = strToInt(play_time);
  const aTime = strToInt(adv_time);

  const time = new Array(400000).fill(0);

  logs.forEach((log) => {
    const [start, end] = log.split("-");

    const sTime = strToInt(start);
    const eTime = strToInt(end);

    time[sTime] += 1;
    time[eTime] -= 1;
  });

  // i에 시청하고 있던 인원 수
  for (let i = 1; i < time.length; i++) {
    time[i] += time[i - 1];
  }

  // i에 시청하고 있던 누적 인원 수
  for (let i = 1; i < time.length; i++) {
    time[i] += time[i - 1];
  }

  let maxPlayer = time[aTime];
  let maxTime = 0;

  for (let i = aTime + 1; i < time.length; i++) {
    if (maxPlayer < time[i] - time[i - aTime]) {
      maxPlayer = time[i] - time[i - aTime];
      maxTime = i - aTime + 1;
    }
  }

  let h, m, s;

  h = String(Math.floor(maxTime / 3600)).padStart(2, "0");
  maxTime %= 3600;

  m = String(Math.floor(maxTime / 60)).padStart(2, "0");
  maxTime %= 60;

  s = String(maxTime).padStart(2, "0");

  return `${h}:${m}:${s}`;
}
