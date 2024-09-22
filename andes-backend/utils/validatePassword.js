const errors = {
	uppercase: { regex: /[A-Z]/, description: "At least one uppercase letter" },
	lowercase: { regex: /[a-z]/, description: "At least one lowercase letter" },
	digit: { regex: /[0-9]/, description: "At least one digit" },
	special: {
		regex: /[^A-Za-z0-9]/,
		description: "At least one special symbol",
	},
	length: {
		test: (e) => e.length > 2,
		description: "Should be more than 2 characters",
	},
};

const validatePassword = (pwd) => {
	return Object.entries(errors).flatMap(
		([name, { test, regex, description }]) => {
			const isValid = test ? test(pwd) : regex.test(pwd);
			return isValid ? [] : { description, name };
		}
	);
};

module.exports = validatePassword;
