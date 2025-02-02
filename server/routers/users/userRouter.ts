import { Router } from "express";
import { signupController } from "../../controllers/usersController/signupController";
import { loginController } from "../../controllers/usersController/loginController";
import { fetchUser } from "../../controllers/usersController/fetchUser";

import { updateUserData } from "../../controllers/usersController/updateUser";
import { updatePassword } from "../../controllers/usersController/updatePassword";

import { authMiddleware } from "../../middleware/auth";

const userRouter = Router();

userRouter.route("/user/signup").post(signupController);
userRouter.route("/user/login").post(loginController);

userRouter.route("/user/fetch").get(authMiddleware, fetchUser);
userRouter.route("/user/update").put(authMiddleware, updateUserData);
userRouter.route("/update-password").put(authMiddleware, updatePassword);
export default userRouter;
