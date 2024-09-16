import { FilterData } from "./filterData";
import { Users } from "./usersInterface";

declare module "express" {
  interface Request {
    filterData?: FilterData;
    user?: Users;
    files?: any;
  }
}