"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой.",
    }),
    email: z.string().email({
      message: "Зөв имэйл хаяг оруулна уу.",
    }),
    phoneNumber: z.string().min(8, {
      message: "Утасны дугаар хамгийн багадаа 8 орон байх ёстой.",
    }),
    password: z.string().min(8, {
      message: "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарахгүй байна.",
    path: ["confirmPassword"],
  });

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/signup`,
        {
          username: values.username,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        }
      );
      if (response) {
        toast.success("Бүртгэл амжилттай үүслээ!");
        form.reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message === "Email already registered") {
          toast.error("Энэ имэйл хаяг аль хэдийн бүртгэгдсэн байна.");
        }
      } else {
        toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нэр</FormLabel>
              <FormControl>
                <Input placeholder="Нэр" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имэйл</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Имэйл@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Утасны дугаар</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Дугаараа оруулна уу"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Нууц үг</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Нууц үгээ оруулна уу"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Баталгаажуулах</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Нууц үгээ дахин оруулна уу"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full rounded-xl bg-white hover:bg-black hover:text-white "
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Бүртгүүлж байна...
            </>
          ) : (
            "Бүртгүүлэх"
          )}
        </Button>
      </form>
    </Form>
  );
};
