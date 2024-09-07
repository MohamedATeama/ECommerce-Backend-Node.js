import { Router } from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "../controllers/subCategoriesControllers";
import { filterSubCategories } from "./../controllers/subCategoriesControllers";
import {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validator/subCategoriesValidator";

const subCategoriesRoute: Router = Router({ mergeParams: true });

subCategoriesRoute
  .route("/")
  .get(filterSubCategories, getAllSubCategories)
  .post(createSubCategoryValidator, createSubCategory);

subCategoriesRoute
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

export default subCategoriesRoute;