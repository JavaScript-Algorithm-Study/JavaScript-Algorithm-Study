function solution(s) {
  var answer = [];

  const arr = s
    .split("},")
    .map((str) => {
      return str.replace(/[{}]/g, "").split(",").map(Number);
    })
    .sort((a, b) => {
      return a.length - b.length;
    });

  answer.push(arr[0][0]);

  arr.splice(0, 1);

  arr.forEach((ele) => {
    ele.forEach((item) => {
      if (!answer.includes(item)) {
        answer.push(item);
      }
    });
  });

  return answer;
}
