import { dateCurrent } from './modules/var.js';
import { dayListName, dayList, monthList, monthScroll, yearScroll, dayToday, inputYear } from '././modules/calendar.js'
import { listOnhold, listCompleted, howMuchTasks, taskMore, addTask } from '././modules/task.js'
import { message } from '././modules/message.js'
import { header } from '././modules/header.js'

if (document.location.pathname.indexOf('calendar') == 1 || document.location.pathname.indexOf('years') == 1) {
    header();
    dayListName();
    yearScroll();
    monthScroll();
    dayList(dateCurrent);
    dayToday(dateCurrent);
    message();
    monthList();
    inputYear();
    window.addEventListener('hashchange', () => {
        document.querySelector('.calendar__scroll-container').innerHTML = "";
        monthScroll();
        dayList();
    });
}
if (document.location.pathname.indexOf('index') == 1 || document.location.pathname == "/") {
    header();
    listOnhold();
    listCompleted();
    howMuchTasks();
    taskMore();
    message();
    document.querySelector('#addtask').onclick = () => {
        if (document.querySelector('#taskText').value) {
            addTask(document.querySelector('#taskText').value, document.querySelector('#taskDifficulty').value);
        }
    }
}
let search = document.querySelector('#inputSearch')
let searchSrc = document.querySelectorAll('.tasks > ul li p.tasks__text');
let searchRes = searchSrc;
search.addEventListener('input', (e) => {
    let arrRes = [];
    function innerMark(str, pos, len) {
        return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len);

    }
    for (let i = 0; i < searchSrc.length; i++) {
        if (searchRes[i].innerText.search(search.value) != '-1') { //если нашлось
            if (document.querySelector('.tasks__completed')) document.querySelector('.tasks__completed').classList.add('hide'); //скрываем Completed
            arrRes.push(searchRes[i])
            document.querySelector('.tasks_onhold h2').innerText = 'Search Result';
            document.querySelector('.tasks_onhold ul').innerHTML = '';
            document.querySelector('.tasks_completed ul').innerHTML = '';
        }
        else { // если не нашлось
            searchSrc[i].parentNode.remove();
            // проверка на наличие результата, если его нет, обновляем список
            if (document.querySelectorAll('.tasks_onhold ul li').length == 0) {
                document.querySelector('.tasks_onhold h2').innerText = 'On Hold';
                document.querySelector('.tasks_completed ul').innerHTML = '';
                document.querySelector('.tasks_onhold ul').innerHTML = '';
                listOnhold();
                listCompleted();
                if (document.querySelector('.tasks__completed')) document.querySelector('.tasks__completed').classList.remove('hide');
            }
        }

        for (let k = 0; k < arrRes.length; k++) {
            arrRes[k].innerHTML = innerMark(arrRes[k].innerText, arrRes[k].innerText.search(search.value), search.value.length)
            document.querySelector('.tasks_onhold ul').append(arrRes[k].parentNode)
        }
    }
    if (search.value == '') {
        document.querySelector('.tasks_onhold h2').innerText = 'On Hold';
        document.querySelector('.tasks_completed ul').innerHTML = '';
        document.querySelector('.tasks_onhold ul').innerHTML = '';
        listOnhold();
        listCompleted();
        if (document.querySelector('.tasks__completed')) document.querySelector('.tasks__completed').classList.remove('hide');
    }
})