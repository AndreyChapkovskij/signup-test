export const checkValidEmail = (input, isValid, setIsValid) => {
	if (
		!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
			input.value
		)
	) {
		input.classList.add("not_valid");
		isValid && setIsValid(false);
		return `${input.name || "email"} is not valid`;
	}
	input.classList.remove("not_valid");
};

export const checkValidPassword = (input, isValid, setIsValid) => {
	if (!input.value) {
		input.classList.add("not_valid");
		isValid && setIsValid(false);
		return "password is empty";
	}
	if (!/^.{8,}$/.test(input.value)) {
		input.classList.add("not_valid");
		isValid && setIsValid(false);
		return `${input.name || "password"} is not valid`;
	}
	input.classList.remove("not_valid");
};

export const checkValidName = (input, isValid, setIsValid) => {
	if (!/^.{4,}$/.test(input.value)) {
		input.classList.add("not_valid");
		isValid && setIsValid(false);
		return `${input.name || "name"} is not valid`;
	}
	input.classList.remove("not_valid");
};
