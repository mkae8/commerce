import { Model, Schema, models, model } from "mongoose";

export type UserModelType = {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserModelType>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, required: false, default: false },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

export const UserModel: Model<UserModelType> =
  models["Users"] || model<UserModelType>("Users", UserSchema);
