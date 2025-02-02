"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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

import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider/UserProvider";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({
    message: "Зөв имэйл хаяг оруулна уу.",
  }),
  password: z.string().min(8, {
    message: "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.",
  }),
});

export const LoginForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginHandler } = useUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setIsLoading(true);
    try {
      await loginHandler(values.email, values.password);
      form.reset();
      router.push("/");
    } catch {
      toast.error("Email or password is not match");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex items-center justify-between">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline text-end w-full"
          >
            Нууц үгээ мартсан уу?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full rounded-xl bg-white hover:bg-black hover:text-white"
          disabled={isLoading}
        >
          {isLoading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
        </Button>
      </form>
    </Form>
  );
};
