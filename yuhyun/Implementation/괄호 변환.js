function solution(p) {
  const reverse = (char) => (char === ")" ? "(" : ")");

  const toValid = (u) =>
    [...u.substring(1, u.length - 1)].map(reverse).join("");

  const isValid = (string) => {
    if (string.length % 2 !== 0) return false;

    let left = 0;
    for (const char of string) {
      if (char === "(") {
        left += 1;
        continue;
      }

      if (left === 0) {
        return false;
      }

      left -= 1;
    }
    return left === 0;
  };

  const isBalanced = (string) => {
    if (string.length % 2 !== 0) return false;

    let left = 0;
    let right = 0;
    for (const char of string) {
      if (char === "(") left += 1;
      else right += 1;
    }
    return left === right;
  };

  const split = (string) => {
    const { length } = string;
    for (let end = 2; end < length; end += 2) {
      const u = string.substring(0, end);
      const v = string.substring(end);
      if (isBalanced(u)) {
        return [u, v];
      }
    }
    return [string, ""];
  };

  const toValidRecur = (string) => {
    if (!string) {
      return "";
    }

    const [u, v] = split(string);
    const validV = toValidRecur(v);
    if (isValid(u)) {
      return u + validV;
    }

    return "(" + validV + ")" + toValid(u);
  };

  return toValidRecur(p);
}
