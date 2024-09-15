import { Router } from "express";
import { changeUserPassword, createUser, deleteUser, getAllUsers, getUser, resizeUserImage, updateUser } from "../controllers/UsersController";
import { createUserValidator, getUserValidator, updateUserValidator, deleteUserValidator, changeUserPasswordValidator } from './../utils/validator/usersValidator';
import { uploadUserImage } from './../controllers/UsersController';

const usersRoute: Router = Router()

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