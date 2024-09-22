const User = require("../models/User");

const userControllers = {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password." });
    }

    try {
      const emailExist = await User.findOne({ email: email });

      if (emailExist) {
        return res.status(400).json({ message: "Email already in use." });
      }

      const newUser = await User.create({
        name,
        email,
        password,
      });

      return res.status(201).json({
        message: "User created successfully.",
        user: {
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async fetchAllUsers(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    let users;
    let totalUsers;

    try {
      users = await User.find()
        .sort({ createdAt: -1 })
        .limit(limitNumber)
        .skip(skip);

      totalUsers = await User.countDocuments();

      res.status(200).json({
        success: true,
        count: users.length,
        totalPages: Math.ceil(totalUsers / limitNumber),
        currentPage: pageNumber,
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async fetchUser(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide user id in param." });
    }

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(201).json({
        message: "User Found.",
        user: {
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide user id in param." });
    }

    if (!name && !email && !password) {
      return res.status(400).json({
        message:
          "Request body is empty. Provide name, email, or password to update.",
      });
    }

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (email) {
        const alreadyTaken = await User.findOne({ email: email });

        if (alreadyTaken) {
          return res.status(400).json({ message: "Email already in use." });
        }

        user.email = email;
      }

      if (name) user.name = name;
      if (password) user.password = password;

      user.updatedAt = Date.now();

      await user.save();

      // Return success response
      return res.status(200).json({
        message: "User updated successfully.",
        user: {
          name: user.name,
          email: user.email,
          createdAt: user.updatedAt,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Please provide user id in param." });
    }

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      await User.findByIdAndDelete(id);

      return res.status(200).json({
        message: "User deleted successfully.",
        user: {
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error. Please try again later.",
        error: error.message,
      });
    }
  },
};

module.exports = userControllers;
