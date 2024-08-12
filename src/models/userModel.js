import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    maxlength: 1024,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    minlength: 10,
    maxlength: 10,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  storeDetails: {
    type: String,
    required: [true, "Store details are required"],
    minlength: 10,
    maxlength: 1024,
  },
  jwtToken: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ["user", "admin", "salesRep", "storeOwner"],
    default: ["user"],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
