//https://www.acmicpc.net/problem/9935
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
aca
a
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++]))();

function concatInArrayElements(array) {
  let concat = "";

  while (array.length > 0) {
    const tail = array.pop();
    concat = `${tail}${concat}`;
  }

  return concat;
}
function solution(string, explosion) {
  const canExplosion = (string) => explosion.indexOf(string) === 0;
  const willExplosion = (string) => explosion === string;
  const arr = [];
  let result = "";

  for (const char of string) {
    // 1. 배열 맨 뒤 요소 뒤에 현재 문자를 추가해서 폭발문자 되면 추가해줌
    //  1-1. 추가했는데 폭발문자 되면 큐에서 뺌
    if (canExplosion(arr.at(-1) + char)) {
      arr[arr.length - 1] += char;
      if (willExplosion(arr[arr.length - 1])) {
        arr.pop();
      }
    }
    // 2. 1은 안되는데 현재 문자가 폭발문자 맨 앞 단어라면 배열에 넣음
    // 2-1. 근데 단어 하나가 폭발하면 아예 넣지 않음
    else if (canExplosion(char)) {
      if (!willExplosion(char)) {
        arr.push(char);
      }
    }
    // 3. 2도 안되면 배열 안의 문자를 전부 결과에 추가해줌
    else {
      result += concatInArrayElements(arr) + char;
    }
  }

  // 마지막 남은거 처리
  result += concatInArrayElements(arr);

  return result.length === 0 ? "FRULA" : result;
}

const string = input();
const explosion = input();
console.log(solution(string, explosion));

// 폴발 문자열을 포함하면 모든 폴발 문자열이 폴발
// 남은 문자열을 순서대로 이어 붙여 새로운 문자열을 만듬
// 새로 생긴 문자열에 폭발 문자열이 있을수도 있음
// 없을 때 까지 반복됨
// 남아있는 문자가 하나도 없다면 `FRULA` 출력
// 폭발 문자열은 같은 문자를 두개 이상 포함하지 않음
