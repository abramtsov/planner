let calendarDays = document.getElementsByClassName('day__month_current');
let chooseView = document.getElementsByClassName('calendar__choose');
let chooseTabs = document.getElementsByClassName('container__tabs-li');
let calendarAll = document.querySelector('.calendar__days');
let dateCurrent = new Date();

let linkMonth = document.querySelector('#linkMonth');
if (linkMonth) linkMonth.setAttribute('href', 'calendar.html#' + dateCurrent.getFullYear() + '-' + (dateCurrent.getMonth() + 1));
let dayArr = [
    ['Sunday', 'Sun'],
    ['Monday', 'Mon'],
    ['Tuesday', 'Tue'],
    ['Wednesday', 'Wed'],
    ['Thursday', 'Thu'],
    ['Friday', 'Fri'],
    ['Saturday', 'Sat'],
]
let monthArr = [
    ['January', 'Jan'],
    ['February', 'Feb'],
    ['March', 'Mar'],
    ['April', 'Apr'],
    ['May', 'May'],
    ['June', 'Jun'],
    ['July', 'Jul'],
    ['August', 'Aug'],
    ['September', 'Sep'],
    ['October', 'Oct'],
    ['November', 'Nov'],
    ['December', 'Dec']
]
let taskOnholdLength = 0, taskCompletedLength = 0;
//отмена ссылок в футере
let tabsLink = document.querySelectorAll('.container__tabs li');
for (i = 0; i < tabsLink.length; i++) {
    tabsLink[i].addEventListener('click', function (event) {
        let tabsLinkA = event.target;
        event.preventDefault();
    })
}
//отмена ссылок в шапке
let chooseLink = document.querySelectorAll('.calendar__choose');
for (i = 0; i < chooseLink.length; i++) {
    chooseLink[i].addEventListener('click', function (event) {
        let chooseLinkA = event.target;
        // event.preventDefault();
    })
}
// вывод информации о дне при клике на него
function selectActiveDay() {
    let currentClass = this.className;
    for (i = 0; i < calendarDays.length; i++) {
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
    for (i = 0; i < chooseTabs.length; i++) {
        chooseTabs[i].classList.remove('container__tabs-li_active');
    }
    this.classList.toggle('container__tabs-li_active');
}



for (i = 0; i < chooseView.length; i++) {
    chooseView[i].addEventListener('click', chooseViewChange);
}

for (i = 0; i < chooseTabs.length; i++) {
    chooseTabs[i].addEventListener('click', chooseTabsChange);
}
//отображение дополнительного меню в списке дел
function taskMore() {
    let container = document.querySelector('.container__task');
    if (!container) return;
    container.addEventListener('click', function (e) {
        if (e.target.className == 'tasks__more') {
            let list;
            if (e.originalTarget.parentNode.parentNode.parentNode.classList.contains('tasks_onhold')) list = JSON.parse(localStorage.getItem('Onhold')).reverse();
            if (e.originalTarget.parentNode.parentNode.parentNode.classList.contains('tasks_completed')) return;
            if (e.target.spellcheck == true) {
                if (document.querySelector('.addtask__additionally')) document.querySelector('.addtask__additionally').remove();
                e.target.spellcheck = false;
            }
            else {
                if (document.querySelector('.addtask__additionally')) document.querySelector('.addtask__additionally').remove();
                let btnTask = document.querySelectorAll('.container__task .tasks__more');
                for (i = 0; i < btnTask.length; i++) {
                    btnTask[i].spellcheck = false;
                }
                e.target.spellcheck = true;
                btnDiv = document.createElement('div');
                taskMoreInf(btnDiv, list[e.target.dataset.listId]);
                btnDiv.classList.add('addtask__additionally');
                e.target.parentNode.appendChild(btnDiv);
            }
        }
    });
}
//Функция формирования данных о задании
function taskMoreInf(div, id) {
    let divForm = document.createElement('form');
    let btnStatus = document.createElement('select');
    btnStatus.classList.add('addtask__status');
    //
    let btnStatusOption = document.createElement('option');
    btnStatusOption.innerHTML = 'Pending';
    btnStatusOption.value = '0';
    if (+id.status == +btnStatusOption.value) btnStatusOption.selected = true;
    btnStatus.append(btnStatusOption);
    //
    btnStatusOption = document.createElement('option');
    btnStatusOption.innerHTML = 'In Progress';
    btnStatusOption.value = '1';
    if (+id.status == +btnStatusOption.value) btnStatusOption.selected = true;
    btnStatus.append(btnStatusOption);
    //
    btnStatusOption = document.createElement('option');
    btnStatusOption.innerHTML = 'Canceled';
    btnStatusOption.value = '2';
    if (+id.status == +btnStatusOption.value) btnStatusOption.selected = true;
    btnStatus.append(btnStatusOption);
    //
    btnStatusOption = document.createElement('option');
    btnStatusOption.innerHTML = 'Completed';
    btnStatusOption.value = '3';
    if (+id.status == +btnStatusOption.value) btnStatusOption.selected = true;
    btnStatus.append(btnStatusOption);
    divForm.append(btnStatus);
    //


    let btnDifficult = document.createElement('select');
    btnDifficult.classList.add('addtask__status');
    //
    let btnDifficultOption = document.createElement('option');
    btnDifficultOption.innerHTML = 'Minor';
    btnDifficultOption.value = '0';
    if (+id.difficulty == +btnDifficultOption.value) btnDifficultOption.selected = true;
    btnDifficult.append(btnDifficultOption);
    //
    btnDifficultOption = document.createElement('option');
    btnDifficultOption.innerHTML = 'Normal';
    btnDifficultOption.value = '1';
    if (+id.difficulty == +btnDifficultOption.value) btnDifficultOption.selected = true;
    btnDifficult.append(btnDifficultOption);
    //
    btnDifficultOption = document.createElement('option');
    btnDifficultOption.innerHTML = 'Critical';
    btnDifficultOption.value = '2';
    if (+id.difficulty == +btnDifficultOption.value) btnDifficultOption.selected = true;
    btnDifficult.append(btnDifficultOption);
    //
    let btnDivSend = document.createElement('button');
    btnDivSend.classList.add('addtask__submit');
    btnDivSend.innerHTML = 'Apply';
    divForm.append(btnStatus);
    divForm.append(btnDifficult);
    divForm.append(btnDivSend);
    div.appendChild(divForm);
    btnDivSend.addEventListener('click', (e) => {
        e.preventDefault();
        taskMoreChange(btnDivSend.parentNode.parentNode.previousElementSibling.dataset.listId, btnStatus.value, btnDifficult.value);
    })

        ;
}
function taskMoreChange(listId, status, difficulty) {
    listId = +listId;
    status = +status;
    let onholdList = JSON.parse(localStorage.getItem('Onhold')).reverse();

    onholdList[listId].status = status;
    onholdList[listId].difficulty = difficulty;
    if (onholdList[listId].status === 2 || onholdList[listId].status === 3) {
        let completed = JSON.parse(localStorage.getItem('Completed'));
        if (!completed) completed = [];
        localStorage.removeItem('Completed');
        onholdList[listId].id = completed.length;
        completed.unshift(onholdList[listId]);
        onholdList.splice(listId, 1);
        onholdList = onholdList.map(function (key, index) {
            let task = {};
            task.status = key.status;
            task.people = key.people;
            task.difficulty = key.difficulty;
            task.id = index;
            task.text = key.text;
            return task;
        });
        localStorage.setItem('Onhold', JSON.stringify(onholdList.reverse()));
        localStorage.setItem('Completed', JSON.stringify(completed));
        document.querySelector('.tasks_completed ul').innerHTML = '';
        let once = 1;
        listCompleted(once);
    }
    else {
        localStorage.removeItem('Onhold');
        localStorage.setItem('Onhold', JSON.stringify(onholdList.reverse()));
    }
    document.querySelector('.tasks_onhold ul').innerHTML = '';
    listOnhold();
    let taskOnholdLength = onholdList.length;
    let completedList = JSON.parse(localStorage.getItem('Completed')).reverse();
    let taskCompletedLength = completedList.length;
    if (completedList == null) taskCompletedLength = 0;
    howMuchTasks(taskOnholdLength, taskCompletedLength);
}
//функция перелистывания месяцев
function monthScroll() {
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
            tempHash = yearHash + '-' + (monthHash + 1);
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
            tempHash = yearHash + '-' + (monthHash - 1);
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
function yearScroll() {
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
            dateCurrent.setFullYear(dateCurrent.getFullYear() - 1);
            yearCurrent.innerHTML = dateCurrent.getFullYear();
        };
        yearBtnRight.onclick = function () {
            dateCurrent.setFullYear(dateCurrent.getFullYear() + 1);
            yearCurrent.innerHTML = dateCurrent.getFullYear();
        };
    }
    else return;

}
//функция вывода сегодняшнего числа
function dayToday(dateCurrent) {
    dateCurrent = new Date();
    let dayTodayBtn = document.querySelector('.calendar__day-today div div');
    if (!dayTodayBtn) return;
    let dayTodayParag = document.createElement('p');
    dayTodayParag.innerHTML = "Date";
    dayTodayBtn.appendChild(dayTodayParag);
    dayTodayParag.innerText = dayArr[dateCurrent.getDay()][0] + ', ' + monthArr[dateCurrent.getMonth()][0] + ' ' + dateCurrent.getDate() + ', ' + dateCurrent.getFullYear();
}
//функция вывода месяцев в году
function monthList() {
    let monthListContainer = document.querySelector('.calendar__month-list');
    if (monthListContainer) {
        for (i = 0; i < 12; i++) {
            let monthListItem = document.createElement('div');
            monthListItem.classList.add('month');
            if (dateCurrent.getMonth() == i) {
                monthListItem.classList.add('month_current');
            }
            monthListItemName = document.createElement('span');
            monthListContainer.appendChild(monthListItem).appendChild(monthListItemName);
            monthListItemName.innerHTML = monthArr[i][0];
            monthListItem.dataset.month = i + 1;
            monthListItem.addEventListener('click', () => {
                location.href = 'calendar.html' + '#' + dateCurrent.getFullYear() + '-' + monthListItem.dataset.month;
            });
        }
    }
    else return;
}
function dayList() {
    let dayListContainer = document.querySelector('.calendar__days-list');
    if (!dayListContainer) return;

    let daysOfCurrentMonth, daysOfLastMonth, daysOfNextMonth, firstDayOfCurrentMonth;

    daysOfCurrentMonth = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth() + 1, 1) - new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), 1);
    daysOfLastMonth = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), 1) - new Date(dateCurrent.getFullYear(), dateCurrent.getMonth() - 1, 1);
    daysOfNextMonth = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth() + 2, 1) - new Date(dateCurrent.getFullYear(), dateCurrent.getMonth() + 1, 1);
    firstDayOfCurrentMonth = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), 1);

    dayListContainer.innerHTML = "";
    daysOfCurrentMonth = Math.ceil(daysOfCurrentMonth / 1000 / 3600 / 24);
    daysOfLastMonth = Math.ceil(daysOfLastMonth / 1000 / 3600 / 24);
    daysOfNextMonth = Math.ceil(daysOfNextMonth / 1000 / 3600 / 24);
    let calendarDaysList = [];
    let dayInCalendar = [0, 0, 0, 0];
    for (i = 0; i <= 6; i++) {
        if (i == firstDayOfCurrentMonth.getDay()) {
            for (j = 1; j <= daysOfCurrentMonth; j++) {

                dayInCalendar = [j, 0, 1, 0];
                calendarDaysList.push(dayInCalendar);
            }
            break
        }
        dayInCalendar = [daysOfLastMonth - i, 1, 0, 0]
        calendarDaysList.unshift(dayInCalendar);
    }
    let daysOfNextMonthInCalendar = 41 - calendarDaysList.length;
    for (k = 1; k <= daysOfNextMonthInCalendar + 1; k++) {
        dayInCalendar = [k, 0, 0, 1];
        calendarDaysList.push(dayInCalendar);
    }
    //вывод списка дней в календарь
    for (i = 0; i <= 41; i++) {
        let dayDiv = document.createElement('div');
        let dayDivNum = document.createElement('span');
        dayDiv.classList.add('day');
        if (calendarDaysList[i][1] == 1) dayDiv.classList.add('day__month_previous');
        if (calendarDaysList[i][2] == 1) dayDiv.classList.add('day__month_current');
        if (calendarDaysList[i][3] == 1) dayDiv.classList.add('day__month_next');
        dayDivNum.innerHTML = calendarDaysList[i][0];
        dayDiv.appendChild(dayDivNum);
        dayListContainer.appendChild(dayDiv);
    }
    for (i = 0; i < calendarDays.length; i++) {
        calendarDays[i].addEventListener('click', selectActiveDay);
    }
}
function dayListName() {
    let dayListNameContainer = document.querySelector('.calendar__days-title');
    if (dayListNameContainer) {

        for (i = 0; i < 7; i++) {
            let dayListNameItem = document.createElement('div');
            dayListNameItem.classList.add('day', 'day__name');
            dayListNameContainer.appendChild(dayListNameItem);
            dayListNameItem.innerText = dayArr[i][1];
        }
    }
    else return;
}
function taskList() {
    let taskListContainer = document.querySelector('.container__tasks'),
        taskListOnholdMem = localStorage.getItem(taskOnhold),
        taskListCompletedMem = localStorage.getItem(taskCompleted),
        taskListOnhold,
        taskListCompleted;
    if (taskListOnholdMem) {
        taskListOnhold = document.createComment('div');
        taskListOnhold.classList.add('tasks');
        taskListOnhold.classList.add('taskstasks_onhold');
    }
    if (taskListCompletedMem) {
        taskListCompleted = document.createComment('div');
        taskListCompleted.classList.add('tasks');
        taskListCompleted.classList.add('taskstasks_completed');

    }
}
function addTask(taskText, taskDifficulty) {
    let tasks = localStorage.getItem('Onhold');
    tasks == null ? tasks = [] : tasks = JSON.parse(tasks);
    let newTask = {
        status: 0,
        people: null,
        id: 0
    };
    newTask.text = taskText;
    newTask.difficulty = taskDifficulty;
    if (localStorage.getItem('Onhold')) newTask.id = JSON.parse(localStorage.getItem('Onhold')).length;
    tasks.unshift(newTask);
    localStorage.setItem('Onhold', JSON.stringify(tasks));
    let once = 1;
    listOnhold(once);
}
function completedTask() {

}
//функция формы добавления задания
function showAddTask() {
    let addButton = document.querySelector('#addtask');
    if (!addButton) return;
    addButton.onclick = () => {
        let addTaskContainer = document.createElement('div'),
            addTaskBody = document.createElement('div'),
            addTaskTitle = document.createElement('h1'),
            addTaskForm = document.createElement('form'),
            addTaskText = document.createElement('input'),
            addTaskDifficulty = document.createElement('select'),
            addTaskDifficultyDefault = document.createElement('option'),
            addTaskDifficultyCritical = document.createElement('option'),
            addTaskDifficultyMinor = document.createElement('option'),
            addTaskDifficultyNormal = document.createElement('option'),
            addTaskSubmit = document.createElement('input');
        addTaskContainer.classList.add('addtask__container');
        document.body.appendChild(addTaskContainer);
        addTaskBody.classList.add('addtask__body');
        addTaskContainer.appendChild(addTaskBody);
        addTaskTitle.innerText = 'Add new task';
        addTaskTitle.classList.add('addtask__title');
        addTaskBody.appendChild(addTaskTitle);
        addTaskForm.classList.add('addtask__form');
        addTaskBody.appendChild(addTaskForm);
        addTaskText.type = 'text';
        addTaskText.placeholder = 'Enter your task';
        addTaskText.classList.add('addtask__text');
        addTaskSubmit.classList.add('addtask__submit');
        addTaskSubmit.type = 'submit';
        addTaskSubmit.value = 'Add';
        addTaskDifficulty.classList.add('addtask__status');
        addTaskDifficulty.name = 'addTaskDifficulty';
        addTaskDifficultyDefault.defaultSelected = true;
        addTaskDifficultyDefault.disabled = true;
        addTaskDifficultyDefault.innerText = 'Choose Difficulty';
        addTaskDifficultyMinor.innerText = 'Minor';
        addTaskDifficultyMinor.value = '0';
        addTaskDifficultyNormal.innerText = 'Normal';
        addTaskDifficultyNormal.value = '1';
        addTaskDifficultyCritical.innerText = 'Critical';
        addTaskDifficultyCritical.value = '2';
        addTaskDifficulty.appendChild(addTaskDifficultyDefault);
        addTaskDifficulty.appendChild(addTaskDifficultyMinor);
        addTaskDifficulty.appendChild(addTaskDifficultyNormal);
        addTaskDifficulty.appendChild(addTaskDifficultyCritical);
        addTaskForm.appendChild(addTaskText);
        addTaskForm.appendChild(addTaskDifficulty);
        addTaskForm.appendChild(addTaskSubmit);
        addTaskSubmit.onclick = (e) => {
            e.preventDefault();
            addTask(addTaskText.value, addTaskDifficulty.value);
            addTaskContainer.remove();
        }
    }
}
//функция отображения активных тасков
function listOnhold(once) {
    let taskOnhold = JSON.parse(localStorage.getItem('Onhold'));
    if (!taskOnhold) return;
    if (taskOnhold.length == 0) { localStorage.removeItem('Onhold'); document.querySelector('.tasks_onhold h2').remove(); return }
    taskOnholdLength = taskOnhold.length;
    let templateOnhold = document.querySelector('#temp__tasks__onhold');
    let ulOnhold = document.querySelector('.tasks_onhold ul');
    let titleOnhold = document.createElement('h2');
    titleOnhold.innerHTML = 'On Hold';
    if (!document.querySelector('.tasks')) return;
    if (!document.querySelector('.tasks_onhold h2')) ulOnhold.before(titleOnhold);
    let liTitleOnhold = templateOnhold.content.querySelector('.tasks__text');
    let liImportanceOnhold = templateOnhold.content.querySelector('.tasks__importance');
    let liStatusOnhold = templateOnhold.content.querySelector('.tasks__status');
    let btnOnhold = templateOnhold.content.querySelector('.tasks__more');
    if (once) {

        liTitleOnhold.innerText = taskOnhold[0].text;
        liImportanceOnhold.className = '';
        btnOnhold.setAttribute('data-list', 'onhold');
        btnOnhold.setAttribute('data-list-id', taskOnhold[0].id);
        liImportanceOnhold.classList.add('tasks__importance');
        liStatusOnhold.className = '';
        liStatusOnhold.classList.add('tasks__status');
        switch (taskOnhold[0].difficulty) {
            case '0':
                liImportanceOnhold.classList.add('tasks__importance_minor');
                liImportanceOnhold.innerText = 'Minor';
                break;
            case '1':
                liImportanceOnhold.classList.add('tasks__importance_normal');
                liImportanceOnhold.innerText = 'Normal';
                break;
            case '2':
                liImportanceOnhold.classList.add('tasks__importance_critical');
                liImportanceOnhold.innerText = 'Critical';
                break;
            default:
                break;
        }
        switch (taskOnhold[0].status) {
            case 0:
                liStatusOnhold.innerHTML = 'Pending';
                liStatusOnhold.classList.add('tasks__status_pending');
                break;
            case 1:
                liStatusOnhold.innerHTML = 'In Progress';
                liStatusOnhold.classList.add('tasks__status_inprogress');
                break;
            case 2:
                liStatusOnhold.innerHTML = 'Canceled';
                liStatusOnhold.classList.add('tasks__status_canceled');
                break;
            case 3:
                liStatusOnhold.innerHTML = 'Completed';
                liStatusOnhold.classList.add('tasks__status_completed');
                break;
            default:
                break;
        }
        liOnhold = templateOnhold.content.cloneNode(true);
        ulOnhold.prepend(liOnhold);
        ulOnhold.children[0].classList.add('li__fade');
        setTimeout(() => {
            ulOnhold.children[0].classList.remove('li__fade');
        }, 500);

    }
    else {
        for (i = 0; i < taskOnhold.length; i++) {
            btnOnhold.setAttribute('data-list-id', taskOnhold[i].id);
            btnOnhold.setAttribute('data-list', 'onhold');
            liTitleOnhold.innerText = taskOnhold[i].text;
            liImportanceOnhold.className = '';
            liImportanceOnhold.classList.add('tasks__importance');
            liStatusOnhold.className = '';
            liStatusOnhold.classList.add('tasks__status');
            switch (taskOnhold[i].difficulty) {
                case '0':
                    liImportanceOnhold.innerHTML = 'Minor';
                    liImportanceOnhold.classList.add('tasks__importance_minor');
                    break;
                case '1':
                    liImportanceOnhold.innerHTML = 'Normal';
                    liImportanceOnhold.classList.add('tasks__importance_normal');
                    break;
                case '2':
                    liImportanceOnhold.innerHTML = 'Critical';
                    liImportanceOnhold.classList.add('tasks__importance_critical');
                    break;
                default:
                    break;
            }
            switch (taskOnhold[i].status) {
                case 0:
                    liStatusOnhold.innerHTML = 'Pending';
                    liStatusOnhold.classList.add('tasks__status_pending');
                    break;
                case 1:
                    liStatusOnhold.innerHTML = 'In Progress';
                    liStatusOnhold.classList.add('tasks__status_inprogress');
                    break;
                case 2:
                    liStatusOnhold.innerHTML = 'Canceled';
                    liStatusOnhold.classList.add('tasks__status_canceled');
                    break;
                case 3:
                    liStatusOnhold.innerHTML = 'Completed';
                    liStatusOnhold.classList.add('tasks__status_completed');
                    break;
                default:
                    break;
            }
            liOnhold = templateOnhold.content.cloneNode(true);
            ulOnhold.appendChild(liOnhold);
        }
    }
    howMuchTasks(taskOnholdLength, taskCompletedLength);
}
//функция отображения выполненых тасков
function listCompleted(once) {
    let taskCompleted = JSON.parse(localStorage.getItem('Completed'));
    if (!taskCompleted) return;
    taskCompletedLength = taskCompleted.length;
    let contTitleCompleted = document.createElement('div');
    contTitleCompleted.classList.add('tasks__completed');
    if (!document.querySelector('.tasks')) return;
    let titleCompleted = document.createElement('h2');
    titleCompleted.innerHTML = 'Completed';
    let spanTitleCompleted = document.createElement('span');
    spanTitleCompleted.classList.add('tasks__status_canceled');
    spanTitleCompleted.innerHTML = 'Inactive';
    let templateCompleted = document.querySelector('#temp__tasks__completed');
    let ulCompleted = document.querySelector('.tasks_completed ul');
    if (!document.querySelector('.tasks__completed')) contTitleCompleted.appendChild(titleCompleted);
    if (!document.querySelector('.tasks__completed')) contTitleCompleted.appendChild(spanTitleCompleted);
    ulCompleted.before(contTitleCompleted);
    let liTitleCompleted = templateCompleted.content.querySelector('.tasks__text');
    let liImportanceCompleted = templateCompleted.content.querySelector('.tasks__importance');
    let liStatusCompleted = templateCompleted.content.querySelector('.tasks__status');
    let btnCompleted = templateCompleted.content.querySelector('.tasks__more');
    if (once) {
        liTitleCompleted.innerText = taskCompleted[0].text;
        liImportanceCompleted.className = '';
        liImportanceCompleted.classList.add('tasks__importance');
        liStatusCompleted.className = '';
        liStatusCompleted.classList.add('tasks__status');
        btnCompleted.setAttribute('data-list', 'completed');
        btnCompleted.setAttribute('data-list-id', taskCompleted[0].id);
        switch (taskCompleted[0].difficulty) {
            case '0':
                liImportanceCompleted.classList.add('tasks__importance_minor');
                liImportanceCompleted.innerText = 'Minor';
                break;
            case '1':
                liImportanceCompleted.classList.add('tasks__importance_normal');
                liImportanceCompleted.innerText = 'Normal';
                break;
            case '2':
                liImportanceCompleted.classList.add('tasks__importance_critical');
                liImportanceCompleted.innerText = 'Critical';
                break;
            default:
                break;
        }
        switch (taskCompleted[0].status) {
            case 0:
                liStatusOnhold.innerHTML = 'Pending';
                liStatusCompleted.classList.add('tasks__status_pending');
                break;
            case 1:
                liStatusCompleted.innerHTML = 'In Progress';
                liStatusCompleted.classList.add('tasks__status_inprogress');
                break;
            case 2:
                liStatusCompleted.innerHTML = 'Canceled';
                liStatusCompleted.classList.add('tasks__status_canceled');
                break;
            case 3:
                liStatusCompleted.innerHTML = 'Completed';
                liStatusCompleted.classList.add('tasks__status_completed');
                break;
            default:
                break;
        }
        liCompleted = templateCompleted.content.cloneNode(true);
        ulCompleted.prepend(liCompleted);
        ulCompleted.children[0].classList.add('li__fade');
        for (i = 1; i < taskCompleted.length; i++) {
            liTitleCompleted.innerText = taskCompleted[i].text;
            liImportanceCompleted.className = '';
            liImportanceCompleted.classList.add('tasks__importance');
            liStatusCompleted.className = '';
            liStatusCompleted.classList.add('tasks__status');
            switch (taskCompleted[i].difficulty) {
                case '0':
                    liImportanceCompleted.innerHTML = 'Minor';
                    liImportanceCompleted.classList.add('tasks__importance_minor');
                    break;
                case '1':
                    liImportanceCompleted.innerHTML = 'Normal';
                    liImportanceCompleted.classList.add('tasks__importance_normal');
                    break;
                case '2':
                    liImportanceCompleted.innerHTML = 'Critical';
                    liImportanceCompleted.classList.add('tasks__importance_critical');
                    break;
                default:
                    break;
            }
            switch (taskCompleted[i].status) {
                case 0:
                    liStatusOnhold.innerHTML = 'Pending';
                    liStatusCompleted.classList.add('tasks__status_pending');
                    break;
                case 1:
                    liStatusCompleted.innerHTML = 'In Progress';
                    liStatusCompleted.classList.add('tasks__status_inprogress');
                    break;
                case 2:
                    liStatusCompleted.innerHTML = 'Canceled';
                    liStatusCompleted.classList.add('tasks__status_canceled');
                    break;
                case 3:
                    liStatusCompleted.innerHTML = 'Completed';
                    liStatusCompleted.classList.add('tasks__status_completed');
                    break;
                default:
                    break;
            }
            liCompleted = templateCompleted.content.cloneNode(true);
            ulCompleted.appendChild(liCompleted);
        }
        setTimeout(() => {
            ulCompleted.children[0].classList.remove('li__fade');
        }, 5000);
    }
    else {
        for (i = 0; i < taskCompleted.length; i++) {
            liTitleCompleted.innerText = taskCompleted[i].text;
            liImportanceCompleted.className = '';
            liImportanceCompleted.classList.add('tasks__importance');
            liStatusCompleted.className = '';
            liStatusCompleted.classList.add('tasks__status');
            btnCompleted.setAttribute('data-list', 'completed');
            btnCompleted.setAttribute('data-list-id', taskCompleted[0].id);
            switch (taskCompleted[i].difficulty) {
                case '0':
                    liImportanceCompleted.innerHTML = 'Minor';
                    liImportanceCompleted.classList.add('tasks__importance_minor');
                    break;
                case '1':
                    liImportanceCompleted.innerHTML = 'Normal';
                    liImportanceCompleted.classList.add('tasks__importance_normal');
                    break;
                case '2':
                    liImportanceCompleted.innerHTML = 'Critical';
                    liImportanceCompleted.classList.add('tasks__importance_critical');
                    break;
                default:
                    break;
            }
            switch (taskCompleted[i].status) {
                case 0:
                    liStatusOnhold.innerHTML = 'Pending';
                    liStatusCompleted.classList.add('tasks__status_pending');
                    break;
                case 1:
                    liStatusCompleted.innerHTML = 'In Progress';
                    liStatusCompleted.classList.add('tasks__status_inprogress');
                    break;
                case 2:
                    liStatusCompleted.innerHTML = 'Canceled';
                    liStatusCompleted.classList.add('tasks__status_canceled');
                    break;
                case 3:
                    liStatusCompleted.innerHTML = 'Completed';
                    liStatusCompleted.classList.add('tasks__status_completed');
                    break;
                default:
                    break;
            }
            liCompleted = templateCompleted.content.cloneNode(true);
            ulCompleted.appendChild(liCompleted);
        }
    }

    howMuchTasks(taskOnholdLength, taskCompletedLength);
}
function howMuchTasks(a, b) {
    if (!document.querySelector('.tasks')) return;
    document.querySelector('.container__task-header h1 span').innerHTML = a + b + ' task'
}
listOnhold();
listCompleted();
howMuchTasks(taskOnholdLength, taskCompletedLength);
showAddTask();
dayListName();
dayList(dateCurrent);
monthList();
yearScroll();
monthScroll();
taskMore();
dayToday(dateCurrent);