import { ProductModel } from "../../src/database/models/productModel";
import { Request, Response } from "express";

export const fetchProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await ProductModel.find();
    if (!products.length) {
      res.status(404).send({ message: "No products found" });
      return;
    }
    res.status(200).send(products);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};
