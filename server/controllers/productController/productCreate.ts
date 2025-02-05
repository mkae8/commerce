import { ProductModel } from "../../src/database/models/productModel";

import env from "dotenv";
env.config();

export const productCreate = async (req: any, res: any) => {
  const {
    productName,
    airline,
    description,
    price,
    image,
    size,
    productCategory,
  } = req.body;

  if (!productName || !airline || !description || !price || !image || !size) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const newProduct = await ProductModel.create({
      productName,
      airline,
      description,
      price,
      image,
      size,
      productCategory,
    });

    res.send({ message: "Successfully created", newProduct }).status(200);
  } catch (error) {
    console.log(error);
    res.send("Failed", error).status(500);
  }
};
