const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  assignedTo: {
    type: Types.ObjectId,
    ref: "User",
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);

// Task Model
// Fields:
// title (string, required)
// description (string)
// completed (boolean, default: false)
// assignedTo (reference to User)
// dueDate (timestamp, optional)
