"use client";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full h-[440px] bg-[#000000] flex justify-center items-center">
      <div className="max-w-7xl w-full h-full flex justify-between items-center ">
        <div className=" flex flex-col gap-7 w-[217px] h-[188px] text-white ">
          <h1 className="text-[24px] font-semibold">Plane models</h1>
          <span>Subscribe</span>
          <p>Get 10% off your first order</p>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="text-[#FAFAFA] w-[217px] h-[48px] py-3 pl-4 bg-black rounded-[4px] border "
          />
        </div>
        <div className=" flex flex-col gap-5 h-[180px] w-[175px] text-white ">
          <h1 className="text-[20px] font-semibold">Support</h1>
          <span>Mongolia Ulaanbaatar</span>
          <span>mkae.dev@gmail.com</span>
          <span>+976 99000315 </span>
          <span>+976 99170449 </span>
        </div>
        <div className=" flex flex-col gap-3 h-[236px] w-[123px] text-white">
          <h1 className="text-[20px] font-semibold">Account</h1>
          <p>My Account</p>
          <p>Login / Register</p>
          <p> Cart</p>
          <p> Wishlist</p>
          <p> Shop</p>
        </div>

        <div className=" flex flex-col gap-7 text-white">
          <h1 className="text-[20px] font-semibold">Location</h1>
          <p className=" text-[#FAFAFA] text-[12px] opacity-70">
            Save $3 with App New User Only
          </p>
          <div className="flex w-[198px] h-[84px] gap-2">
            <img src="/qr.png" alt="" className="w-20 h-20 object-fit" />
            <div className="flex flex-col gap-1">
              <img
                src="/gplay.png"
                alt=""
                className="w-[110px] h-10 object-cover"
              />
              <img
                src="/appstore.png"
                alt=""
                className="w-[110px] h-10  object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
