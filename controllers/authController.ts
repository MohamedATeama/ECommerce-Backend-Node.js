import { NextFunction, request, Request, response, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import usersModel from "../models/usersModel";
import bcrypt from 'bcryptjs';
import ApiError from "../utils/apiError";
import { Users } from "../interfaces/usersInterface";
import { createResetToken, createToken } from "../utils/createToken";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendMail from "../utils/sendMail";

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

export const protectRoutes = expressAsyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  let token: string = "";
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new ApiError("You are not logged in! Please log in to get access",401))
  }
  const decodedToken: any = jwt.verify(token, process.env.JWT_KEY!);
  const user = await usersModel.findById(decodedToken._id);
  if (!user) {
    return next(new ApiError("You are not logged in! Please log in to get access",404))
  }
  if (user.passwordChangedAt instanceof Date) {
    const changedTime: number = parseInt((user.passwordChangedAt.getTime() / 1000).toString());
    if (changedTime > decodedToken.iat) {
      return next(new ApiError("Your password has been changed recently, please log in again",401));
    }
  }
  req.user = user;
  next();
});

export const checkActive = expressAsyncHandler ( async (req:Request, res: Response, next: NextFunction) => {
  if (!req.user?.active) {
    return next(new ApiError("Your account is not active", 403));
  }
  next();
});

export const allowedTo = (...roles: string[]) =>
  expressAsyncHandler ((req: Request, res: Response, next:NextFunction) => {
    if (!roles.includes(req.user?.role!)) {
      return next(new ApiError("You are not allowed to access this route", 403));
    }
    next();
  });

export const forgerPassword = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError("user not found", 404));
    }
    const resetCode: string = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.resetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");
    user.resetCodeExpireTime = Date.now() + 10 * 60 * 1000;
    user.resetCodeVerify = false;
    const message: string = `your reset password code is ${resetCode}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      await user.save({ validateModifiedOnly: true });
    } catch (err) {
      console.log(err);
      return next(new ApiError("error sending email", 400));
    }
    const resetToken: string = createResetToken(user._id);
    res
      .status(200)
      .json({
        message: "reset password code sent to your email",
        resetToken,
      });
  }
);

export const verifyResetCode = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let resetToken: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      resetToken = req.headers.authorization.split(" ")[1];
    } else {
      return next(new ApiError("get your reset code first", 400));
    }
    const decodedToken: any = jwt.verify(resetToken, process.env.JWT_KEY!);
    const hashedResetCode: string = crypto
      .createHash("sha256")
      .update(req.body.resetCode)
      .digest("hex");
    const user = await usersModel.findOne({
      _id: decodedToken._id,
      resetCode: hashedResetCode,
      resetCodeExpireTime: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ApiError("invalid or expired reset code", 400));
    }
    user.resetCodeVerify = true;
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "reset code verified" });
  }
);

export const resetCode = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let resetToken: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      resetToken = req.headers.authorization.split(" ")[1];
    } else {
      return next(new ApiError("you can't do this action", 400));
    }
    const decodedToken: any = jwt.verify(resetToken, process.env.JWT_KEY!);
    const user = await usersModel.findOne({
      _id: decodedToken._id,
      resetCodeVerify: true,
    });
    if (!user) {
      return next(new ApiError("verify your reset code first", 400));
    }
    user.password = req.body.password;
    user.resetCode = undefined;
    user.resetCodeExpireTime = undefined;
    user.resetCodeVerify = undefined;
    user.passwordChangedAt = Date.now();
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "your password has been changed" });
  }
);