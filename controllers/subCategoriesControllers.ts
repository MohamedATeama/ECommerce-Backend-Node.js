import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { SubCategories } from "../interfaces/subCategoriesInterface";
import subCategoriesmodel from "../models/subCategoriesModel";

export const getAllSubCategories = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subCategories: SubCategories[] = await subCategoriesmodel.find();
    res.status(200).json({ data: subCategories });
  }
);

export const createSubCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subCategory: SubCategories = await subCategoriesmodel.create(req.body);
    res.status(201).json({ data: subCategory });
  }
);

export const getSubCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subCategory: SubCategories | null = await subCategoriesmodel.findById(
      req.params.id
    );
    res.status(200).json({ data: subCategory });
  }
);

export const updateSubCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subCategory: SubCategories | null = await subCategoriesmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ data: subCategory });
  }
);

export const deleteSubCategory = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const subCategory: SubCategories | null = await subCategoriesmodel.findByIdAndDelete(
      req.params.id
    );
    res.status(204).json();
  }
);
