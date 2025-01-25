import { Model, Schema, models, model } from "mongoose";

export type UsersModelType = {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UsersModelType>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const UserModel: Model<UsersModelType> =
  models["Users"] || model<UsersModelType>("Users", UserSchema);
