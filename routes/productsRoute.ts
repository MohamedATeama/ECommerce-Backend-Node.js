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

const productsRoute: Router = Router();
productsRoute
  .route("/")
  .get(getAllProducts)
  .post(
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

productsRoute
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default productsRoute;
