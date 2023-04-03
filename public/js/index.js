const dateCon = document.querySelector(".dateList");
const list = document.querySelectorAll(".list2");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const weekDay = ["일", "월", "화", "수", "목", "금", "토"];
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let week = weekDay[today.getDay()];
let date = `${month}월${day}일(${week})`;
const $newDate = `${month}월${day}일(${week})`;
let test = dateCon.dataset.test;
dateCon.innerHTML = date;
const plusList = document.querySelector(".plusList");
// data속성찾기
dateCon.setAttribute("data-test", date);
function listFon() {
  list.forEach((item) => {
    const itemData = item.dataset.dayinfo;
    let itemDateMonth = itemData.slice(6, 7);
    let itemDateDay = itemData.slice(9, 10);
    let itemDayFull = `${itemDateMonth}월${itemDateDay}일`;
    let dateSli1 = date.slice(0, 4);
    item.classList.remove("on");
    if (itemDayFull === dateSli1) {
      item.classList.add("on");
    }
  });

  if ($newDate === date) {
    plusList.classList.add("on");
  } else {
    plusList.classList.remove("on");
  }
}

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
  date = `${month}월${day}일(${week})`;
  console.log(date);
  dateCon.innerHTML = date;
  dateCon.setAttribute("data-test", date);
  list.forEach((item) => {
    item.classList.remove("on");
  });

  listFon();
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
  date = `${month}월${day}일(${week})`;
  dateCon.setAttribute("data-test", date);

  console.log(date);
  dateCon.innerHTML = date;

  listFon();
});
listFon();
