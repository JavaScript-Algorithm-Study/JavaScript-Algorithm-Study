// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/60061
// 시작날짜: 2024.02.05

const GI = 0;
const BO = 1;
const REMOVE = 0;
const INSTALL = 1;

function canInstallGi(y, x, gi, bo) {
  if (y === 0 || bo[y][x]) return true;
  if (bo[y]?.[x - 1]) return true;
  if (gi?.[y - 1][x]) return true;

  return false;
}
function canInstallBo(y, x, gi, bo) {
  if (gi?.[y - 1][x]) return true;
  if (gi?.[y - 1]?.[x + 1]) return true;
  if (bo?.[y]?.[x - 1] && bo?.[y]?.[x + 1]) return true;

  return false;
}
function cnaInstallAfterDelete(result, gi, bo) {
  for (const [x, y, type] of result) {
    if (type === GI && !canInstallGi(y, x, gi, bo)) return false;
    if (type === BO && !canInstallBo(y, x, gi, bo)) return false;
  }
  return true;
}
function tryDelete(type, result, gi, bo, y, x) {
  if (type === GI) gi[y][x] = false;
  if (type === BO) bo[y][x] = false;

  if (cnaInstallAfterDelete(result, gi, bo)) {
    const idx = result.findIndex(([xx, yy, aa]) => xx === x && yy === y && aa === type);
    if (idx > -1) result.splice(idx, 1);
  } else {
    if (type === GI) gi[y][x] = true;
    if (type === BO) bo[y][x] = true;
  }
}
function solution(n, build_frame) {
  const bo = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => false));
  const gi = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => false));
  const result = [];

  build_frame.forEach(([x, y, type, work]) => {
    if (work === INSTALL) {
      if (type === GI && canInstallGi(y, x, gi, bo)) {
        gi[y][x] = true;
        result.push([x, y, type]);
      }
      if (type === BO && canInstallBo(y, x, gi, bo)) {
        bo[y][x] = true;
        result.push([x, y, type]);
      }
    }
    if (work === REMOVE) {
      tryDelete(type, result, gi, bo, y, x);
    }
  });

  result.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  return result;
}
