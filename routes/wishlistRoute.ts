import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authController";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
  getUserWishlist,
} from "../controllers/wishlistConroller";
import {
  addToWishlistValidator,
  removeFromWishlistValidator,
} from "../utils/validator/wishlistValidator";

const wishlistRoute: Router = Router();
wishlistRoute.use(protectRoutes, checkActive, allowedTo("user"));
wishlistRoute
  .route("/")
  .get(getUserWishlist)
  .post(addToWishlistValidator, addProductToWishlist);

wishlistRoute
  .route("/:productId")
  .delete(removeFromWishlistValidator, deleteProductFromWishlist);

export default wishlistRoute;
