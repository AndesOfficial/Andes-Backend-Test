const express = require("express");
const taskControllers = require("../controllers/taskController");
const router = express.Router();

// POST /tasks - Create a new task.
// GET /tasks - Fetch all tasks.
// GET /tasks/:id - Fetch a single task by ID.
// PUT /tasks/:id - Update task information.
// DELETE /tasks/:id - Delete a task.

router.post("", taskControllers.createTask);
router.get("", taskControllers.fetchAllTasks);
router.get("/:id", taskControllers.fetchTask);
router.put("/:id", taskControllers.updateTask);
router.delete("/:id", taskControllers.deleteTask);

module.exports = router;
