import { Router } from "express";
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "../controllers/subCategoriesControllers";
import { filterSubCategories } from "./../controllers/subCategoriesControllers";
import {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} from "../utils/validator/subCategoriesValidator";
import {
  protectRoutes,
  checkActive,
  allowedTo,
} from "./../controllers/authController";

const subCategoriesRoute: Router = Router({ mergeParams: true });

subCategoriesRoute
  .route("/")
  .get(filterSubCategories, getAllSubCategories)
  .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createSubCategoryValidator, createSubCategory);

subCategoriesRoute
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateSubCategoryValidator, updateSubCategory)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteSubCategoryValidator, deleteSubCategory);

export default subCategoriesRoute;