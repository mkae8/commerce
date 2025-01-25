import { UserModel } from "../../src/database/models/userModel";
import bcrypt from "bcrypt";
import env from "dotenv";
import { Response, Request } from "express";

env.config();

export const signupController = async (req: Request, res: Response) => {
  const { username, email, phoneNumber, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 11);

  try {
    const newUser = await UserModel.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    res.status(201).send({ message: " User created seccessfully" });
  } catch (error) {
    res.send({ messae: "Email alreade registered" });
  }
};
