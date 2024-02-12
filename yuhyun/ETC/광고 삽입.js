function solution(play_time, adv_time, logs) {
  const max = toSec(play_time);
  const nPlay = Array(max + 1).fill(0);

  logs
    .map((log) => log.split("-").map(toSec))
    .forEach(([startSec, endSec]) => {
      nPlay[startSec] += 1;
      nPlay[endSec] -= 1;
    });

  for (let sec = 1; sec < nPlay.length; sec += 1) {
    nPlay[sec] += nPlay[sec - 1];
  }

  const advSec = toSec(adv_time);

  let acc = nPlay.slice(0, advSec).reduce((acc, cur) => acc + cur, 0);
  let maxPlayTime = acc;
  let maxPlayTimeStartSec = 0;
  for (let sec = 1; sec < max - advSec + 1; sec += 1) {
    acc = acc - nPlay[sec - 1] + nPlay[sec + advSec - 1];

    if (maxPlayTime < acc) {
      maxPlayTime = acc;
      maxPlayTimeStartSec = sec;
    }
  }

  return toTime(maxPlayTimeStartSec);
}

function toSec(string) {
  const 분 = 60;
  const 시 = 60 * 분;
  const [hour, minute, second] = string.split(":").map(Number);
  return hour * 시 + minute * 분 + second;
}

function toTime(sec) {
  const 분 = 60;
  const 시 = 60 * 분;

  const hour = Math.floor(sec / 시);
  sec %= 시;

  const minute = Math.floor(sec / 분);
  sec %= 분;

  const second = sec;
  return [hour, minute, second].map((num) => `${num}`.padStart(2, "0")).join(":");
}
