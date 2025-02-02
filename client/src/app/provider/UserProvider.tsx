"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { toast } from "react-toastify";

interface UserDetail {
  username: string;
  email: string;
  phoneNumber?: string;
  password?: string;
}

export type UserContextType = {
  loginHandler: (email: string, password: string) => Promise<void>;
  isLoggedIn: boolean;
  token: string;
  globalError: string;
  userDetail: UserDetail;
  setUserDetail: (user: UserDetail) => void;
  logOut: () => Promise<void>;
};

type LoginResponse = {
  token: string;
  user: {
    username: string;
    email: string;
  };
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userDetail, setUserDetail] = useState<UserDetail>({
    username: "",
    email: "",
    phoneNumber: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { push } = useRouter();

  const loginHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    if (typeof window !== "undefined") {
      try {
        if (!email || !password) {
          setError("И-мэйл хаяг эсвэл нууц үгээ хийнэ үү");
          throw new Error("И-мэйл хаяг эсвэл нууц үгээ хийнэ үү");
        }

        const result = await axios.post<LoginResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
          { email, password }
        );

        window.localStorage.setItem("token", result.data.token);
        setToken(result.data.token);
        setIsLoggedIn(true);
        setUserDetail(result.data.user);
        push("/");
        toast.success("Амжилттай нэвтэрлээ!");
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setError(
            error.response.data?.message || "Нэвтрэх явцад алдаа гарлаа."
          );
        } else {
          setError("Нэвтрэх явцад алдаа гарлаа.");
        }
        toast.error("Нэвтрэх явцад алдаа гарлаа.");
        throw error;
      }
    }
  };

  const logOut = async () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userDetail");
        setToken("");
        setIsLoggedIn(false);
        setUserDetail({ username: "", email: "", phoneNumber: "" });

        if (isLoggedIn) {
          push("/register");
        }
      } catch (error) {
        console.log("Logout failed:", error);
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      } else {
        push("/register");
      }
    }
  }, [push]);

  const updateUserDetail = (user: UserDetail) => {
    setUserDetail(user);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("userDetail", JSON.stringify(user));
    }
  };
  console.log(updateUserDetail);

  return (
    <UserContext.Provider
      value={{
        loginHandler,
        isLoggedIn,
        token,
        userDetail,
        setUserDetail,
        globalError: error,
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
