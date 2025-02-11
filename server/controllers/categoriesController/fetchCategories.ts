import { categoryModel } from "../../src/database/models/categoryModel";
import { Request, Response } from "express";

export const fetchCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const availableCategories = await categoryModel.find();
    if (!availableCategories) {
      res.status(404).send({ message: "No data in categories" });
      return;
    }
    res
      .status(200)
      .send({ message: "Successfully fetch categories", availableCategories });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed" });
  }
};
