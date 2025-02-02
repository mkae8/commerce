import { UserModel } from "../../src/database/models/userModel";
import bcrypt from "bcrypt";

export const updatePassword = async (req: any, res: any) => {
  const { userId } = res.locals;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Password update failed", error });
  }
};
