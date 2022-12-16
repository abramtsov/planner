export function header() {
    let headerCont = document.querySelector('.container__top');

    headerCont.innerHTML =
        `
    <div class="container__search">
    <form class="container__search-form" action="#">
        <img src="img/search.svg" class="container__search-icon" alt="Поиск">
        <input id="inputSearch" type="text" placeholder="Search for any training you want">
    </form>
</div>
<div class="container__notification">
    <button class="container__notification-button">
        <img src="img/notifications.svg" class="container__notification-icon" alt="Notification icon">
    </button>
</div>

<div class="container__profile">
    <a href="#" class="container__profile-link">
        <img src="img/profile_photo.svg" class="container__profile-photo" alt="Profile photo">
    </a>
</div>
<div class="container__switch">
    <a href="calendar.html">
        <img src="img/link_calendar.svg" alt="">
    </a>
</div>
<div class="container__switch">
<a href="index.html">
    <img src="img/link_task.svg" alt="">
</a>
</div>
    `;

}