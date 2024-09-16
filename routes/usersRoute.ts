import { Router } from "express";
import { changeLoggedUserPassword, changeUserPassword, createUser, deleteUser, getAllUsers, getUser, resizeUserImage, updateLoggedUser, updateUser } from "../controllers/UsersController";
import { createUserValidator, getUserValidator, updateUserValidator, deleteUserValidator, changeUserPasswordValidator, changeLoggedUserPasswordValidator, updateLoggedUserValidator } from './../utils/validator/usersValidator';
import { uploadUserImage, setUserId } from './../controllers/UsersController';
import {
  protectRoutes,
  checkActive,
  allowedTo,
} from "./../controllers/authController";

const usersRoute: Router = Router()

usersRoute.use(protectRoutes, checkActive);

usersRoute.get("/me", setUserId, getUser);

usersRoute.put("/updateMe", updateLoggedUserValidator, updateLoggedUser);

usersRoute.put("/changeMyPassword", changeLoggedUserPasswordValidator, changeLoggedUserPassword);

usersRoute.put("/deleteMe", allowedTo('user'), deleteUserValidator, deleteUser);

usersRoute.use(allowedTo("manager"));

usersRoute.route('/')
.get(getAllUsers)
.post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

usersRoute
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

  usersRoute.put("/:id/changePassword", changeUserPasswordValidator, changeUserPassword)

export default usersRoute;