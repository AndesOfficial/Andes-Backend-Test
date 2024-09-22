import mongoose from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required pls add name'],
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Email is required pls add email'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],

  },
  password: {
    type: String,
    required: [true, 'Password is require'],
    minlength: 8,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const user = mongoose.model('User', userSchema);

export default user;
