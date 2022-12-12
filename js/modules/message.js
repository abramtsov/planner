export function message() {
    let messageCont = document.querySelector('.message');
    messageCont.innerHTML =
        `
    <ul>
                    <li class="message__item message-human">
                        <div class="message-human__img">
                            <a href="#">
                                <img src="img/user_photo1.svg" alt="User Photo">
                            </a>
                        </div>
                        <div class="message-human__text">
                            <h6>Alena Curtis </h6><span> - Just Now</span>
                            <p>Planning for new event at Sydney room for new project on <span
                                    class="message-human__text_attention-pink">14:00 PM</span></p>
                        </div>
                    </li>
                    <li class="message__item message-notification">
                        <h6>Your message to <b>Leo Dias</b> has been sent.</h6><span> - Just Now</span>
                        <p>Planning for new event at Sydney room for new project on coming week.</p>
                    </li>
                    <li class="message__item message-system">
                        <h6>System message</h6>
                        <span>- Just now</span>
                        <p>Please update your profile</p>
                    </li>
                    <li class="message__item message-human">
                        <div class="message-human__img">
                            <a href="#">
                                <img src="img/user_photo2.svg" alt="User Photo">
                            </a>
                        </div>
                        <div class="message-human__text">
                            <h6>Alena Curtis </h6><span> 1 hour ago</span>
                            <p>Attached new design file to <span
                                    class="message-human__text_attention-violet">Userflow</span></p>
                            <div class=" message-human__attach">
                                <div>
                                    <img src="img/ZIPFile.svg" alt="File">
                                    <p>Payment.zip</p>
                                    <p>160KB</p>
                                </div>
                                <div>
                                    <span>+2</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="message__item message-human">
                        <div class="message-human__img">
                            <a href="#">
                                <img src="img/user_photo3.svg" alt="User Photo">
                            </a>
                        </div>
                        <div class="message-human__text">
                            <h6>Chance Rhiel Madsen </h6><span> 2 hour ago</span>
                            <p>Comment on y our task <span class="message-human__text_attention-yellow">UI Design</span>
                            </p>
                            <div class="message-human__comment">
                                <p>Amazing! Great work. Keep it up, bro</p>
                            </div>
                        </div>
                    </li>
                </ul>
    `
}