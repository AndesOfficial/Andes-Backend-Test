const express = require("express");
const userControllers = require("../controllers/userController");
const router = express.Router();

// POST /users - Create a new user.
// GET /users - Fetch all users.
// GET /users/:id - Fetch a single user by ID.
// PUT /users/:id - Update user information.
// DELETE /users/:id - Delete a user.

router.post("", userControllers.createUser);
router.get("", userControllers.fetchAllUsers);
router.get("/:id", userControllers.fetchUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

module.exports = router;
