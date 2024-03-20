const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(nSwitch, nStudent, initSwitches, students) {
  const [OFF, ON] = [0, 1];
  const [BOY, GIRL] = [1, 2];

  const N_ITEMS_PRINT = 20;

  const switches = createSwitches(initSwitches);
  const actionMap = {
    [BOY]: switches.toggleMultiple,
    [GIRL]: switches.toggleSymmetry,
  };

  students.forEach(([type, number]) => {
    actionMap[type](number);
  });

  return divideArray(N_ITEMS_PRINT, switches.getSwitches())
    .map((row) => row.join(' '))
    .join('\n');

  function divideArray(size, array) {
    const result = [];
    const length = Math.ceil(array.length / size);
    for (let index = 0; index < length; index += 1) {
      const start = index * size;
      const end = (index + 1) * size;
      result.push(array.slice(start, end));
    }
    return result;
  }

  function createSwitches(initSwitches) {
    const [OFF, ON] = [0, 1];
    const switches = [...initSwitches];

    function toggle(index) {
      switches[index] = switches[index] === OFF ? ON : OFF;
    }

    function toggleMultiple(number) {
      for (let index = number - 1; index < switches.length; index += number) {
        toggle(index);
      }
    }

    function toggleSymmetry(number) {
      const pivot = number - 1;
      let left = pivot - 1;
      let right = pivot + 1;

      toggle(pivot);
      while (left >= 0 && right < switches.length && switches[left] === switches[right]) {
        toggle(left);
        toggle(right);
        left -= 1;
        right += 1;
      }
    }

    function getSwitches() {
      return [...switches];
    }

    return { toggleMultiple, toggleSymmetry, getSwitches };
  }
}

const nSwitch = Number(input.shift());
const switches = input.shift().split(' ').map(Number);
const nStudent = Number(input.shift());
const students = input.map((line) => line.split(' ').map(Number));
console.log(solution(nSwitch, nStudent, switches, students));
