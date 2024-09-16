import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} from "../controllers/productsControllers";
import { createProductValidator, getProductValidator, updateProductValidator, deleteProductValidator } from "../utils/validator/productsValidator";
import {
  protectRoutes,
  checkActive,
  allowedTo,
} from "./../controllers/authController";

const productsRoute: Router = Router();
productsRoute
  .route("/")
  .get(getAllProducts)
  .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), 
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

productsRoute
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateProductValidator, updateProduct)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteProductValidator, deleteProduct);

export default productsRoute;
