import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
import { IUser } from "../utils/interface";
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    if (!user.password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const sessionUser: Partial<IUser> = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    req.session.user = sessionUser;

    res.status(200).json({ message: "Login successful", user: sessionUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Failed to logout" });
      return;
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

