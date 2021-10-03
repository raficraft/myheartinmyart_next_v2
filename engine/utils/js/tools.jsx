export const debounce = (callback, delay) => {
  var timer;
  return function () {
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
};

/**
 *
 * @param {object} dataToSort //object array
 * @param {string} sortBy //object keys
 * @param {boolean} order //false order by desc , true order by asc
 */

export const sortBy = (dataToSort, sortBy, order) => {
  function compare(a, b) {
    if (a[sortBy] < b[sortBy]) {
      return !order[sortBy] ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return !order[sortBy] ? 1 : -1;
    }
    return 0;
  }
  dataToSort.sort(compare);
};

export const filterData = (array, search) => {
  let result = [];

  if (search) {
    for (const key in array) {
      if (Object.hasOwnProperty.call(array, key)) {
        const line = array[key];

        for (const keyEntries in line) {
          if (Object.hasOwnProperty.call(line, keyEntries)) {
            const entries = line[keyEntries];

            if (entries.includes(search) && !result.includes(line)) {
              result.push(line);
            }
          }
        }
      }
    }
  } else {
    result = array;
  }

  return result;
};


export const getDateByTimeStamp = (time, method) => {
  let MyDate = new Date(time);

  console.log(MyDate.getHours());
  console.log(MyDate.getMinutes());
  let MyDateString;

  MyDate.setDate(MyDate.getDate());

  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  console.log(MyDateString);

  switch (method) {
    case "date":
      return MyDateString;
      break;
    case "timer":
      return {
        hours: MyDate.getHours(),
        min: MyDate.getMinutes(),
      };
  }
};