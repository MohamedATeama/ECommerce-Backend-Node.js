import { Document } from "mongoose";
import { Products } from "./productsInterface";
import { Users } from "./usersInterface";

export interface Reviews extends Document {
  comment: string;
  rate: number;
  product: Products;
  user: Users;
}
