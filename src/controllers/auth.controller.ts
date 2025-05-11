import authService from "../services/auth.service";
import { Request, Response } from "express";
import HttpStatus from "http-status-codes";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser({ name, email, password });
    res.status(user.statusCode).json(user);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error registering user",
      error,
    });
    throw new Error("Error registering user");
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser({ email, password });
    res.status(user.statusCode).json(user);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error logging in",
      error,
    });
    throw new Error("Error logging in");
  }
};

const currentUser = async (req: Request, res: Response) => {
  try {
    const user = await authService.currentUser(req.cookies.user._id);
    res.status(user.statusCode).json(user);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching current user",
      error,
    });
    throw new Error("Error fetching current user");
  }
};

export default {
  registerUser,
  loginUser,
  currentUser,
};
