import { Products } from "../interfaces/productsInterface";
import productsModel from "../models/productsModel";
import {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} from "./refactorHandling";

export const getAllProducts = getAll<Products>(productsModel, "products");
export const createProduct = createOne<Products>(productsModel);
export const getProduct = getOne<Products>(productsModel);
export const updateProduct = updateOne<Products>(productsModel);
export const deleteProduct = deleteOne<Products>(productsModel);
