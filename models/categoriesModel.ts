import { Schema, model } from "mongoose";
import { Categories } from "../interfaces/categoriesInterface";

const categorySchema = new Schema<Categories>({
  name: { type: String, required: true, unique: true, trim: true },
  image: String
}, {timestamps: true});

export default model<Categories>('categories', categorySchema);