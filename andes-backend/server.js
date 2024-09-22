const express = require("express");
const connectDB = require("./config/db");
const env = require("./config/env");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/userRouters");
const taskRouter = require("./routes/taskRouters");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

// middlewares
app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URI);
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${env.PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
};

process.on("SIGINT", async () => {
	console.log("Disconnecting from database");
	await mongoose.connection.close();
	console.log("Stopping server");
	process.exit();
});

start();
