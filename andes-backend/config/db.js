const mongoose = require("mongoose");

const connectDB = async (url) => {
	try {
		const mongo = await mongoose.connect(url);
		console.log(`Connected to mongoDB ${mongo.connection.host}`);
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectDB;
