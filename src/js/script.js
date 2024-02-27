let menuBtn = document.querySelector(".menu-btn");
let menu = document.querySelector(".menu");
let body = document.querySelector("body");
menuBtn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
    body.classList.toggle("body-scroll");
});

//-------------MODAL-------------//

const btnFixed = document.querySelector(".btn-fixed");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalButton = document.querySelector(".modal__button");
const header = document.querySelector("header");

let scrollWidth = window.innerWidth - body.clientWidth;

function interactModal() {
    modal.classList.toggle("open-modal");
    body.classList.toggle("body-scroll");
}

function addWidthScroll() {
    body.style.marginRight = scrollWidth + "px";
    modalContent.style.marginRight = scrollWidth + "px";
    btnFixed.style.left = 85 - (85 * scrollWidth) / window.innerWidth + "%";
    header.style.left = 0 - (100 * scrollWidth) / window.innerWidth + "%";
    header.style.paddingLeft = "10px";
}

function removeWidthScroll() {
    body.style.marginRight = "0px";
    modalContent.style.marginRight = "0px";
    btnFixed.style.left = "85%";
    header.style.left = "0%";
    header.style.paddingLeft = "0px";
}

btnFixed.addEventListener("click", function () {
    interactModal();
    addWidthScroll();
});

modalButton.addEventListener("click", function () {
    removeWidthScroll();
    interactModal();
});
