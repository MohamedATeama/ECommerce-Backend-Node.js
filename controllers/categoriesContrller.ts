import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Categories } from "../interfaces/categoriesInterface";
import categoriesmodel from "../models/categoriesModel";

export const getAllCategories = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const categories: Categories[] = await categoriesmodel.find();
  res.status(200).json({ data: categories })
});

export const createCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const category: Categories = await categoriesmodel.create(req.body);
  res.status(201).json({ data: category })
});

export const getCategory = expressAsyncHandler(async (req:Request, res: Response, next:NextFunction) => {
  const category: Categories | null = await categoriesmodel.findById(req.params.id);
  res.status(200).json({ data: category })
});

export const updateCategory = expressAsyncHandler(async (req:Request, res:Response, next: NextFunction) => {
  const category: Categories | null = await categoriesmodel.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json({ data: category })
});

export const deleteCategory = expressAsyncHandler(async (req:Request, res:Response, next: NextFunction) => {
  const category: Categories | null = await categoriesmodel.findByIdAndDelete(req.params.id);
  res.status(204).json()
});