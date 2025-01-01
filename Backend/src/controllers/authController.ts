import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
import { IUser } from "../utils/interface";
import { AppError } from "../utils/errorHandler";
import logger from "../utils/loggers";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Please provide email and password"
      });
      return;
    }

    // Find user and handle non-existent user
    const user = await userModel.findOne({ email }).select('+password');
    if (!user || !user.password) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
      return;
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
      return;
    }

    // Create session user object
    const sessionUser: Partial<IUser> = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Set session and return success response
    req.session.user = sessionUser;
    
    logger.info(`User logged in successfully: ${email}`);
    
    res.status(200).json({
      success: true,
      user: sessionUser
    });
    
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: "An error occurred during login"
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        resolve();
      });
    });

    res.clearCookie("connect.sid");
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to logout"
    });
  }
};