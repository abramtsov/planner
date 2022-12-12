import { calendarDays, chooseView, chooseTabs, calendarAll, dateCurrent, dayArr, monthArr } from './var.js';
let linkMonth = document.querySelector('#linkMonth');
if (linkMonth) linkMonth.setAttribute('href', 'calendar.html#' + dateCurrent.getFullYear() + '-' + (dateCurrent.getMonth() + 1));


//отмена ссылок в футере
let tabsLink = document.querySelectorAll('.container__tabs li');
for (let i = 0; i < tabsLink.length; i++) {
    tabsLink[i].addEventListener('click', function (event) {
        let tabsLinkA = event.target;
        event.preventDefault();
    })
}
//отмена ссылок в шапке
let chooseLink = document.querySelectorAll('.calendar__choose');
for (let i = 0; i < chooseLink.length; i++) {
    chooseLink[i].addEventListener('click', function (event) {
        let chooseLinkA = event.target;
        // event.preventDefault();
    })
}
// вывод информации о дне при клике на него
function selectActiveDay() {
    let currentClass = this.className;
    for (let i = 0; i < calendarDays.length; i++) {
        calendarDays[i].classList.remove('day_active');
    }
    let dayInfoTrue = document.querySelector('.day__more');
    if (dayInfoTrue) { dayInfoTrue.remove(); }
    if (currentClass.indexOf('day_active') < 0) {
        let dayInfo = document.createElement("div");
        dayInfo.classList.add('day__more');
        dayInfo.classList.add('more');
        dayInfo.innerHTML =
            `<div id="more__body" class="more__body">
            <div class="more__title">
                <img src="img/more_icon.svg" alt="More Icon">
                <p class="more__title-text">
                You are on track for promotion, March 2021. -- with <strong>Craig Stanton</strong>
                </p>
                <div class="more__title-user-count">
                <span>+5</span>
                </div>
                <div class="more__title-user-photo">
                <img width="24px" height="24px" src="img/user_photo1.svg" alt="User Photo"/>
                </div>
            </div>
            <div class="more__text">
            <p>
            Learning business strategy shows you are thinking in broader terms and can speak the leader’s language. After you’ve observed the needs and challenges of the organization...
            </p>
            </div>
            <div class="more__statistic">
            <div>
                <img src="img/complete.svg" alt="Complete"/>
                <p>Complete <br/>self-evaluation
                </p>
            </div>
            <div>
                <img src="img/kpi.svg" alt="KPI"/>
                <p>Review Current <br/>KPI Tracking
                </p>
            </div>
            </div>
        </div>`;
        // если это правые столбцы
        if (this.offsetLeft > 500) {
            dayInfo.style.left = this.offsetLeft - 330 + "px";
        }
        //если это левые столбцы
        else {
            dayInfo.style.left = this.offsetLeft + 148 + "px";
        }
        //если это верхний ряд
        if (this.offsetTop == 50) {
            dayInfo.style.top = this.offsetTop - 2 + "px";
        }
        //если это нижний ряд
        else if (this.offsetTop == 430) {
            dayInfo.style.top = this.offsetTop - 132 + "px";
        }
        //если это середина
        else {
            dayInfo.style.top = this.offsetTop - 68 + "px";
        }
        calendarAll.appendChild(dayInfo);
        this.classList.add('day_active');
    }

}
// выбор вида отображения
function chooseViewChange() {
    for (i = 0; i < chooseView.length; i++) {
        chooseView[i].classList.remove('calendar__choose_active');
    }
    this.classList.toggle('calendar__choose_active');
}
// выбор вкладки в футере
function chooseTabsChange() {
    for (let i = 0; i < chooseTabs.length; i++) {
        chooseTabs[i].classList.remove('container__tabs-li_active');
    }
    this.classList.toggle('container__tabs-li_active');
}



for (let i = 0; i < chooseView.length; i++) {
    chooseView[i].addEventListener('click', chooseViewChange);
}

for (let i = 0; i < chooseTabs.length; i++) {
    chooseTabs[i].addEventListener('click', chooseTabsChange);
}




