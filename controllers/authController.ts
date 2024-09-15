import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import usersModel from "../models/usersModel";
import bcrypt from 'bcryptjs';
import ApiError from "../utils/apiError";
import { Users } from "../interfaces/usersInterface";
import { createToken } from "../utils/createToken";

export const signup = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: Users = await usersModel.create(req.body);
    const token = createToken(user._id, user.role);
    res.status(201).json({ token, data: user });
  }
);

export const login = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
  const user = await usersModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }
  const token = createToken(user._id, user.role);
  res.status(200).json({ token, data: user });
});