// 1트 효율성 2개 시간초과 91.7점

function solution(phone_book) {
  phone_book = phone_book.sort();

  for (let i = 0; i < phone_book.length; i++) {
    const isDuplicate = phone_book.some((ele, index) => {
      if (index !== i && ele.substr(0, phone_book[i].length) === phone_book[i])
        return true;
      return false;
    });

    if (isDuplicate) {
      return false;
    }
  }

  return true;
}

// 2트 100점

function solution(phone_book) {
  phone_book = phone_book.sort();

  for (let i = 0; i < phone_book.length - 1; i++) {
    const isDuplicate =
      phone_book[i + 1].substr(0, phone_book[i].length) === phone_book[i];

    if (isDuplicate) {
      return false;
    }
  }

  return true;
}
