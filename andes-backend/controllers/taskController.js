const createHttpError = require("http-errors");
const User = require("../models/User");
const Task = require("../models/Task");

class TaskController {
	async createTask(req, res, next) {
		try {
			const { title, description, completed, assignedTo, dueDate } =
				req.body;

			if (!title) {
				return next(
					createHttpError.BadRequest("Missing required fields")
				);
			}

			let user = null;
			if (assignedTo) {
				user = await User.findById(assignedTo);
				if (!user) {
					return next(
						createHttpError.NotFound(
							"User assigned to task does not exist"
						)
					);
				}
			}

			const task = await Task.create({
				title,
				description,
				completed: completed ? completed : false,
				assignedTo: user ? user.id : null,
				dueDate: dueDate ? dueDate : null,
			});

			return res.status(201).json(task);
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async getAllTasks(req, res, next) {
		try {
			const { page, limit } = req.query;
			const skip = (page - 1) * limit;
			const tasks = await Task.find()
				.sort({ createdAt: -1 })
				.limit(limit)
				.skip(skip);
			const tasksCount = await Task.countDocuments();

			res.status(200).json({
				tasks,
				totalcount: tasksCount,
				pagecount: Math.ceil(tasksCount / limit),
				count: tasks.length,
				currentPage: page,
			});
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async getTaskById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(createHttpError.BadRequest("Missing id parameter"));
			}
			const task = await Task.findById(id);
			if (!task) {
				return next(createHttpError.NotFound("Task not found"));
			}
			res.status(200).json(task);
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async updateTask(req, res, next) {
		try {
			const { id } = req.params;
			const { title, description, completed, assignedTo, dueDate } =
				req.body;

			const task = await Task.findById(id);

			if (!task) {
				return next(createHttpError.NotFound("Task not found"));
			}

			if (title) {
				task.title = title;
			}

			if (description) {
				task.description = description;
			}

			if (completed) {
				task.completed = completed;
			}

			if (assignedTo) {
				const user = await User.findById(assignedTo);
				if (!user) {
					return next(
						createHttpError.NotFound(
							"User assigned to task does not exist"
						)
					);
				}
				task.assignedTo = user.id;
			}

			if (dueDate) {
				task.dueDate = dueDate;
			}

			await task.save();

			res.status(200).json(task);
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}

	async deleteTask(req, res, next) {
		try {
			const { id } = req.params;
			if (!id) {
				return next(createHttpError.BadRequest("Missing id parameter"));
			}

			const task = await Task.findById(id);
			if (!task) {
				return next(createHttpError.NotFound("Task not found"));
			}

			await Task.findByIdAndDelete(id);

			return res.status(204).json({
				message: "Task deleted successfully",
			});
		} catch (error) {
			console.log(error);
			next(
				createHttpError(500, "Something went wrong. Please try again")
			);
		}
	}
}

const taskController = new TaskController();
module.exports = taskController;
