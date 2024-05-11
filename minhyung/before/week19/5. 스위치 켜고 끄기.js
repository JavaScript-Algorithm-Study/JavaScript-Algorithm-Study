//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
10
0 0 0 0 0 0 1 1 0 0
1
2 6
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const GENDER = {
  MAN: 1,
  GIRL: 2,
};

function manChangeSwitch(switches, receivedSwitchNum) {
  switches.forEach((switchNum, idx) => {
    if ((idx + 1) % receivedSwitchNum !== 0) return;
    switches[idx] = switchNum ^ 1;
  });
}
function girlChangeSwitch(switches, receivedSwitchNum) {
  const nowIdx = receivedSwitchNum - 1;
  let left = nowIdx - 1;
  let right = nowIdx + 1;

  // 가운데 스위치 변경
  switches[nowIdx] = switches[nowIdx] ^ 1;

  while (switches?.[left] === switches?.[right]) {
    switches[left] = switches[left] ^ 1;
    switches[right] = switches[right] ^ 1;
    left--;
    right++;
  }
}
function solution(switchesLength, switches, students) {
  students.forEach(([gender, receivedSwitchNum]) => {
    // 해당 번호 배수 반대로
    if (gender === GENDER.MAN) {
      manChangeSwitch(switches, receivedSwitchNum);
    }
    if (gender === GENDER.GIRL) {
      girlChangeSwitch(switches, receivedSwitchNum);
    }
  });

  const lineNum = Math.ceil(switchesLength / 20);
  return Array.from({ length: lineNum }, (_, idx) => switches.slice(idx * 20, (idx + 1) * 20).join(" ")).join("\n");
}
const switchNum = +input(); // 100이하 정수
const switches = input(); //스위치
const studentNum = +input();
const students = Array.from({ length: studentNum }, () => input());
console.log(solution(switchNum, switches, students));

// const arr = [1, 2, 3];
// console.log(arr.slice(1));
// 남학생: 스위치 번호가 자기가 받은수의 배수면 스위치의 상태를 바꾼다.
// 켜져있으면 끄고, 꺼저였으면 킨다.
// 3을 받았다면 3, 6 스위치를 바꾼다.

// 여학생: 자기 번호의 스위치를 중심으로 좌우 대칭이면서 가장 많은 스위치를 포함하는 구간 찾음
// 그 구간에 속한 스위치의 상태 모두 바꿈
// 이 때 구간에 속한 스위치 개수는 항상 홀수

// 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
