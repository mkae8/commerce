import { Model, Schema, models, model } from "mongoose";

export type OtpModelType = {
  _id: Schema.Types.ObjectId;
  otpCode: number;
  email: string;
  ttl: Date;
};

const OtpSchema = new Schema<OtpModelType>({
  otpCode: { type: Number, required: true },
  email: { type: String, required: true },
  ttl: { type: Date, default: Date.now, expires: 120 },
});

export const OtpModel: Model<OtpModelType> =
  models["Otps"] || model<OtpModelType>("Otps", OtpSchema);
