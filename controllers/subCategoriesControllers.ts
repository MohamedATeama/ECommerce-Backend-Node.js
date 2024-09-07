import { Request, Response, NextFunction } from "express";
import { SubCategories } from "../interfaces/subCategoriesInterface";
import subCategoriesmodel from "../models/subCategoriesModel";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./refactorHandling";
import { FilterData } from "../interfaces/filterData";

export const filterSubCategories = (req: Request, res: Response, next: NextFunction) => {
  let filterData: FilterData = {};
  if (req.params.categoryId) {
    filterData.category = req.params.categoryId;
  }
  req.filterData = filterData;
  next();
};

export const getAllSubCategories = getAll<SubCategories>(subCategoriesmodel, 'subCategories');

export const createSubCategory = createOne<SubCategories>(subCategoriesmodel);

export const getSubCategory = getOne<SubCategories>(subCategoriesmodel);

export const updateSubCategory = updateOne<SubCategories>(subCategoriesmodel);

export const deleteSubCategory = deleteOne<SubCategories>(subCategoriesmodel);