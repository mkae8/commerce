"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { TabsContent } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useUser } from "@/app/provider/UserProvider";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export const PasswordUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useUser();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword, isValid },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const onSubmitPassword = async (data: PasswordFormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Нууц үг амжилттай шинэчлэгдлээ");
        reset();
      } else {
        throw new Error("Failed to update password");
      }
    } catch (error) {
      console.log("Error updating password:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Гэнэтийн алдаа гарлаа");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="password">
      <form
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        className="space-y-8"
      >
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              {...registerPassword("currentPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errorsPassword.currentPassword && (
            <p className="text-sm text-red-500">
              {errorsPassword.currentPassword.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              {...registerPassword("newPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errorsPassword.newPassword && (
            <p className="text-sm text-red-500">
              {errorsPassword.newPassword.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...registerPassword("confirmPassword")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errorsPassword.confirmPassword && (
            <p className="text-sm text-red-500">
              {errorsPassword.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className={`w-full rounded-xl text-white ${
            isValid
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? "Changing Password..." : "Change Password"}
        </Button>
      </form>
    </TabsContent>
  );
};
