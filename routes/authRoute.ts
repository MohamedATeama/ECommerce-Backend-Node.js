import { Router } from "express";
import { login, signup } from "../controllers/authController";
import { loginValidator, signupValidator } from "../utils/validator/authValidator";

const authRoute: Router = Router()

authRoute.post('/signup', signupValidator, signup);
authRoute.post('/login', loginValidator, login);

export default authRoute;