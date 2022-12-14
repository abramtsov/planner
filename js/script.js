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



