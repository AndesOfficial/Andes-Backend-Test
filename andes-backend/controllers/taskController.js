const Task = require("../models/Task");
const User = require("../models/User");

const taskControllers = {
  async createTask(req, res) {
    const { title, description, assignedTo, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    try {
      let user = null;
      if (assignedTo) {
        user = await User.findOne({ email: assignedTo });
        if (!user) {
          return res.status(404).json({
            message: "Assigned user with the provided email not found.",
          });
        }
      }

      const newTask = new Task({
        title,
        description,
        assignedTo: user ? user._id : null,
        dueDate: dueDate || null,
      });

      await newTask.save();

      return res.status(201).json({
        message: "Task created successfully.",
        task: {
          title: newTask.title,
          description: newTask.description,
          completed: newTask.completed,
          assignedTo: user ? user.name : "Unassigned",
          dueDate: newTask.dueDate,
          createdAt: newTask.createdAt,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async fetchAllTasks(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    try {
      const tasks = await Task.find()
        .sort({ createdAt: -1 })
        .limit(limitNumber)
        .skip(skip);

      const totalTasks = await Task.countDocuments();

      return res.status(200).json({
        success: true,
        count: tasks.length,
        totalPages: Math.ceil(totalTasks / limitNumber),
        currentPage: pageNumber,
        data: tasks,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async fetchTask(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Task ID is required in params." });
    }

    try {
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }

      return res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async updateTask(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Task ID is required in params." });
    }

    const { title, description, completed, assignedTo, dueDate } = req.body;

    if (!title && !description && !completed && !assignedTo && !dueDate) {
      return res.status(400).json({
        message:
          "Request body is empty. Provide title, description, completed, assignedTo, dueDate to update.",
      });
    }

    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }

      if (assignedTo) {
        const user = await User.findOne({ email: assignedTo });
        if (!user) {
          return res.status(404).json({ message: "Assigned user not found." });
        }
        task.assignedTo = user._id;
      }

      if (title) task.title = title;
      if (description) task.description = description;
      if (typeof completed === "boolean") task.completed = completed;
      if (dueDate) task.dueDate = new Date(dueDate);

      await task.save();

      return res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        task,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async deleteTask(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Task ID is required in params." });
    }

    try {
      const task = await Task.findByIdAndDelete(id);

      if (!task) {
        return res.status(404).json({ message: "Task not found." });
      }

      return res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
        task,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },
};

module.exports = taskControllers;
