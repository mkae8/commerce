import { UserModel } from "../../src/database/models/userModel";
import { Request, Response } from "express";

export const updateUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = res.locals;
  const { username, email, phoneNumber } = req.body;
  try {
    const existingEmail = await UserModel.findOne({
      email,
      _id: { $ne: userId },
    });
    if (existingEmail) {
      res.status(400).send({ message: "This email has already been taken" });
      return;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { username, email, phoneNumber },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).send({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    res.status(200).send({ message: "Шинэчлэлт амжилттай", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Update failed", error });
  }
};
