// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/17678
// 시작날짜: 2024.02.05

const padToNum = (num) => num.toString().padStart(2, "0");
const strToNum = (time) => (([HH, MM] = time.split(":")), +HH * 60 + +MM);
const numToStr = (num) => (([HH, MM] = [Math.floor(num / 60), num % 60]), `${padToNum(HH)}:${padToNum(MM)}`);

function solution(n, t, m, timetable) {
  let nowTime = strToNum("09:00");
  let myTime = strToNum("09:00") + (n - 1) * t;

  const sortedTimetable = timetable.map(strToNum).sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    let inPeople = 0;
    let lastInTime = 0;
    for (let j = 0; j < m; j++) {
      // 지금 크루가 차를 탈 수 있으면
      if (sortedTimetable?.[0] <= nowTime) {
        lastInTime = sortedTimetable.shift();
        inPeople++;
      }
      // i가 마지막 막차를 탔는데 차가 꽉찼고, 더 못타면 마지막 탄사람 시간 -1
      if (i === n - 1 && j === m - 1 && inPeople >= m) {
        myTime = lastInTime - 1;
      }
    }
    nowTime += t;
  }

  return numToStr(myTime);
}
