import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authController";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "../controllers/couponsController";
import {
  createCouponValidator,
  deleteCouponValidator,
  getCouponValidator,
  updateCouponValidator,
} from "../utils/validator/couponsValidator";

const couponsRoute: Router = Router();
couponsRoute.use(protectRoutes, checkActive, allowedTo("manager", "admin"));
couponsRoute
  .route("/")
  .get(getAllCoupons)
  .post(createCouponValidator, createCoupon);

couponsRoute
  .route("/:id")
  .get(getCouponValidator, getCoupon)
  .put(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

export default couponsRoute;
