"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PasswordUpdate } from "./PasswordUpdate";

import axios from "axios";
import { useUser } from "@/app/provider/UserProvider";
import { toast } from "react-toastify";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EnhancedUserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { token, logOut, userDetail, setUserDetail = () => {} } = useUser();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    control: controlProfile,
    formState: { errors: errorsProfile },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userDetail?.username || "",
      email: userDetail?.email || "",
      phoneNumber: userDetail?.phoneNumber || "",
    },
  });

  useEffect(() => {
    if (userDetail) {
      reset({
        name: userDetail.username || "",
        email: userDetail.email || "",
        phoneNumber: userDetail.phoneNumber || "",
      });
    }
  }, [userDetail, reset]);

  useEffect(() => {
    const fetchUserData = async () => {
      let token;
      if (typeof window !== "undefined") {
        token = window.localStorage.getItem("token");
      }
      if (!token) {
        toast.error("You need to be logged in to access profile information.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/fetch`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setUserDetail(response.data);
        localStorage.setItem("userDetail", JSON.stringify(response.data));
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error("Failed to load user data.");
      }
    };

    fetchUserData();
  }, [setUserDetail]);

  async function onSubmitProfile(data: ProfileFormValues) {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetail(response.data);
      localStorage.setItem("userDetail", JSON.stringify(response.data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          User Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <form
              onSubmit={handleSubmitProfile(onSubmitProfile)}
              className="space-y-8"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...registerProfile("name")} />
                {errorsProfile.name && (
                  <p className="text-sm text-red-500">
                    {errorsProfile.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...registerProfile("email")} />
                {errorsProfile.email && (
                  <p className="text-sm text-red-500">
                    {errorsProfile.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Controller
                  name="phoneNumber"
                  control={controlProfile}
                  render={({ field }) => <Input id="phoneNumber" {...field} />}
                />
                {errorsProfile.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {errorsProfile.phoneNumber.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="password">
            <PasswordUpdate />
          </TabsContent>
        </Tabs>
        <Button onClick={logOut} className="w-full mt-4" variant="destructive">
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}
