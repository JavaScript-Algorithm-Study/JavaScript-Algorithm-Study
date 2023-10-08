function solution(msg) {
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const stringMap = new Map();

  for (let i = 0; i < alphabet.length; i++) {
    stringMap.set(alphabet[i], i + 1);
  }

  let lastVal = 27;
  let answer = [];
  let endIdx = 1;

  // 문자열이 남아있을 때 까지
  while (msg.length > 0) {
    if (msg[endIdx - 1] === undefined) {
      answer.push(stringMap.get(msg.slice(0, endIdx)));
      break;
    }

    // 문자열이 있다면
    if (stringMap.get(msg.slice(0, endIdx))) {
      // 마지막 지점 늘리기
      endIdx++;
    } else {
      stringMap.set(msg.slice(0, endIdx), lastVal);
      answer.push(stringMap.get(msg.slice(0, endIdx - 1)));
      msg = msg.slice(endIdx - 1);
      lastVal++;
      endIdx = 1;
    }
  }

  return answer;
}
