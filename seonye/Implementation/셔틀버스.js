/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/17678
난이도 : Level3
*/

function solution(n, t, m, timetable) {
  const timeArr = Array.from({ length: n }, (_, i) => 540 + i * t);

  let rideBoard = new Map();
  for (let busTime of timeArr) {
    rideBoard.set(busTime, []);
  }

  timetable.sort();
  timetable = timetable.map((time) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  });
  const isRide = new Array(timetable.length).fill(false);

  for (let busTime of timeArr) {
    for (let i = 0; i < timetable.length; i++) {
      const arriveTime = timetable[i];
      if (arriveTime <= busTime && !isRide[i]) {
        const curRider = rideBoard.get(busTime);
        if (curRider.length >= m) continue;
        rideBoard.get(busTime).push(arriveTime);
        isRide[i] = true;
      }
    }
  }

  function changeTimeString(time) {
    const hour = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const minute = (time % 60).toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }

  const lastBusTime = timeArr[timeArr.length - 1];
  const lastBustRiders = rideBoard.get(lastBusTime);

  if (lastBustRiders.length < m) return changeTimeString(lastBusTime);
  else return changeTimeString(lastBustRiders[m - 1] - 1);
}
