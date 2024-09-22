const express = require("express");
const taskController = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter
	.route("/")
	.get(taskController.getAllTasks)
	.post(taskController.createTask);
taskRouter
	.route("/:id")
	.get(taskController.getTaskById)
	.put(taskController.updateTask)
	.delete(taskController.deleteTask);

module.exports = taskRouter;
