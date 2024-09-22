import { Document } from "mongoose";
import { Users } from "./usersInterface";
import { Products } from "./productsInterface";

export interface Carts extends Document {
  items: CartItems[];
  totalPrice: number;
  totalPriceAfterDiscount: number | undefined;
  user: Users;
}

export interface CartItems {
  _id?: string;
  product: Products;
  quantity: number;
  price: number;
}
