import { dateCurrent } from './modules/var.js';
import { dayListName, dayList, monthList, monthScroll, yearScroll, dayToday } from '././modules/calendar.js'
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
document.querySelector('.calendar__scroll-container').addEventListener('click', (e) => {
    if (e.target.tagName == 'P' && e.target.innerHTML.length == 4) {
        console.log(e.target)
        let year = document.querySelector('.calendar__scroll-container p').innerText;
        document.querySelector('.calendar__scroll-container p').remove();
        let arrow = document.querySelector('.calendar__arrow-right');
        arrow.remove();
        arrow = document.querySelector('.calendar__arrow-left');
        arrow.remove();
        let input = document.createElement('input');
        input.type = 'number';
        input.classList.add('calendar__input_year');
        input.inputMode = 'numeric';
        input.value = year;
        document.querySelector('.calendar__scroll-container').append(input)
        input.addEventListener('change', () => {
            monthList();
        })
    }
})
