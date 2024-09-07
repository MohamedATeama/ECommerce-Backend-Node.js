import { Model } from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { FilterData } from '../interfaces/filterData';
import { Request } from 'express';
import { Response } from 'express';
import { NextFunction } from 'express';
import ApiError from '../utils/apiError';

export const getAll = <modelType> (model: Model<any>, modelName: string) =>
  expressAsyncHandler(async (req:Request, res:Response, next: NextFunction) => {
    let filterData: any = {};
    if (req.filterData) {
      filterData = req.filterData;
    }
    const data: modelType[] = await model.find(filterData);
    res.status(200).json({ data: data });
  });

export const createOne = <modelType>(model: Model<any>) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: modelType = await model.create(req.body);
    res.status(201).json({ data: data });
  });

export const getOne = <modelType>(model: Model<any>) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: modelType | null = await model.findById(
      req.params.id
    );
    if (!data) {
      return (next(new ApiError("No Data Found!", 404)))
    }
    res.status(200).json({ data: data });
  });

export const updateOne = <modelType>(model: Model<any>) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: modelType | null =
      await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return next(new ApiError("No Data Found!", 404));
      }
    res.status(200).json({ data: data });
  });

export const deleteOne = <modelType>(model: Model<any>) =>
  expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: modelType | null =
      await model.findByIdAndDelete(req.params.id);
      if (!data) {
        return next(new ApiError("No Data Found!", 404));
      }
    res.status(204).json();
  });
