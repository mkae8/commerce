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
}

export type UserContextType = {
  loginHandler: (email: string, password: string) => Promise<void>;
  isLoggedIn: boolean;
  token: string | null;
  userDetail: UserDetail | null;
  setUserDetail: (user: UserDetail) => void;
  logOut: () => void;
};

type LoginResponse = {
  token: string;
  user: UserDetail;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("userDetail");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUserDetail(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      if (!email || !password) {
        throw new Error("И-мэйл болон нууц үгээ оруулна уу.");
      }

      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userDetail", JSON.stringify(response.data.user));

      setToken(response.data.token);
      setUserDetail(response.data.user);
      setIsLoggedIn(true);

      toast.success("Амжилттай нэвтэрлээ!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Имэйл эсвэл нууц үг буруу байна.");
        } else {
          throw new Error("Серверийн алдаа гарлаа. Дараа дахин оролдоно уу.");
        }
      } else {
        throw new Error("Алдаа гарлаа. Дараа дахин оролдоно уу.");
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetail");
    setToken(null);
    setUserDetail(null);
    setIsLoggedIn(false);
    push("/");
    toast.success("Successfully logged out");
  };

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/register") {
      push("/");
    }
  }, [isLoggedIn, push]);

  return (
    <UserContext.Provider
      value={{
        loginHandler,
        isLoggedIn,
        token,
        userDetail,
        setUserDetail,
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
