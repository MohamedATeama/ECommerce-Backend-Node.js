import { Categories } from "./categoriesInterface";
import { Document } from 'mongoose';

export interface SubCategories extends Document {
  id: number;
  name: string;
  image: string;
  category: Categories;
}