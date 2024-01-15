function solution(numbers) {
  var answer = [];

  for (const num of numbers) {
    let binary = num.toString(2);
    let cnt = nodeCount(binary);
    binary = binary.padStart(cnt, "0");
    answer.push(checkTree(binary) ? 1 : 0);
  }

  return answer;
}

function nodeCount(binary) {
  let depth = 0;
  let cnt = 0;
  while (binary.length > cnt) {
    cnt += 2 ** depth;
    depth += 1;
  }
  return cnt;
}

function checkTree(binary) {
  if (!binary.length) {
    return true;
  }
  const parentNode = Math.floor(binary.length / 2);
  if (binary[parentNode] === "0") {
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === "1") return false;
    }
  }
  let leftTree = binary.slice(0, parentNode);
  let rightTree = binary.slice(parentNode + 1);
  return checkTree(leftTree) && checkTree(rightTree);
}
