"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { toast } from "react-toastify";

interface UserDetail {
  name: string;
  email: string;
}

type UserContextType = {
  loginHandler: (email: string, password: string) => Promise<void>;
  isLoggedIn: boolean;
  token: string;
  globalError: string;
  userDetail: UserDetail | null;
  logOut: () => void;
};

type LoginResponse = {
  token: string;
  user: UserDetail;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>("");
  const [globalError, setGlobalError] = useState<string>("");
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const loginHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    if (typeof window === "undefined") return;

    try {
      if (!email || !password) {
        setGlobalError("И-мэйл хаяг эсвэл нууц үгээ хийнэ үү");
        return;
      }
      const result = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        {
          email,
          password,
        }
      );

      window.localStorage.setItem("token", result.data.token);
      setToken(result.data.token);
      setIsLoggedIn(true);
      setUserDetail(result.data.user);
      router.push("/");
      toast.success("Амжилттай нэвтэрлээ!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setGlobalError(
          error.response.data.message || "Нэвтрэх явцад алдаа гарлаа."
        );
      } else {
        setGlobalError("Нэвтрэх явцад алдаа гарлаа.");
      }
      toast.error("Нэвтрэх явцад алдаа гарлаа.");
    }
  };

  const logOut = () => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.removeItem("token");
      setToken("");
      setIsLoggedIn(false);
      setUserDetail(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <UserContext.Provider
      value={{
        loginHandler,
        isLoggedIn,
        token,
        userDetail,
        globalError,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
};
