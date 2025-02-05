import { Model, Schema, model, Types, models } from "mongoose";

export type CategoriesModelType = {
  _id: Types.ObjectId;
  categoryName: string;
  categoryLabel: string;
  createdAt: Date;
  updatedAt: Date;
};

const CategorySchema = new Schema<CategoriesModelType>(
  {
    categoryName: { type: String, unique: true, required: true },
    categoryLabel: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export const categoryModel: Model<CategoriesModelType> =
  models["Category"] || model<CategoriesModelType>("Category", CategorySchema);
