import { Document } from "mongoose";

export interface Users extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  active: boolean;
  image: string;
  passwordChangedAt: Date | number;
  resetCode: string | undefined;
  resetCodeExpireTime: Date | number | undefined;
  resetCodeVerify: boolean | undefined;
}

type UserRole = 'manager' | 'admin' | 'user';