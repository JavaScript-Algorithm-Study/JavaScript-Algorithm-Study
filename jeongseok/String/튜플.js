function solution(s) {
  let sCopy = s
    .slice(2, -2)
    .split("},{")
    .map((val) => val.split(","))
    .sort((a, b) => a.length - b.length);

  let set = new Set();

  sCopy.forEach((val) => val.forEach((ele) => set.add(ele)));

  let answer = [];

  for (val of set) {
    answer.push(+val);
  }

  return answer;
}
