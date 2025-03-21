function toElement(element = HTMLElement.prototype) {
  return element;
}

function querySelectorAll(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}

function querySelector(selector: string) {
  return document.querySelector(selector) as HTMLMapElement;
}

function compareDateString(date1: string, date2: string) {
  let [year1, month1, day1] = date1.split('-');
  let [year2, month2, day2] = date2.split('-');
  if (year1 == year2 && month1 == month2 && day1 == day2) {
    return 0;
  }
  if (year1 < year2) {
    return -1;
  }
  if (month1 < month2) {
    return -1;
  }
  if (day1 < day2) {
    return -1;
  }
  return 1;
}

function dateToString(date: Date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1);
  if (month.length == 1) {
    month = 0 + month;
  }
  let day = String(date.getDate());
  if (day.length == 1) {
    day = 0 + day;
  }
  return `${year}-${month}-${day}`;
}

function maxDate(year: number, month: number) {
  switch (month) {
    case 2:
      return !isLeapYear(year) ? 28 : 29;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    default:
      return 30;
  }
}

function isLeapYear(year: number) {
  return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
}

function addMonthToDate(currentDate: Date, monthQuantity: number) {
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + monthQuantity;
  let date = currentDate.getDate();
  year += Math.floor(month / 12);
  month %= 12;
  let max = maxDate(year, month);
  if (date >= max) {
    date = max;
  }
  return new Date(year, month, date);
}

export {
  toElement,
  querySelector,
  querySelectorAll,
  compareDateString,
  dateToString,
  maxDate,
  addMonthToDate,
};
