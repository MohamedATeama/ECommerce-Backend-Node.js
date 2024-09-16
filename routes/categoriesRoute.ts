import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categoriesContrller";
import subCategoriesRoute from "./subCategoriesRoute";
import { createCategoryValidator, getCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from './../utils/validator/categoriesValidator';
import { protectRoutes, checkActive, allowedTo } from './../controllers/authController';

const categoriesRoute: Router = Router()

categoriesRoute.use("/:categoryId/subCategories", subCategoriesRoute);

categoriesRoute.route('/')
.get(getAllCategories)
.post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createCategoryValidator, createCategory);

categoriesRoute
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateCategoryValidator, updateCategory)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteCategoryValidator, deleteCategory);

export default categoriesRoute;