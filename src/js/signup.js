"use strict";

import { getElem, getElemAll, FORM } from "./getter.js";
import {
	checkValidEmail,
	checkValidName,
	checkValidPassword,
} from "./helpers.js";

const SUBMIT_BTN = getElem(".sign-up__form--submit");

const NAME = getElem(".input #first-name");
const LAST_NAME = getElem(".input #last-name");
const MAIL = getElem(".input #e-mail");
const PASSWORD = getElem(".input #password");
const CONFIRM = getElem(".input #confirm");

const RADIO_BTNS = getElemAll("[type=radio]");
const GENDER = getElem(".gender");

const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = POPUP.querySelector(".popup__close");

POPUP_CLOSE.addEventListener("click", function () {
	POPUP.classList.remove("show");
});

FORM.onsubmit = async (e) => {
	e.preventDefault();
	let isValid = true;
	function setIsValid(bool) {
		isValid = bool;
	}

	MAIL.nextElementSibling.textContent = checkValidEmail(
		MAIL,
		isValid,
		setIsValid
	);
	NAME.nextElementSibling.textContent = checkValidName(
		NAME,
		isValid,
		setIsValid
	);
	LAST_NAME.nextElementSibling.textContent = checkValidName(
		LAST_NAME,
		isValid,
		setIsValid
	);
	PASSWORD.nextElementSibling.textContent = checkValidPassword(
		PASSWORD,
		isValid,
		setIsValid
	);
	CONFIRM.nextElementSibling.textContent = checkValidPassword(
		CONFIRM,
		isValid,
		setIsValid
	);

	if (PASSWORD.value && CONFIRM.value && CONFIRM.value !== PASSWORD.value) {
		PASSWORD.classList.add("not_valid");
		CONFIRM.classList.add("not_valid");
		isValid && setIsValid(false);
		PASSWORD.nextElementSibling.textContent = "passwords do not match";
	}

	let isChecked = false;
	RADIO_BTNS.forEach((input) => {
		if (input.checked) {
			isChecked = true;
		}
	});
	if (!isChecked) {
		GENDER.classList.add("not_valid");
		GENDER.nextElementSibling.textContent = "Choose please your gender";
	} else {
		GENDER.classList.remove("not_valid");
		GENDER.nextElementSibling.textContent = "";
	}

	if (isValid && isChecked) {
		try {
			let response = await fetch("/js/server-ok.json", {
				method: "GET",
				// body: new FormData(FORM),
			});

			!response.ok && new Error("Server error");
			e.target.reset();
			MAIL.closest("div").classList.remove("valid");
			POPUP.classList.add("show");
		} catch (error) {
			alert(error.message);
		}
	} else {
		SUBMIT_BTN.classList.add("shaking");
		setTimeout(() => {
			SUBMIT_BTN.classList.remove("shaking");
		}, 300);
	}
};

// show inputs by scroll
function onEntry(entry) {
	entry.forEach((change) => {
		if (change.isIntersecting) {
			change.target.classList.add("element-show");
		}
	});
}
let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
for (let elems of getElemAll(".sign-up__form--inputs>div")) {
	observer.observe(elems);
}

//
MAIL.addEventListener("input", function () {
	if (!checkValidEmail(MAIL)) {
		this.closest("div").classList.add("valid");
		MAIL.nextElementSibling.textContent = "";
	} else {
		this.closest("div").classList.remove("valid");
	}
});
