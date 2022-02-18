import * as modalController from './modal-controller.js';

export function init() {

    const contactLink = document.querySelector(".contact-link");
    contactLink.addEventListener('click', handleContactlinkClick);   
}

function handleContactlinkClick(event) {
    event.preventDefault();
    modalController.showModal();
}