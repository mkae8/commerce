import { UserModel } from "../../src/database/models/userModel";

export const fetchUser = async (req: any, res: any) => {
  const { userId } = res.locals;

  try {
    const user = await UserModel.findById(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch user" });
  }
};
