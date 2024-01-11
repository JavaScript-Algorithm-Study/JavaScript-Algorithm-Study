function solution(numbers) {
  return numbers
    .map(toBinaryString)
    .map(toPerfectBinaryTree)
    .map(isValid)
    .map((valid) => (valid ? 1 : 0));
}

function toBinaryString(number) {
  return number.toString(2);
}

function toPerfectBinaryTree(binaryString) {
  const totalNode = calcTotalNode(binaryString.length);
  return binaryString.padStart(totalNode, "0");
}

function calcTotalNode(nNode) {
  const height = calcHeight(nNode);
  return 2 ** height - 1;
}

function calcHeight(nNode) {
  return Math.ceil(Math.log(nNode + 1) / Math.log(2));
}

function isValid(binaryString) {
  const rootIndex = Math.floor(binaryString.length / 2);
  const rootNode = binaryString[rootIndex];

  if (rootIndex === 0) {
    return true;
  }

  if (rootNode === "0") {
    return binaryString === "0".repeat(binaryString.length);
  }

  return (
    isValid(binaryString.substring(0, rootIndex)) &&
    isValid(binaryString.substring(rootIndex + 1))
  );
}
