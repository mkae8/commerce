import { Router } from "express";
import { signupController } from "../../controllers/usersController/signupController";
import { loginController } from "../../controllers/usersController/loginController";
import { fetchUser } from "../../controllers/usersController/fetchUser";

import { updateUserData } from "../../controllers/usersController/updateUser";
import { updatePassword } from "../../controllers/usersController/updatePassword";

import { sendEmailController } from "../../controllers/usersController/fotgotPassword/sendEmail";
import { checkOtp } from "../../controllers/usersController/fotgotPassword/userOtpCheck";

import { passwordUpdate } from "../../controllers/usersController/fotgotPassword/passwordUpdate";

import { authMiddleware } from "../../middleware/auth";

const userRouter = Router();

userRouter.route("/user/signup").post(signupController);
userRouter.route("/user/login").post(loginController);

userRouter.route("/user/fetch").get(authMiddleware, fetchUser);
userRouter.route("/user/update").put(authMiddleware, updateUserData);
userRouter.route("/update-password").put(authMiddleware, updatePassword);

// ---->> Forget password routers

userRouter.route("/check").post(checkOtp);
userRouter.route("/sendMailer").post(sendEmailController);
userRouter.route("/passwordUpdate").put(passwordUpdate);
export default userRouter;
