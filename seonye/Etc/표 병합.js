/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/150366
난이도 : Level3

1. 문제 설명
표는 50 x 50으로 고정되어있고, 초기에 모든 셀은 비어있다.
각 셀은 문자열 값을 가질 수 있고, 다른 셀과 병합될 수 있다.

(r, c) : 위에서 r번째, 왼쪽에서 c번쨰

명령어 기능을 수행할 수 있다.

2, 9, 11, 13-18, 20
*/
const commands = [
  'UPDATE 1 1 A',
  'UPDATE 2 2 B',
  'UPDATE 3 3 C',
  'UPDATE 4 4 D',
  'MERGE 1 1 2 2',
  'MERGE 3 3 4 4',
  'MERGE 1 1 4 4',
  'UNMERGE 3 3',
  'PRINT 1 1',
  'PRINT 2 2',
  'PRINT 3 3',
  'PRINT 4 4',
];
function getParent(parent, x) {
  const key = x.join(' ');

  if (parent.get(key).join(' ') === key) return x;
  return getParent(parent, parent.get(key));
}

function unionParent(parent, a, b) {
  const a_parent = getParent(parent, a);

  parent.set(b.join(' '), a_parent);
}

function getSameParent(parentMap, r, c) {
  const parent = parentMap.get([r, c].join(' ')).join(' ');
  const arr = [];
  for (const [key, value] of parentMap.entries()) {
    if (value.join(' ') === parent) {
      arr.push(key);
    }
  }
  return arr;
}

function solution(commands) {
  let answer = [];
  const table = Array.from({ length: 5 }, () => new Array(5).fill(-1));
  let linkMap = new Map();

  for (let command of commands) {
    const [cmd, ...args] = command.split(' ');

    switch (cmd) {
      case 'UPDATE':
        if (args.length === 3) {
          const [r, c, value] = args;
          if (!linkMap.has([r, c].join(' '))) {
            table[r][c] = value;
            break;
          } else if (linkMap.has([r, c].join(' '))) {
            const needUpdate = getSameParent(linkMap, r, c);
            for (let key of needUpdate) {
              const [_r, _c] = key.split(' ');
              table[_r][_c] = value;
            }
            break;
          }
        } else {
          const [value1, value2] = args;
          for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < table[i].length; j++) {
              if (table[i][j] === value1) table[i][j] = value2;
            }
          }
        }
        break;
      case 'MERGE':
        const [r1, c1, r2, c2] = args;
        const key1 = [r1, c1].join(' ');
        const key2 = [r2, c2].join(' ');
        const value1 = table[r1][c1];
        const value2 = table[r2][c2];

        if (value1 !== -1 && value2 !== -1) {
          table[r2][c2] = value1;
        } else if (value1 !== -1) {
          table[r2][c2] = value1;
        } else if (value2 !== -1) {
          table[r1][c1] = value2;
        }

        if (!linkMap.has(key1)) linkMap.set(key1, [r1, c1]);

        if (linkMap.has(key2)) {
          const needUpdate = getSameParent(linkMap, r2, c2);

          for (let key of needUpdate) {
            const [_r, _c] = key.split(' ');
            linkMap.set(key, [r1, c1]);
            table[_r][_c] = value1;
          }
        }

        unionParent(linkMap, [r1, c1], [r2, c2]);

        break;
      case 'UNMERGE':
        if (!linkMap.has(args.join(' '))) break;
        else {
          const [r, c] = args;
          const needUpdate = getSameParent(linkMap, r, c);

          for (let key of needUpdate) {
            const [_r, _c] = key.split(' ');

            linkMap.delete(key);
            if (_r !== r || _c !== c) {
              table[_r][_c] = -1;
            }
          }

          break;
        }

      case 'PRINT':
        const [r, c] = args;
        if (table[r][c] !== -1) answer.push(table[r][c]);
        else answer.push('EMPTY');

        break;
      default:
        break;
    }
  }

  return answer;
}
console.log(solution(commands));

