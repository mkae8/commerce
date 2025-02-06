import { UserModel } from "../../src/database/models/userModel";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

export const signupController = async (req: any, res: any) => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "Имэйл аль хэдийн бүртгэгдсэн байна" });
    }
    const hashedPassword = bcrypt.hashSync(password, 11);
    const newUser = await UserModel.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res
      .status(201)
      .send({ message: "Хэрэглэгчийг амжилттай үүсгэсэн", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};
