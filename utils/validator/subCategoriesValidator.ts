import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import subCategoriesModel from "../../models/subCategoriesModel";
import productsModel from "../../models/productsModel";
import { Products } from "../../interfaces/productsInterface";

export const createSubCategoryValidator: RequestHandler[] = [
  check('name')
  .notEmpty().withMessage('Category name required')
  .isLength({ min: 2, max: 50 }).withMessage('name must be between 2 & 50')
  .custom(async (val: string) => {
    const category = await subCategoriesModel.findOne({ name: val });
    if (category) {
      return new Error('Category name already exists');
    }
    return true;
  }),
  check('category')
  .notEmpty().withMessage('Category required')
  .isMongoId().withMessage("invalid category id"),
  validatorMiddleware
]

export const getSubCategoryValidator: RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('Invalid id'),
  validatorMiddleware
]

export const updateSubCategoryValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid id"),
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("name must be between 2 & 50"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("invalid category id"),
  validatorMiddleware,
];

export const deleteSubCategoryValidator: RequestHandler[] = [
  check('id')
  .isMongoId().withMessage('Invalid id')
  .custom(async (val: string) => {
      const products = await productsModel.find({ subCategory: val });
      if (products.length > 0) {
        const bulkOption = products.map((product: Products) => ({
          deleteOne: { filter: { _id: product._id } }
        }))
        await productsModel.bulkWrite(bulkOption)
      }
    }),
  validatorMiddleware
]