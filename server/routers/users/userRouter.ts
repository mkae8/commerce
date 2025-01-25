import { Router } from "express";
import { signupController } from "../../controllers/usersController/signupController";

const userRouter = Router();

userRouter.route("/user/signup").post(signupController);

export default userRouter;
