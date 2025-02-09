import { UserModel } from "../../src/database/models/userModel";
import bcrypt from "bcrypt";
import env from "dotenv";
import { Request, Response } from "express";

env.config();

export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(409).send({ message: "Имэйл аль хэдийн бүртгэгдсэн байна" });
      return;
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
