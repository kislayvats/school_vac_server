import HttpStatus from "http-status-codes";
import User from "../schemas/user.schema";
import Student from "../schemas/student.schema";
import {
  UserLoginDto,
  UserLoginResponseDto,
  UserRegisterDto,
  UserType,
} from "../interfaces/user.interface";
import { ResponseDto } from "../dto/response.dto";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import { FilterQuery } from "../interfaces/filterQuery.interface";
import { Document } from "mongoose";
import {
  StudentRegisterDto,
  StudentResponse,
  StudentResponseDto,
} from "../interfaces/student.interface";
import { StudentDocument } from "../schemas/models/student.model";
const registerUser = async (
  body: UserRegisterDto
): Promise<ResponseDto<Partial<UserType>>> => {
  const { name, email, password } = body;
  console.log(body);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return new ResponseDto(
    HttpStatus.CREATED,
    "User registered successfully",
    user
  );
};

const loginUser = async (
  body: UserLoginDto
): Promise<ResponseDto<Partial<UserLoginResponseDto>>> => {
  console.log(body);
  const { email, password } = body;
  const user = await User.findOne({ email }).lean();
  console.log(user);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!user) {
    return new ResponseDto(HttpStatus.NOT_FOUND, "User not found", null);
  }
  if (!isMatch) {
    return new ResponseDto(HttpStatus.UNAUTHORIZED, "Invalid password", null);
  }

  const userPayload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };
  const token = jwt.sign(userPayload, config.jwt.secret as string);
  return new ResponseDto(HttpStatus.OK, "User logged in successfully", {
    user,
    token,
  });
};

const currentUser = async (
  userId: string
): Promise<ResponseDto<Partial<UserType>>> => {
  const user = await User.findById(userId);
  return new ResponseDto(HttpStatus.OK, "User fetched successfully", user);
};

export default {
  registerUser,
  loginUser,
  currentUser,
};