/*
function updateMap(map, key, value, isMany) {
  if (map.has(key)) {
    const tmp = map.get(key);

    if (isMany) map.set(key, tmp.add(...value));
    else map.set(key, tmp.add(value));
  } else {
    if (isMany) map.set(key, new Set(value));
    else map.set(key, new Set([value]));
  }
}

function getParent(parent, x) {
  const key = x.join(' ');

  if (parent.get(key).join(' ') === key) return x;
  return getParent(parent, parent.get(key));
}

function unionParent(parent, a, b) {
  const a_parent = getParent(parent, a);

  parent.set(b.join(' '), a_parent);
}

function getSameParent(parentMap, r, c) {
  const parent = parentMap.get([r, c].join(' ')).join(' ');
  const arr = [];
  for (const [key, value] of parentMap.entries()) {
    if (value.join(' ') === parent) {
      arr.push(key);
    }
  }
  return arr;
}

function solution(commands) {
  let answer = [];
  const table = Array.from({ length: 4 }, () => new Array(4));
  let valueMap = new Map();
  let linkMap = new Map();

  for (let command of commands) {
    const [cmd, ...args] = command.split(' ');

    switch (cmd) {
      case 'UPDATE':
        if (args.length === 3) {
          let [r, c, value] = args;
          if (!table[r][c]) {
            const tmpValue = table[r][c];
            table[r][c] = value;
            updateMap(valueMap, value, [r, c].join(' '), false);
            if (linkMap.has([r, c].join(' '))) {
              const needUpdate = getSameParent(linkMap, r, c);

              for (let key of needUpdate) {
                const [_r, _c] = key.split(' ');
                table[_r][_c] = value;
              }
            }
            break;
          } else if (table[r][c] && !linkMap.has([r, c].join(' '))) {
            const tmpValue = table[r][c];
            table[r][c] = value;
            valueMap.get(tmpValue).delete([r, c].join(' '));
            updateMap(valueMap, value, [r, c].join(' '), false);
            break;
          } else {
            const tmpValue = table[r][c];
            const needUpdate = getSameParent(linkMap, r, c);

            for (let key of valueMap.get(tmpValue)) {
              if (needUpdate.includes(key)) {
                valueMap.get(tmpValue).delete(key);
                const [_r, _c] = key.split(' ');
                table[_r][_c] = value;
              }
            }
            updateMap(valueMap, value, needUpdate, true);
            break;
          }
        } else {
          const [value1, value2] = args;

          const tmp = [];
          for (let pos of valueMap.get(value1)) {
            const [r, c] = pos.split(' ');
            table[r][c] = value2;
            tmp.push(pos);
          }

          updateMap(valueMap, value2, tmp, true);
          valueMap.delete(value1);
        }

        break;
      case 'MERGE':
        const [r1, c1, r2, c2] = args;
        const key1 = [r1, c1].join(' ');
        const key2 = [r2, c2].join(' ');
        const value1 = table[r1][c1];
        const value2 = table[r2][c2];
        if (value1 && value2) {
          valueMap.get(value2).delete(key2);
          table[r2][c2] = value1;
          updateMap(valueMap, value1, key2, false);
        } else if (value1) {
          table[r2][c2] = value1;
          updateMap(valueMap, value1, key2, false);
        } else if (value2) {
          table[r1][c1] = value2;
          updateMap(valueMap, value2, key1, false);
        }

        if (!linkMap.has(key1)) linkMap.set(key1, [r1, c1]);
        unionParent(linkMap, [r1, c1], [r2, c2]);
        console.log(linkMap);
        console.log(table);
        break;
      case 'UNMERGE':
        [r, c] = args;
        if (!linkMap.has(args.join(' '))) break;
        const target = getSameParent(linkMap, r, c);
        const tmpValue = table[r][c];

        for (let pos of valueMap.get(tmpValue)) {
          if (target.includes(pos) && pos !== [r, c].join(' ')) {
            valueMap.get(tmpValue).delete(pos);
            const [_r, _c] = pos.split(' ');
            delete table[_r][_c];
          }
        }
        for (let key of target) {
          linkMap.delete(key);
        }
        break;
      case 'PRINT':
        [r, c] = args;
        if (table[r][c]) answer.push(table[r][c]);
        else answer.push('EMPTY');

        break;
      default:
        break;
    }
  }

  return answer;
}

*/
