import { OtpModel } from "../../../src/database/models/otpModel";

export const checkOtp = async (req: any, res: any) => {
  try {
    const { otpCode, email } = req.body;

    const findOtp = await OtpModel.findOne({ email });
    console.log(findOtp);

    if (!findOtp) {
      return res.status(404).send("Email not found");
    }

    if (findOtp.otpCode === otpCode) {
      return res.status(200).send("Success");
    } else {
      return res.status(400).send("OTP taarahq bn");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server aldaa");
  }
};
