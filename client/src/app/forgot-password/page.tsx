"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/utils/Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      toast.error("Имэйлээ оруулна уу");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sendMailer`, {
        email,
      });
      localStorage.setItem("email", JSON.stringify(email));
      toast.success("Имэйл илгээсэн. Cпам хайрцагаа шалгана уу");
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response);

        toast.error(
          error.response.data.message || "Имэйл илгээхэд алдаа гарлаа"
        );
      } else {
        toast.error("Имэйл олдсонгүй");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    if (otpCode.length !== 4) {
      toast.error("Бүрэн OTP кодоо оруулна уу");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/check`,
        {
          otpCode: Number(otpCode),
          email,
        }
      );

      if (res.status === 200) {
        toast.success("Амжилттай баталгаажууллаа");
        setStep(3);
      }
    } catch (error) {
      console.log("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Баталгаажуулж чадсангүй");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setError("");
    if (!password || !rePassword) {
      setError("Дутуу бөглөсөн байна !");
      return;
    }
    if (password !== rePassword) {
      setError("Нууц үг таарахгүй байна");
      return;
    }
    if (password.length < 8) {
      setError("Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/passwordUpdate`, {
        email,
        password,
      });
      toast.success("Нууц үг амжилттай шинэчлэгдлээ");
      router.push("/register");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Амжилгүй боллоо. Дахин оролдоно уу!");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push("/register");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8  shadow-md w-[448px] rounded-xl ">
        {step === 1 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Нууц үг сэргээх
            </h2>
            <div className="mb-6 flex items-center justify-center">
              <Input
                name="email"
                type="email"
                className="w-full "
                placeholder="Бүртгэлтэй имэйл хаягаа оруулна уу"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={handleBackClick}>
                Буцах
              </Button>
              <Button
                className={`w-1/3 flex justify-end  rounded-xl text-white ${
                  email.trim()
                    ? "bg-green-500 hover:bg-green-600 hover:text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                variant="ghost"
                onClick={handleEmailSubmit}
                disabled={!email.trim() || loading}
              >
                Үргэлжлүүлэх
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Нууц үг сэргээх
            </h2>
            <div className="mb-6">
              <p className="text-center text-gray-600 mb-4">
                Таны <span className="text-green-500 ">{email}</span> хаяг руу
                сэргээх код илгээх болно.
              </p>
              <div className="flex justify-center items-center gap-8 mb-4 ">
                <InputOTP
                  maxLength={4}
                  value={otpCode}
                  onChange={(value) => setOtpCode(value)}
                >
                  <InputOTPGroup className="flex gap-4">
                    {[...Array(4)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className=" w-12 h-12 border border-gray-200 flex"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={handleBackClick}>
                Буцах
              </Button>
              <Button
                className={`w-1/3 flex justify-end  rounded-xl text-white ${
                  otpCode.length === 4
                    ? "bg-green-500 hover:bg-green-600 hover:text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                variant="ghost"
                onClick={handleOtpSubmit}
                disabled={otpCode.length !== 4 || loading}
              >
                Үргэлжлүүлэх
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Шинэ нууц үг зохиох
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Нууц үг (хамгийн багадаа 8 тэмдэгт)"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Input
                name="rePassword"
                type="password"
                placeholder="Нууц үг давтах"
                onChange={(e) => setRePassword(e.target.value)}
                value={rePassword}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex justify-between items-center mt-6">
              <Button variant="ghost" onClick={handleBackClick}>
                Буцах
              </Button>
              <Button
                className={`w-1/4 flex justify-end  rounded-xl text-white ${
                  otpCode.length === 4
                    ? "bg-green-500 hover:bg-green-600 hover:text-white"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                variant="ghost"
                onClick={handlePasswordSubmit}
              >
                Хадгалах
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
