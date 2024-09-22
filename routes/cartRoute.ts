import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authController";
import {
  addProductToCart,
  applyCoupon,
  deleteUserCart,
  getUserCart,
  removeProductFromCart,
  updateProductQuantity,
} from "../controllers/cartController";
import {
  addProductToCartValidator,
  removeProductFromCartValidator,
  updateProductQuantityValidator,
} from "../utils/validator/cartValidator";

const cartRoute: Router = Router();
cartRoute.use(protectRoutes, checkActive, allowedTo("user"));
cartRoute
  .route("/")
  .get(getUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(deleteUserCart);
cartRoute.put("/applyCoupon", applyCoupon);
cartRoute
  .route("/:itemId")
  .put(updateProductQuantityValidator, updateProductQuantity)
  .delete(removeProductFromCartValidator, removeProductFromCart);

export default cartRoute;
