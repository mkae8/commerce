"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const listArray = [
  {
    logo: "/Logo.png",
    title: "iPhone 14 Series",
    sale: "Up to 10% off Voucher",
    img: "/iphone.png",
    index: 0,
  },
  {
    logo: "/jbLogo.png",
    title: "JBL Boombox ",
    sale: "Up to 10% off Voucher",
    img: "/jbl.png",
    index: 1,
  },
  // {
  //   logo: "/borgioLogo.png",
  //   title: "Боргио ",
  //   sale: "Up to Friday 50% off Voucher",
  //   img: "/borgio.png",
  //   index: 2,
  // },
];

export const Hero = () => {
  const [state, setState] = useState(0);

  return (
    <div className="flex flex-col bg-black w-[892px] h-[344px] relative">
      <div className="w-full h-full transition-all duration-500 ease-in-out">
        {listArray.map((list) => (
          <div
            className={`w-full justify-between  ${
              list.index == state ? "flex" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-4 pt-10 pl-[70px]">
              <div className="flex items-center gap-3">
                <img
                  src={list.logo}
                  alt="Logo"
                  className="w-10 h-[49px] object-contain"
                />
                <p className="text-white">{list.title}</p>
              </div>
              <h1 className="text-[#FAFAFA] text-[48px]">{list.sale}</h1>
              <div className="flex gap-2 items-center">
                <span className="underline text-[#FAFAFA]">Shop Now</span>
                <FaArrowRight className="text-white" />
              </div>
            </div>
            <img
              src={list.img}
              alt="iPhone"
              className="w-[496px] h-[344px] object-contain transition-all duration-500 ease-in-out"
            />
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center gap-2 py-2 absolute top-[90%]">
        {listArray.map((item) => (
          <button
            onClick={() => setState(item.index)}
            className={`border cursor-pointer hover:bg-[#DB4444]  rounded-full w-3 h-3 transition-all duration-1000 ease-in-out ${
              item.index == state ? "bg-[#DB4444]" : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};