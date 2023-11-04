const cases = [
  ["cpp", "java", "python", "-"],
  ["backend", "frontend", "-"],
  ["junior", "senior", "-"],
  ["chicken", "pizza", "-"],
];

let lists = {};

let isVisited = new Array(4).fill(0);

function makeList(cur, depth, str) {
  if (cur === depth) {
    lists[str] = [];
  }

  for (let i = cur; i < depth; i++) {
    for (let j = 0; j < cases[i].length; j++) {
      if (!isVisited[i]) {
        let originStr = str;
        isVisited[i] = 1;
        makeList(cur + 1, depth, str + cases[i][j]);
        isVisited[i] = 0;
      }
    }
  }
}

function makeListByInfo(info) {
  for (let i = 0; i < info.length; i++) {
    const itemArr = info[i].split(" ");
    const score = +itemArr.pop();

    let tmpIsVisited = new Array(4).fill(0);

    function tmpBacktracking(cur, depth, str) {
      if (cur === depth) {
        lists[str].push(score);
      }

      for (let i = cur; i < depth; i++) {
        for (let j = 0; j < 2; j++) {
          if (!tmpIsVisited[i]) {
            tmpIsVisited[i] = 1;

            if (j === 0) {
              tmpBacktracking(cur + 1, depth, str + itemArr[i]);
            } else {
              tmpBacktracking(cur + 1, depth, str + "-");
            }

            tmpIsVisited[i] = 0;
          }
        }
      }
    }

    tmpBacktracking(0, 4, "");
  }
}

function sortLists() {
  for (let key in lists) {
    lists[key].sort((a, b) => a - b);
  }
}

function findPeopleCount(query) {
  const queryArr = query.replaceAll(" and ", " ").split(" ");
  const findScore = +queryArr.pop();
  const queryStr = queryArr.join("");

  if (!lists[queryStr]) {
    return 0;
  }

  let start = 0;
  let end = lists[queryStr].length - 1;

  while (start <= end) {
    let mid = Math.ceil((start + end) / 2);
    if (lists[queryStr][mid] < findScore) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return lists[queryStr].length - start;
}

function solution(info, query) {
  let answer = [];

  makeList(0, 4, "");
  makeListByInfo(info);
  sortLists();

  for (let i = 0; i < query.length; i++) {
    answer.push(findPeopleCount(query[i]));
  }

  return answer;
}
