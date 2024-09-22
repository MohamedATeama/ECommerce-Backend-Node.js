import { Model } from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from "express";
import ApiError from '../utils/apiError';
import Features from '../utils/features';

export const getAll = <modelType> (model: Model<any>, modelName: string) =>
  expressAsyncHandler(async (req:Request, res:Response, next: NextFunction) => {
    let filterData: any = {};
    let searchLength: number = 0;
    if (req.filterData) {
      filterData = req.filterData;
    }
    if (req.query) {
      const searchResult: Features = new Features(model.find(filterData), req.query).filter().search(modelName)
      const searchData: modelType[] = await searchResult.mongooseQuery;
      searchLength = searchData.length;
    }
    const documentsCount: number = searchLength || await model.find(filterData).countDocuments();
    const feature: Features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName).pagination(documentsCount);
    const { mongooseQuery, paginationResult } = feature;
    const data: modelType[] = await mongooseQuery;
    res.status(200).json({ length: data.length, pagination: paginationResult, data: data });
  });

export const createOne = <modelType>(model: Model<any>) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: modelType = await model.create(req.body);
    res.status(201).json({ data: data });
  });

export const getOne = <modelType>(
  model: Model<any>,
  populateOptions?: string
) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let query = model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const document: modelType | null = await query;
    if (!document) {
      return next(new ApiError(("Document not found"), 404));
    }
    res.status(200).json({ data: document });
  });

export const updateOne = <modelType>(model: Model<any>) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError("Document not found", 404));
    }
    document.save();
    res.status(200).json({ data: document });
  });

export const deleteOne = <modelType>(model: Model<any>) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document: modelType | null = await model.findOneAndDelete({
      _id: req.params.id,
    });
    if (!document) {
      return next(new ApiError(("document not found"), 404));
    }
    res.status(204).json();
  });
