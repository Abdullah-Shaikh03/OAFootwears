import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../utils/interface";


const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
      match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    },
    name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiresAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'store_manager', 'user'],
      default: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<IUser>("User", userSchema);


export {userModel};