import { Categories } from "../interfaces/categoriesInterface";
import categoriesmodel from "../models/categoriesModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandling';

export const getAllCategories = getAll<Categories>(categoriesmodel, 'categories');

export const createCategory = createOne<Categories>(categoriesmodel);

export const getCategory = getOne<Categories>(categoriesmodel);

export const updateCategory = updateOne<Categories>(categoriesmodel);

export const deleteCategory = deleteOne<Categories>(categoriesmodel);