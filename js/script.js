import { dateCurrent } from './modules/var.js';
import { dayListName, dayList, monthList, monthScroll, yearScroll, dayToday } from '././modules/calendar.js'
import { listOnhold, listCompleted, howMuchTasks, taskMore, addTask } from '././modules/task.js'

if (document.location.pathname.indexOf('calendar') == 1 || document.location.pathname.indexOf('years') == 1) {
    dayListName();
    yearScroll();
    monthList();
    monthScroll();
    dayList(dateCurrent);
    dayToday(dateCurrent);
    window.addEventListener('hashchange', () => {
        document.querySelector('.calendar__scroll-container').innerHTML = "";
        monthScroll();
        dayList();
    });
}
if (document.location.pathname.indexOf('index') == 1 || document.location.pathname == "/") {
    listOnhold();
    listCompleted();
    howMuchTasks();
    taskMore();
    document.querySelector('#addtask').onclick = () => {
        if (document.querySelector('#taskText').value) {
            addTask(document.querySelector('#taskText').value, document.querySelector('#taskDifficulty').value);
        }
    }

}