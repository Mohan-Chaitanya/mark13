let inputdate = document.getElementById("birthday");
let submitBtn = document.getElementById("checkBtn");
let output = document.getElementById("message");
let pastDateOutput = document.getElementById("prevDate");
let futureDateOutput = document.getElementById("futureDate");

let submitHandler = (e) => {
  e.preventDefault();
  output.innerText = "";
  pastDateOutput.innerText = "";
  futureDateOutput.innerText = "";
  let userInput = inputdate.value;
  if (userInput != "") {
    var dateValues = userInput.split("-");
    var userDate = {
      day: Number(dateValues[2]),
      month: Number(dateValues[1]),
      year: Number(dateValues[0]),
    };

    let isPalindrome = datePalindromeCheck(userDate);
    // console.log(userDate);
    // console.log(dateVariations(userDate));
    if (isPalindrome) {
      output.innerText = "The given date is a palindrome😃";
    } else {
      let pastPalindrome = previousPalidromeDate(userDate);
      // console.log(pastPalindrome[1]);
      let pastDate = `Day:${pastPalindrome[1].day}-Month:${pastPalindrome[1].month}-Year:${pastPalindrome[1].year}`;
      output.innerText = "Not a palindrome😞";
      pastDateOutput.innerText = `Past palindrome is ${pastPalindrome[0]} days ago. ${pastDate}`;
      let futurePalindrome = nextPalindromeDate(userDate);

      let futureDate = `Day:${futurePalindrome[1].day}-Month:${futurePalindrome[1].month}-Year:${futurePalindrome[1].year}`;
      futureDateOutput.innerText = `Future palindrome is ${futurePalindrome[0]} days far. ${futureDate}`;
    }
  } else {
    output.innerText = "Give the input date";
  }
};

let stringReverse = (arg) => {
  let dateArray = arg.split("");
  let reverseArray = dateArray.reverse();
  let reverseString = reverseArray.join("");
  return reverseString;
};

let palindromeCheck = (str) => {
  let newStr = stringReverse(str);
  if (str === newStr) {
    return true;
  } else {
    return false;
  }
};

let stringConvert = (date) => {
  console.log(date);
  let newDate = { day: "", month: "", year: "" };

  if (date.day < 10) {
    newDate.day = "0" + date.day.toString();
  } else {
    newDate.day = date.day.toString();
  }
  if (date.month < 10) {
    newDate.month = "0" + date.month.toString();
  } else {
    newDate.month = date.month.toString();
  }
  newDate.year = date.year.toString();
  return newDate;
};

let dateVariations = (date) => {
  let newDay,
    newMonth,
    newYear = date.year.toString();
  newDay = date.day.toString();
  newMonth = date.month.toString();

  if (date.day < 10) {
    newDay = "0" + date.day.toString();
  } else {
    newDay = date.day.toString();
  }
  if (date.month < 10) {
    newMonth = "0" + date.month.toString();
  } else {
    newMonth = date.month.toString();
  }

  let DDMMYYYY = newDay + newMonth + newYear;
  let MMDDYYYY = newMonth + newDay + newYear;
  let YYYYMMDD = newYear + newMonth + newDay;
  let DDMMYY = newDay + newMonth + newYear.slice(-2);
  let MMDDYY = newMonth + newDay + newYear.slice(-2);
  let YYMMDD = newYear.slice(-2) + newMonth + newDay;

  return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD];
};

let datePalindromeCheck = (date) => {
  let palindromeStatus = false;
  var listOfDates = dateVariations(date);
  for (let i = 0; i < listOfDates.length; i++) {
    if (palindromeCheck(listOfDates[i])) {
      palindromeStatus = true;
      break;
    }
  }
  return palindromeStatus;
};

let isLeapYear = (year) => {
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 != 0)) {
    return true;
  } else {
    return false;
  }
};

let nextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //Increment the day by 1
  if (day > monthDays[month - 1]) {
    day = 1;
    month++;
  }
  //Checking if the year is a leapyear and month is february
  if (isLeapYear(year) && month === 2) {
    if (day > 29) {
      day = 1;
      month++;
    }
  }
  //Condition for changing the year for 31st December
  if (month > monthDays.length) {
    month = 1;
    year++;
  }
  return { day: day, month: month, year: year };
};

let previousDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (isLeapYear(year)) {
    if (month === 3 && day < 1) {
      day = 29;
      month--;
    }
  }
  if (day < 1 && month === 1) {
    day = 31;
    month = 12;
    year--;
  }
  if (day < 1) {
    day = monthDays[month - 2];
    // console.log(month);
    month--;
  }

  return { day: day, month: month, year: year };
};

let nextPalindromeDate = (date) => {
  let nextcount = 0;
  let incrementDate = nextDate(date);
  while (1) {
    nextcount++;
    let dateCheck = datePalindromeCheck(incrementDate);
    if (dateCheck) {
      break;
    }
    incrementDate = nextDate(incrementDate);
  }
  return [nextcount, incrementDate];
};

let previousPalidromeDate = (date) => {
  let prevcount = 0;
  let decrementDate = previousDate(date);
  while (1) {
    prevcount++;
    let dateCheck = datePalindromeCheck(decrementDate);
    if (dateCheck) {
      break;
    }
    decrementDate = previousDate(decrementDate);
  }
  return [prevcount, decrementDate];
};

let bday = {
  day: 2,
  month: 2,
  year: 2020,
};

// stringConvert(bday);
let datesArray = dateVariations(bday);
// console.log(datesArray);
//  console.log(datePalindromeCheck(bday));
submitBtn.addEventListener("click", submitHandler);

// console.log(datePalindromeCheck(datesArray));
