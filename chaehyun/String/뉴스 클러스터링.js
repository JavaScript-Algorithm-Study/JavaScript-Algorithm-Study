function solution(str1, str2) {
  var answer = 0;
  const arr1 = [];
  const arr2 = [];
  const map1 = new Map();
  const map2 = new Map();

  str1.split("").forEach((ele, index) => {
    if (index == str1.length - 1) return;
    if (ele.replace(/[^a-zA-Z]/g, "") == "") {
      return;
    }
    if (str1[index + 1].replace(/[^a-zA-Z]/g, "") == "") {
      return;
    }
    arr1.push((ele + str1[index + 1]).toUpperCase());
  });

  str2.split("").forEach((ele, index) => {
    if (index == str2.length - 1) return;
    if (ele.replace(/[^a-zA-Z]/g, "") == "") {
      return;
    }
    if (str2[index + 1].replace(/[^a-zA-Z]/g, "") == "") {
      return;
    }
    arr2.push((ele + str2[index + 1]).toUpperCase());
  });

  arr1.forEach((ele) => {
    map1.set(ele, map1.get(ele) ? map1.get(ele) + 1 : 1);
  });
  arr2.forEach((ele) => {
    map2.set(ele, map2.get(ele) ? map2.get(ele) + 1 : 1);
  });

  // let union = 0;
  // let intersection = 0;
  //
  // [...map1.keys()].forEach((ele) => {
  //   union += Math.max(map1.get(ele) ?? 0, map2.get(ele) ?? 0);
  // });
  // [...map2.keys()].forEach((ele) => {
  //   if (map1.has(ele) && map1.get(ele) > map2.get(ele)) {
  //     union = union + map1.get(ele) - map2.get(ele);
  //   }
  //   if (!map1.has(ele)) union += map2.get(ele);
  // });
  //
  // [...map1.keys()].forEach((ele) => {
  //   if (map1.has(ele) && map2.has(ele))
  //     intersection += Math.min(map1.get(ele), map2.get(ele));
  // });
  //
  // if (union === 0 && intersection === 0) {
  //   return 65536;
  // }
  // return Math.floor((intersection / union) * 65536);

  const set = new Set([...arr1, ...arr2]);
  let union = 0;
  let intersection = 0;

  set.forEach((item) => {
    const has1 = arr1.filter((x) => x === item).length;
    const has2 = arr2.filter((x) => x === item).length;
    union += Math.max(has1, has2);
    intersection += Math.min(has1, has2);
  });
  return union === 0 ? 65536 : Math.floor((intersection / union) * 65536);
}
