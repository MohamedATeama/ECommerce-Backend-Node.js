import { Schema, model } from "mongoose";
import { SubCategories } from "../interfaces/subCategoriesInterface";

const subCategoriesSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  Image: String,
  category: { type: Schema.Types.ObjectId, ref: "categories" }
}, {timestamps: true});

export default model<SubCategories>("subCategories", subCategoriesSchema);