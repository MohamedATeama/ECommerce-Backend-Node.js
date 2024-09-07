import { Schema, model } from "mongoose";
import { SubCategories } from "../interfaces/subCategoriesInterface";

const subCategoriesSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  Image: String,
  category: { type: Schema.Types.ObjectId, ref: "categories" }
}, {timestamps: true});

subCategoriesSchema.pre<SubCategories>(/^find/, function(next) {
  this.populate({ path: "category", select: "name" });
  next();
})

export default model<SubCategories>("subCategories", subCategoriesSchema);