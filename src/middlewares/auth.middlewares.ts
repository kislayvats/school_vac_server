import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import HttpStatus from "http-status-codes";
import { CurrentUserDto } from "../interfaces/user.interface";
const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      console.log("Unauthorized");
    }
    const decoded = jwt.verify(token, config.jwt.secret as string);
    req.cookies = {
      user: decoded as CurrentUserDto,
    };
    console.log(req.cookies);
    next();
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
  }
};

export default {
  authCheck,
};
