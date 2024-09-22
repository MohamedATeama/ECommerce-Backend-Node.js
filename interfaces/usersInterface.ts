import { Document } from "mongoose";
import { Products } from "./productsInterface";

export interface Users extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  active: boolean;
  image: string;
  wishlist: Products[];
  address: UserAddress[];
  passwordChangedAt: Date | number;
  resetCode: string | undefined;
  resetCodeExpireTime: Date | number | undefined;
  resetCodeVerify: boolean | undefined;
}

type UserRole = 'manager' | 'admin' | 'user';

export type UserAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};