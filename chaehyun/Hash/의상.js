function solution(clothes) {
  var answer = 1;
  const map = new Map();

  clothes.forEach((item) => {
    const category = item[1];
    map.set(item[1], map.get(category) ? map.get(category) + 1 : 1);
  });

  const newArr = [...map];

  newArr.forEach((ele) => {
    answer = answer * (ele[1] + 1);
  });

  answer -= 1;
  return answer;
}
