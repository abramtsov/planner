export let calendarDays = document.getElementsByClassName('day__month_current');
export let chooseView = document.getElementsByClassName('calendar__choose');
export let chooseTabs = document.getElementsByClassName('container__tabs-li');
export let calendarAll = document.querySelector('.calendar__days');
export let dateCurrent = new Date();
export let tempHash = document.location.hash;
export let dayArr = [
    ['Sunday', 'Sun'],
    ['Monday', 'Mon'],
    ['Tuesday', 'Tue'],
    ['Wednesday', 'Wed'],
    ['Thursday', 'Thu'],
    ['Friday', 'Fri'],
    ['Saturday', 'Sat'],
]
export let monthArr = [
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