import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authController";
import {
  addAddress,
  deleteAddress,
  getUserAddress,
} from "../controllers/addressController";
import {
  addAddressValidator,
  removeAddressValidator,
} from "../utils/validator/addressValidator";

const addressRoute: Router = Router();
addressRoute.use(protectRoutes, checkActive, allowedTo("user"));
addressRoute
  .route("/")
  .get(getUserAddress)
  .post(addAddressValidator, addAddress);

addressRoute.route("/:addressId").delete(removeAddressValidator, deleteAddress);

export default addressRoute;
