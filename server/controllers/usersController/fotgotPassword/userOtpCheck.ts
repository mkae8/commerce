import { OtpModel } from "../../../src/database/models/otpModel";

export const checkOtp = async (req: any, res: any) => {
  try {
    const { otpCode, email } = req.body;

    if (!otpCode || !email) {
      return res
        .status(400)
        .send({ message: "OTP code and email are required" });
    }
    const findOtp = await OtpModel.findOne({ email });

    if (!findOtp) {
      return res.status(404).send({ message: "Email not found" });
    }

    if (findOtp.otpCode === otpCode) {
      return res.status(200).send({ message: "OTP verification successful" });
    } else {
      return res.status(400).send({ message: "OTP код буруу байна " });
    }
  } catch (error) {
    console.error("Error in checkOtp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
