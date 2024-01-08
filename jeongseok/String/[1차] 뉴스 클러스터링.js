function solution(str1, str2) {
  let s1Arr = [];
  let s2Arr = [];

  for (let i = 0; i < str1.length - 1; i++) {
    let test = str1[i] + str1[i + 1];
    if (test.match(/[A-Z]{2}/gi)) {
      s1Arr.push(test.toUpperCase());
    }
  }

  for (let i = 0; i < str2.length - 1; i++) {
    let test = str2[i] + str2[i + 1];
    if (test.match(/[A-Z]{2}/gi)) {
      s2Arr.push(test.toUpperCase());
    }
  }

  let set = new Set([...s1Arr, ...s2Arr]);

  let max = 0; // 합집합
  let min = 0; // 교집합

  set.forEach((ele) => {
    let s1Filter = s1Arr.filter((idx) => idx === ele).length;
    let s2Filter = s2Arr.filter((idx) => idx === ele).length;

    max += Math.max(s1Filter, s2Filter);
    min += Math.min(s1Filter, s2Filter);
  });

  let answer;
  if (max === 0 && min === 0) {
    answer = 65536;
  } else {
    answer = Math.floor((min / max) * 65536);
  }

  return answer;
}
