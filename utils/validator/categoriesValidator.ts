import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../models/categoriesModel";

export const createCategoryValidator: RequestHandler[] = [
  check('name')
  .notEmpty().withMessage('Category name required')
  .isLength({ min: 2, max: 50 }).withMessage('name must be between 2 & 50')
  .custom(async (val: string) => {
    const category = await categoriesModel.findOne({ name: val });
    if (category) {
      return new Error('Category name already exists');
    }
    return true;
  }),
  validatorMiddleware
]

export const getCategoryValidator: RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('Invalid id'),
  validatorMiddleware
]

export const updateCategoryValidator: RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('Invalid id'),
  check('name').optional()
  .isLength({ min: 2, max: 50 }).withMessage('name must be between 2 & 50'),
  validatorMiddleware
]

export const deleteCategoryValidator: RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('Invalid id'),
  validatorMiddleware
]