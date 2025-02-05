import { Model, Schema, models, model, Types } from "mongoose";

enum Size {
  Small = "15cm",
  Medium = "20cm",
  Large = "37cm",
  XL = "40cm",
  XXL = "47cm",
}

export type ProductType = {
  _id: Types.ObjectId;
  productName: string;
  airline: string;
  description: string;
  price: string;
  image: string[];
  size: Size;
  productCategory: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const ProductSchema = new Schema<ProductType>(
  {
    productName: { type: String, required: true },
    airline: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: [String], required: true },
    size: { type: String, enum: Object.values(Size), required: true },
    productCategory: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const ProductModel: Model<ProductType> =
  models["Products"] || model<ProductType>("Products", ProductSchema);
