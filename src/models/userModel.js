import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    min: 10,
    max: 10,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  storeDetails:{
    type: String,
    required: [true, "Store details is required"],
    min: 10,
    max: 1024,
  },
  roles:{
    type: Array,
    default: ["user"],

  },
});

const userModel = mongoose.model("User", userSchema) || mongoose.models.User;

export default userModel;
