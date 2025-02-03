import bcrypt from "bcrypt";
import { UserModel } from "../../../src/database/models/userModel";

export const passwordUpdate = async (req: any, res: any) => {
  const { password, email } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 11);
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found." });
    }
    return res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).send({ message: "Server bolohq bn" });
  }
};
