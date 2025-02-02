import { UserModel } from "../../src/database/models/userModel";

export const updateUserData = async (req: any, res: any) => {
  const { userId } = res.locals;
  const { username, email, phoneNumber } = req.body;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, phoneNumber },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Update successful", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Update failed", error });
  }
};
