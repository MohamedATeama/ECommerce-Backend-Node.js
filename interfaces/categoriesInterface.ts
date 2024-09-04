import { Document } from "mongoose";

export interface Categories extends Document {
  id: number;
  name: string;
  image: string;
}