import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    min: 10,
    max: 10,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    min: 6,
    max: 255,
    unique: true,
    primary: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 8,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("User", userSchema) || mongoose.models.User;

export default userModel;