//функция перелистывания месяцев
export function monthScroll() {
    let blockMonth = document.querySelector('.calendar__month-scroll .calendar__scroll-container');
    if (blockMonth) {
        if (!location.hash) location.hash = dateCurrent.getFullYear() + '-' + (dateCurrent.getMonth() + 1)
        let dateHash = location.hash.substring(1);

        let dateHashY = +dateHash.substring(0, 4);
        let dateHashM = +dateHash.substring(5);
        dateCurrent.setFullYear(dateHashY);
        dateCurrent.setMonth(dateHashM - 1);
        let monthBtnLeft = document.createElement('button');
        let monthBtnRight = document.createElement('button');
        let monthName = document.createElement('p');
        monthBtnLeft.classList.add('calendar__arrow-left');
        monthBtnRight.classList.add('calendar__arrow-right');
        blockMonth.appendChild(monthBtnLeft);
        blockMonth.appendChild(monthName);
        blockMonth.appendChild(monthBtnRight);
        dateHashY = +dateHash.substring(0, 4);
        dateHashM = +dateHash.substring(5);
        dateCurrent.setFullYear(dateHashY);
        dateCurrent.setMonth(dateHashM - 1);
        monthBtnRight.onclick = () => {
            let dayInfoTrue = document.querySelector('.day__more');
            if (dayInfoTrue) dayInfoTrue.remove();
            let monthHash = +location.hash.substring(6);
            let yearHash = +location.hash.substring(1, 5);
            if (monthHash == 12) {
                monthHash = 0;
                yearHash += 1;
            }
            let tempHash = yearHash + '-' + (monthHash + 1);
            location.hash = tempHash;
            monthHash += 1;
            dateCurrent.setFullYear(yearHash);
            dateCurrent.setMonth(monthHash - 1);
            monthName.innerHTML = monthArr[monthHash - 1][0];
            if (monthHash === 1) {
                monthName.classList.add('next-year');
                setTimeout(e => {
                    monthName.classList.remove('next-year');
                }, 950);
            }
            dayList(dateCurrent);
        };
        monthBtnLeft.onclick = () => {
            let dayInfoTrue = document.querySelector('.day__more');
            if (dayInfoTrue) dayInfoTrue.remove();
            let monthHash = +location.hash.substring(6);
            let yearHash = +location.hash.substring(1, 5);
            if (monthHash == 1) {
                monthHash = 13;
                yearHash -= 1;
            }
            let tempHash = yearHash + '-' + (monthHash - 1);
            location.hash = tempHash;
            monthHash -= 1;
            dateCurrent.setFullYear(yearHash);
            dateCurrent.setMonth(monthHash - 1);
            monthName.innerHTML = monthArr[monthHash - 1][0];
            if (monthHash === 12) {
                monthName.classList.add('prev-year');
                setTimeout(e => {
                    monthName.classList.remove('prev-year');
                }, 950);
            }
            dateCurrent.setMonth(monthHash - 1);
            dayList(dateCurrent);
        };
        monthName.innerHTML = monthArr[dateCurrent.getMonth()][0];
    }
    else return;
}
export function yearScroll() {
    let blockYear = document.querySelector('.calendar__year-scroll .calendar__scroll-container');
    if (blockYear) {
        let yearBtnLeft = document.createElement('button');
        let yearBtnRight = document.createElement('button');
        let yearCurrent = document.createElement('p');
        yearBtnLeft.classList.add('calendar__arrow-left');
        yearBtnRight.classList.add('calendar__arrow-right');
        yearCurrent.innerHTML = dateCurrent.getFullYear();
        blockYear.appendChild(yearBtnLeft);
        blockYear.appendChild(yearCurrent);
        blockYear.appendChild(yearBtnRight);
        yearBtnLeft.onclick = function () {
            // dateCurrent.setFullYear(dateCurrent.getFullYear() - 1);
            yearCurrent.innerHTML = +yearCurrent.innerHTML - 1;
            document.querySelector('.calendar__month-list').innerHTML = "";
            monthList();
        };
        yearBtnRight.onclick = function () {
            // dateCurrent.setFullYear(dateCurrent.getFullYear() + 1);
            yearCurrent.innerHTML = +yearCurrent.innerHTML + 1;
            document.querySelector('.calendar__month-list').innerHTML = "";
            monthList();
        };
    }
    else return;

}
//функция вывода сегодняшнего числа
export function dayToday(dateCurrent) {
    dateCurrent = new Date();
    let dayTodayBtn = document.querySelector('.calendar__day-today div div');
    if (!dayTodayBtn) return;
    let dayTodayParag = document.createElement('p');
    dayTodayParag.innerHTML = "Date";
    dayTodayBtn.appendChild(dayTodayParag);
    dayTodayParag.innerText = dayArr[dateCurrent.getDay()][0] + ', ' + monthArr[dateCurrent.getMonth()][0] + ' ' + dateCurrent.getDate() + ', ' + dateCurrent.getFullYear();
}
//функция вывода месяцев в году
export function monthList() {
    let monthListContainer = document.querySelector('.calendar__month-list');
    if (monthListContainer !== null) monthListContainer.innerHTML = "";
    if (monthListContainer) {
        for (let i = 0; i < 12; i++) {
            let monthListItem = document.createElement('div');
            monthListItem.classList.add('month');
            let year;
            if (document.querySelector('.calendar__scroll-container p')) year = document.querySelector('.calendar__scroll-container p').innerText;
            if (document.querySelector('.calendar__scroll-container input')) year = document.querySelector('.calendar__scroll-container input').value;
            if (dateCurrent.getFullYear() + "-" + dateCurrent.getMonth() === year + "-" + i) {
                monthListItem.classList.add('month_current');
            }
            let monthListItemName = document.createElement('span');
            monthListContainer.appendChild(monthListItem).appendChild(monthListItemName);
            monthListItemName.innerHTML = monthArr[i][0];
            monthListItem.dataset.month = i + 1;
            monthListItem.addEventListener('click', () => {
                location.href = 'calendar.html' + '#' + year + '-' + monthListItem.dataset.month;
            });
        }
    }
    else return;
}
export function dayList() {
    let tempHash = document.location.hash;

    let dayListContainer = document.querySelector('.calendar__days-list');
    if (!dayListContainer) return;

    let daysOfCurrentMonth, daysOfLastMonth, daysOfNextMonth, firstDayOfCurrentMonth;

    daysOfCurrentMonth = new Date(+tempHash.slice(1).split("-")[0], +tempHash.slice(1).split("-")[1] - 1 + 1, 1) - new Date(+tempHash.slice(1).split("-")[0], +tempHash.slice(1).split("-")[1] - 1, 1);
    daysOfLastMonth = new Date(+tempHash.slice(1).split("-")[0], +tempHash.slice(1).split("-")[1] - 1, 1) - new Date(+tempHash.slice(1).split("-")[0], +tempHash.slice(1).split("-")[1] - 1 - 1, 1);
    daysOfNextMonth = new Date(+tempHash.slice(1).split("-")[0], +tempHash.slice(1).split("-")[1] - 1 + 2, 1) - new Date(+tempHash.slice(1).split("-")[0], +tempHash.slice(1).split("-")[1] - 1 + 1, 1);
    firstDayOfCurrentMonth = new Date(+tempHash.slice(1).split("-")[0], +tempHash.slice(1).split("-")[1] - 1, 1);

    dayListContainer.innerHTML = "";
    daysOfCurrentMonth = Math.ceil(daysOfCurrentMonth / 1000 / 3600 / 24);
    daysOfLastMonth = Math.ceil(daysOfLastMonth / 1000 / 3600 / 24);
    daysOfNextMonth = Math.ceil(daysOfNextMonth / 1000 / 3600 / 24);
    let calendarDaysList = [];
    let dayInCalendar = [0, 0, 0, 0];
    for (let i = 0; i <= 6; i++) {
        if (i == firstDayOfCurrentMonth.getDay()) {
            for (let j = 1; j <= daysOfCurrentMonth; j++) {

                dayInCalendar = [j, 0, 1, 0];
                calendarDaysList.push(dayInCalendar);
            }
            break
        }
        dayInCalendar = [daysOfLastMonth - i, 1, 0, 0]
        calendarDaysList.unshift(dayInCalendar);
    }
    let daysOfNextMonthInCalendar = 41 - calendarDaysList.length;
    for (let k = 1; k <= daysOfNextMonthInCalendar + 1; k++) {
        dayInCalendar = [k, 0, 0, 1];
        calendarDaysList.push(dayInCalendar);
    }
    // console.log(calendarDaysList)
    //вывод списка дней в календарь
    let dateCurrentTemp = new Date;
    for (let i = 0; i <= 41; i++) {
        let dayDiv = document.createElement('div');
        let dayDivNum = document.createElement('span');
        dayDiv.classList.add('day');
        if (calendarDaysList[i][1] == 1) dayDiv.classList.add('day__month_previous');
        if (calendarDaysList[i][2] == 1) {
            // console.log(calendarDaysList[i][0] + "." + (dateCurrent.getMonth() + 1))
            // console.log(dateCurrentTemp.getDate() + "." + (dateCurrentTemp.getMonth() + 1))
            dayDiv.classList.add('day__month_current');
            if (calendarDaysList[i][0] + "." + (+tempHash.slice(1).split("-")[1] - 1 + 1) + "." + +tempHash.slice(1).split("-")[0] === dateCurrentTemp.getDate() + "." + (dateCurrentTemp.getMonth() + 1) + "." + dateCurrentTemp.getFullYear()) dayDiv.classList.add('day_current');
        }
        if (calendarDaysList[i][3] == 1) dayDiv.classList.add('day__month_next');
        dayDivNum.innerHTML = calendarDaysList[i][0];
        dayDiv.appendChild(dayDivNum);
        dayListContainer.appendChild(dayDiv);
    }
    for (let i = 0; i < calendarDays.length; i++) {
        calendarDays[i].addEventListener('click', selectActiveDay);
    }
}
export function dayListName() {
    let dayListNameContainer = document.querySelector('.calendar__days-title');
    if (dayListNameContainer) {

        for (let i = 0; i < 7; i++) {
            let dayListNameItem = document.createElement('div');
            dayListNameItem.classList.add('day', 'day__name');
            dayListNameContainer.appendChild(dayListNameItem);
            dayListNameItem.innerText = dayArr[i][1];
        }
    }
    else return;
}


function completedTask() {

}




