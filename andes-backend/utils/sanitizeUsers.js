const sanitizeUsers = (users) => {
	return users.map((user) => {
		const { password, ...sanitizedUser } = user;
		return sanitizedUser;
	});
};

module.exports = sanitizeUsers;
