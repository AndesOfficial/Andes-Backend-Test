const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Field name required"],
		},
		email: {
			type: String,
			required: [true, "Field email required"],
		},
		password: {
			type: String,
			required: [true, "Field password required"],
		},
	},
	{ timestamps: true }
);

// remove all tasks assigned to user before removing user
UserSchema.pre("remove", function (next) {
	this.model("Task").remove({ assignedTo: this._id }, next);
});

// hash password before saving
UserSchema.pre("save", function (next) {
	var user = this;

	if (!user.isModified("password")) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// compare password and hash
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model("User", UserSchema);
