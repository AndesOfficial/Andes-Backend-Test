const createHttpError = require("http-errors");
const User = require("../models/User");
const sanitizeUsers = require("../utils/sanitizeUsers");
const validateEmail = require("../utils/validateEmail");
const validatePassword = require("../utils/validatePassword");

class UserController {
	async createUser(req, res, next) {
		try {
			const { name, email, password } = req.body;
			if (!name || !email || !password) {
				return next(
					createHttpError.BadRequest("Missing required fields")
				);
			}

			if (validateEmail(email) === null) {
				return next(createHttpError.BadRequest("Invalid email format"));
			}

			const emailExists = await User.findOne({ email });

			if (emailExists) {
				return next(createHttpError.Conflict("Email already exists"));
			}

			const passwordErrors = validatePassword(password);
			if (passwordErrors.length > 0) {
				return next(
					createHttpError.BadRequest("Invalid password format", {
						errors: passwordErrors,
					})
				);
			}

			const user = await User.create({
				name,
				email,
				password,
			});

			res.status(201).json({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				},
			});
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async getAllUsers(req, res, next) {
		try {
			const { page, limit } = req.query;
			const skip = (page - 1) * limit;
			const users = await User.find()
				.sort({ createdAt: -1 })
				.limit(limit)
				.skip(skip);
			const usersCount = await User.countDocuments();

			const sanitizedUsers = sanitizeUsers(users);
			res.status(200).json({
				users: sanitizedUsers,
				totalcount: usersCount,
				pagecount: Math.ceil(usersCount / limit),
				count: sanitizedUsers.length,
				currentPage: page,
			});
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async getUserById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(createHttpError.BadRequest("Missing id parameter"));
			}
			const user = await User.findById(id);
			if (!user) {
				return next(createHttpError.NotFound("User not found"));
			}
			res.status(200).json({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				},
			});
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async updateUser(req, res, next) {
		try {
			const { id } = req.params;
			const { name, email, password } = req.body;
			if (!id) {
				return next(createHttpError.BadRequest("Missing id parameter"));
			}

			const user = await User.findById(id);

			if (name) {
				user.name = name;
			}

			if (email) {
				if (validateEmail(email) === null) {
					return next(
						createHttpError.BadRequest("Invalid email format")
					);
				}
				const emailExists = await User.findOne({ email });
				if (emailExists) {
					return next(
						createHttpError.Conflict("Email already exists")
					);
				}
			}

			if (password) {
				const passwordErrors = validatePassword(password);
				if (passwordErrors.length > 0) {
					return next(
						createHttpError.BadRequest("Invalid password format", {
							errors: passwordErrors,
						})
					);
				}
				user.password = password;
			}

			await user.save();

			res.status(200).json({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				},
			});
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async deleteUser(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(createHttpError.BadRequest("Missing id parameter"));
			}

			const user = await User.findById(id);
			if (!user) {
				return next(createHttpError.NotFound("User not found"));
			}

			await User.findByIdAndDelete(id);

			return res.status(204).json({
				message: "User deleted successfully",
			});
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}
}

const userController = new UserController();
module.exports = userController;
