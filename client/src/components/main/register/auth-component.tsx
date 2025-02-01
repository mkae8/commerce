"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login-form";
import { SignUpForm } from "./sing-up-form";

export default function AuthComponent() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Login or create an account to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="login">Нэвтрэх</TabsTrigger>
            <TabsTrigger value="signup">Бүртгүүлэх</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {activeTab === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="text-primary cursor-pointer hover:underline"
            onClick={() =>
              setActiveTab(activeTab === "login" ? "signup" : "login")
            }
          >
            {activeTab === "login" ? "Sign up" : "Log in"}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
