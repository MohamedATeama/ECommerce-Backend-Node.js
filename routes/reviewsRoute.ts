import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authController";
import {
  createReview,
  deleteReview,
  filterReviews,
  getAllReviews,
  getReview,
  setProductAndUserId,
  updateReview,
} from "../controllers/reviewsControllers";
import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
} from "../utils/validator/reviewsValidator";

const reviewsRoute: Router = Router({ mergeParams: true });
reviewsRoute
  .route("/")
  .get(filterReviews, getAllReviews)
  .post(
    protectRoutes,
    checkActive,
    allowedTo("user"),
    setProductAndUserId,
    createReviewValidator,
    createReview
  );

reviewsRoute.get(
  "/me",
  protectRoutes,
  checkActive,
  allowedTo("user"),
  filterReviews,
  getAllReviews
);

reviewsRoute
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(
    protectRoutes,
    checkActive,
    allowedTo("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(protectRoutes, checkActive, deleteReviewValidator, deleteReview);

export default reviewsRoute;
