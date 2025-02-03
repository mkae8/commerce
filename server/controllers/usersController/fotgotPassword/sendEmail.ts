import nodemailer from "nodemailer";
import express from "express";
import cors from "cors";
import { UserModel } from "../../../src/database/models/userModel";
import env from "dotenv";
import { OtpModel } from "../../../src/database/models/otpModel";

env.config();

const app = express();
app.use(express.json());
app.use(cors());

const emailSender = async (
  sendEmail: string,
  subject: string,
  html: string,
  text: string
) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: process.env.EMAIL_USER,
    to: sendEmail,
    subject: subject,
    text: text,
    html: html,
  };

  await transport.sendMail(options);
};

export const sendEmailController = async (req: any, res: any) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const OTP = Math.floor(1000 + Math.random() * 9000);

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    // Check if an OTP has already been sent
    const existingOtp = await OtpModel.findOne({ email });

    if (existingOtp) {
      return res.status(400).json({ message: "OTP has already been sent" });
    }

    // Save the OTP to the database
    await OtpModel.create({ email, otpCode: OTP });

    // Send the OTP via email
    await emailSender(
      email,
      "Таны OTP нууц үг",
      `
        <div style="font-family: Helvetica, Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #00466a; font-size: 24px; margin-bottom: 20px;">Таны нэг удаагийн нууц үг</h2>
          <div style="color: green; font-size: 48px; font-weight: bold; border: 2px solid green; border-radius: 8px; padding: 20px; display: inline-block;">
            ${OTP}
          </div>
          <p style="font-size: 16px; margin-top: 20px;">Энэхүү OTP нь богино хугацаанд хүчинтэй. </p>
        </div>
      `,
      `Your OTP is: ${OTP}`
    );

    // Send success response
    res.status(201).json({ message: "Имэйл илгээсэн" });
  } catch (error) {
    console.error("Error in sendEmailController:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
