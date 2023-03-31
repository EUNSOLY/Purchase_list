const dateCon = document.querySelector(".dateList");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const weekDay = ["일", "월", "화", "수", "목", "금", "토"];
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let week = weekDay[today.getDay()];
let date = `${month}월${day}일(${week}) `;

dateCon.innerHTML = date;

nextBtn.addEventListener("click", function () {
  if (month === 12 && day === new Date(year, month, 0).getDate()) {
    year++;
    month = 1;
    day = 1;
  } else if (day === new Date(year, month, 0).getDate()) {
    month++;
    day = 1;
  } else {
    day++;
  }
  week = weekDay[new Date(`${year}-${month}-${day}`).getDay()];
  date = `${month}월${day}일(${week}) `;
  console.log(date);
  dateCon.innerHTML = date;
});

prevBtn.addEventListener("click", function () {
  //   const lastDay = new Date(year, month, 0).getDate();
  if (month === 1 && day === 1) {
    year--;
    month = 12;
    day = new Date(year, month, 0).getDate();
  } else if (day === 1) {
    month--;
    day = new Date(year, month, 0).getDate();
  } else {
    day--;
  }
  week = weekDay[new Date(`${year}-${month}-${day}`).getDay()];
  date = `${month}월${day}일(${week}) `;
  console.log(date);
  dateCon.innerHTML = date;
});
