import { Document } from "mongoose";
import { Categories } from './categoriesInterface';
import { SubCategories } from './subCategoriesInterface';

export interface Products extends Document {
  _id: string;
  name: string;
  description: string;
  category: Categories;
  subCategory: SubCategories;
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  sold: number;
  cover: string;
  images: string[];
  ratingAverage: number;
  ratingCount: number;
}