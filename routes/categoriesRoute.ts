import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categoriesContrller";
import subCategoriesRoute from "./subCategoriesRoute";
import { createCategoryValidator, getCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from './../utils/validator/categoriesValidator';

const categoriesRoute: Router = Router()

categoriesRoute.use("/:categoryId/subCategories", subCategoriesRoute);

categoriesRoute.route('/')
.get(getAllCategories)
.post(createCategoryValidator, createCategory);

categoriesRoute
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);

export default categoriesRoute;