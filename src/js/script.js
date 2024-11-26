const btnFixed = document.querySelector(".btn-fixed");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalButton = document.querySelector(".modal__button");
const header = document.querySelector("header");
let menuBtn = document.querySelector(".menu-btn");
let menu = document.querySelector(".menu");
let body = document.querySelector("body");
menuBtn.addEventListener("click", function () {
	menuBtn.classList.toggle("active");
	menu.classList.toggle("active");
});

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

modal.addEventListener("click", function (event) {
	if (event.currentTarget === modal) {
		removeWidthScroll();
		interactModal();
	}
});

modalContent.addEventListener("click", function (event) {
	event.stopPropagation();
});

modalButton.addEventListener("click", function () {
	removeWidthScroll();
	interactModal();
});

const phoneInputs = document.querySelectorAll("#tel");

phoneInputs.forEach((phoneInput) => {
	let prevValue = "";

	phoneInput.addEventListener("input", function (event) {
		const inputValue = event.target.value;
		const cursorPosition = event.target.selectionStart;

		if (inputValue.length === 1 && inputValue !== "+") {
			event.target.value = "+7" + inputValue;
			prevValue = "+7" + inputValue;
			return;
		}

		const cleanedValue = inputValue.replace(/\D/g, "");

		const maxLength = 11;
		let formattedValue =
			cleanedValue.length > maxLength
				? cleanedValue.slice(0, maxLength)
				: cleanedValue;

		if (
			formattedValue.startsWith("+7") &&
			formattedValue.slice(2).length === 1
		) {
			formattedValue = "";
		} else if (
			formattedValue.startsWith("+7") &&
			!/^\d/.test(formattedValue.slice(2))
		) {
			formattedValue = "+7" + formattedValue.slice(2);
		} else {
			formattedValue =
				formattedValue.length > 1
					? `+7${formattedValue.slice(1)}`
					: formattedValue;
		}

		formattedValue = formattedValue.replace(
			/^(\+7)\s?(\d{0,3})\s?(\d{0,3})\s?(\d{0,2})\s?(\d{0,2})/,
			function (match, p1, p2, p3, p4, p5) {
				return (
					p1 +
					(p2 ? " (" + p2 : "") +
					(p3 ? ") " + p3 : "") +
					(p4 ? "-" + p4 : "") +
					(p5 ? "-" + p5 : "")
				);
			}
		);

		event.target.value = formattedValue;

		prevValue = formattedValue;

		if (
			prevValue.length > 0 &&
			cursorPosition > 0 &&
			prevValue[cursorPosition - 1] === "(" &&
			inputValue.length < prevValue.length
		) {
			event.target.value =
				prevValue.slice(0, cursorPosition - 2) +
				prevValue.slice(cursorPosition - 1);
		}
	});
});
