import { ProductModel } from "../../src/database/models/productModel";
import { Request, Response } from "express";

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Id is required" });
    return;
  }

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      res.status(404).send({ message: "Product not found" });
      return;
    }
    const deleteResult = await ProductModel.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 0) {
      res.status(404).send({ message: "Product not found" });
      return;
    }

    res.status(200).send({ message: "Амжилттай устгалаа" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "An error occurred while deleting product" });
    return;
  }
};
