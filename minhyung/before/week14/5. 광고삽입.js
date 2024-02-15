function padNum(num) {
  return num.toString().padStart(2, "0");
}
function stringTimeToNum(str) {
  const [h, m, s] = str.split(":");
  return +h * 3600 + +m * 60 + +s;
}
function numTimeToString(num) {
  const h = Math.floor(num / 3600);
  const m = Math.floor((num - h * 3600) / 60);
  const s = num % 60;
  return `${padNum(h)}:${padNum(m)}:${padNum(s)}`;
}

function solution(play_time, adv_time, logs) {
  const playTime = stringTimeToNum(play_time);
  const advTime = stringTimeToNum(adv_time);
  const time = Array(playTime).fill(0);

  logs.forEach((log) => {
    const [start, end] = log.split("-").map((time) => stringTimeToNum(time));
    time[start] += 1;
    time[end] -= 1;
  });

  for (let i = 1; i < time.length; i++) {
    time[i] += time[i - 1];
  }
  for (let i = 1; i < time.length; i++) {
    time[i] += time[i - 1];
  }

  let maxPlayTime = time[advTime];
  let resultTime = 0;

  for (let i = advTime + 1; i < time.length; i++) {
    const now = time[i] - time[i - advTime];
    if (maxPlayTime < now) {
      maxPlayTime = now;
      resultTime = i - advTime + 1;
    }
  }

  return numTimeToString(resultTime);
}

const a = solution("02:03:55", "00:14:15", [
  "01:20:15-01:45:14",
  "00:40:31-01:00:00",
  "00:25:50-00:48:29",
  "01:30:59-01:53:29",
  "01:37:44-02:02:30",
]);

console.log(a);
