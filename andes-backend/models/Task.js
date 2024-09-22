const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Field title required"],
		},
		description: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		dueDate: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
