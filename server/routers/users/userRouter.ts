import { Router } from "express";
import { signupController } from "../../controllers/usersController/signupController";
import { loginController } from "../../controllers/usersController/loginController";
const userRouter = Router();

userRouter.route("/user/signup").post(signupController);
userRouter.route("/user/login").post(loginController);

export default userRouter;
