function solution(s) {
  let answer = Infinity;

  for (let i = 1; i < Math.ceil(s.length / 2) + 1; i++) {
    let strArr = [];

    for (let j = 0; j < Math.ceil(s.length / i); j++) {
      let tmpStr = s.slice(j * i, j * i + i);

      // 앞의 요소와 같다면
      if (strArr[strArr.length - 1]?.str === tmpStr) {
        strArr[strArr.length - 1].repeat += 1;
      } else {
        strArr.push({ repeat: 1, str: tmpStr });
      }
    }

    const length = strArr.reduce((acc, cur) => {
      const { repeat, str } = cur;

      let strLen = repeat === 1 ? str.length : String(repeat).length + str.length;

      return acc + strLen;
    }, 0);

    answer = answer < length ? answer : length;
  }

  return answer;
}
