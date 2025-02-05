import { categoryModel } from "../../src/database/models/categoryModel";
import env from "dotenv";

env.config();

export const categoryCreate = async (req: any, res: any) => {
  const { categoryName, categoryLabel } = req.body;

  if (!categoryName || !categoryLabel) {
    return res
      .status(400)
      .send({ message: "categoryName and categoryLabel are required" });
  }

  try {
    const newCategory = await categoryModel.create({
      categoryName,
      categoryLabel,
    });

    res.status(200).send({ message: "Success", newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed", error });
  }
};
