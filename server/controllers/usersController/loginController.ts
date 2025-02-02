import { UserModel } from "../../src/database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginController = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Нууц үг эсвэл хэрэглэгчийн имэйл буруу байна" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ message: "Нууц үг эсвэл хэрэглэгчийн имэйл буруу байна" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET as string, {
      expiresIn: "1d",
    });

    const userWithoutPassword = { ...user.toObject(), password: undefined };

    res
      .status(200)
      .send({ message: "Log in successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
