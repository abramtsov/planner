import { status, difficulty } from './var.js';













//отображение дополнительного меню в списке дел
export function taskMore() {
    let container = document.querySelector('.container__task');
    if (!container) return;
    container.addEventListener('click', function (e) {
        if (e.target.className == 'tasks__more') {
            let list;
            if (e.target.dataset.list == 'onhold') list = JSON.parse(localStorage.getItem('Onhold')).reverse();
            if (e.target.dataset.list == 'completed') list = JSON.parse(localStorage.getItem('Completed')).reverse();
            if (e.target.spellcheck == true) {
                if (document.querySelector('.addtask__additionally')) document.querySelector('.addtask__additionally').remove();
                e.target.spellcheck = false;
            }
            else {
                if (document.querySelector('.addtask__additionally')) document.querySelector('.addtask__additionally').remove();
                let btnTask = document.querySelectorAll('.container__task .tasks__more');
                for (let i = 0; i < btnTask.length; i++) {
                    btnTask[i].spellcheck = false;
                }
                e.target.spellcheck = true;
                let btnDiv = document.createElement('div');
                taskMoreInf(btnDiv, list[e.target.dataset.listId], list);
                btnDiv.classList.add('addtask__additionally');
                e.target.parentNode.appendChild(btnDiv);
            }
        }
    });
}


//Функция формирования данных о задании
function taskMoreInf(div, id, list) {
    let divForm = document.createElement('form');
    let btnStatus = document.createElement('select');
    btnStatus.classList.add('addtask__status');
    //

    for (let i = 0; i < status.length; i++) {
        let btnStatusOption = document.createElement('option');
        btnStatusOption.innerHTML = status[i][1];
        btnStatusOption.value = status[i][0];
        if (+id.status == +btnStatusOption.value) btnStatusOption.selected = true;
        btnStatus.append(btnStatusOption);
    }
    //
    divForm.append(btnStatus);
    //
    let btnDifficult = document.createElement('select');
    btnDifficult.classList.add('addtask__status');
    //
    for (let i = 0; i < difficulty.length; i++) {
        let btnDifficultOption = document.createElement('option');
        btnDifficultOption.innerHTML = difficulty[i][1];
        btnDifficultOption.value = difficulty[i][0];
        if (+id.difficulty == +btnDifficultOption.value) btnDifficultOption.selected = true;
        btnDifficult.append(btnDifficultOption);
    }
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
        taskMoreChange(btnDivSend.parentNode.parentNode.previousElementSibling.dataset.listId, btnStatus.value, btnDifficult.value, list);
    })
        ;
}

function taskMoreChange(listId, status, difficulty, list) {
    listId = +listId;
    status = +status;
    let onholdList = list;
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
    howMuchTasks();
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


export function addTask(taskText, taskDifficulty) {
    console.log(taskText, taskDifficulty)
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
//функция отображения активных тасков
export function listOnhold(once) {
    let taskOnhold = JSON.parse(localStorage.getItem('Onhold'));
    if (!taskOnhold) return;
    if (taskOnhold.length == 0) { localStorage.removeItem('Onhold'); document.querySelector('.tasks_onhold h2').remove(); return }
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
        let liOnhold = templateOnhold.content.cloneNode(true);
        ulOnhold.prepend(liOnhold);
        ulOnhold.children[0].classList.add('li__fade');
        setTimeout(() => {
            ulOnhold.children[0].classList.remove('li__fade');
        }, 500);

    }
    else {
        for (let i = 0; i < taskOnhold.length; i++) {
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
            let liOnhold = templateOnhold.content.cloneNode(true);
            ulOnhold.appendChild(liOnhold);
        }
    }
    howMuchTasks();
}

//функция отображения выполненых тасков
export function listCompleted(once) {
    let taskCompleted = JSON.parse(localStorage.getItem('Completed'));
    if (!taskCompleted) return;
    // let taskCompletedLength = taskCompleted.length;
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
    // let btnCompleted = templateCompleted.content.querySelector('.tasks__more');
    if (once) {
        liTitleCompleted.innerText = taskCompleted[0].text;
        liImportanceCompleted.className = '';
        liImportanceCompleted.classList.add('tasks__importance');
        liStatusCompleted.className = '';
        liStatusCompleted.classList.add('tasks__status');
        // btnCompleted.setAttribute('data-list', 'completed');
        // btnCompleted.setAttribute('data-list-id', taskCompleted[0].id);
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
                liStatusCompleted.innerHTML = 'Pending';
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
        let liCompleted = templateCompleted.content.cloneNode(true);
        ulCompleted.prepend(liCompleted);
        ulCompleted.children[0].classList.add('li__fade');
        for (let i = 1; i < taskCompleted.length; i++) {
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
                    liStatusCompleted.innerHTML = 'Pending';
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
        for (let i = 0; i < taskCompleted.length; i++) {
            liTitleCompleted.innerText = taskCompleted[i].text;
            liImportanceCompleted.className = '';
            liImportanceCompleted.classList.add('tasks__importance');
            liStatusCompleted.className = '';
            liStatusCompleted.classList.add('tasks__status');
            // btnCompleted.setAttribute('data-list', 'completed');
            // btnCompleted.setAttribute('data-list-id', taskCompleted[0].id);
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
                    liStatusCompleted.innerHTML = 'Pending';
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
            let liCompleted = templateCompleted.content.cloneNode(true);
            ulCompleted.appendChild(liCompleted);
        }
    }
    howMuchTasks();
}

export function howMuchTasks() {
    let a, b;
    let taskOnhold = JSON.parse(localStorage.getItem('Onhold'));
    taskOnhold === null ? a = 0 : a = taskOnhold.length;
    let taskCompleted = JSON.parse(localStorage.getItem('Completed'));
    taskCompleted === null ? b = 0 : b = taskCompleted.length;


    document.querySelector('.container__task-header h1 span').innerHTML = a + b + ' task';
}