/* eslint-disable react/jsx-key */
import Image from "next/image";
import { useState } from "react";
const listArray = [
  {
    title: "Boeing 737 max",
    sale: "Up to 10% off sale",
    img: "/737 max.jpg",
    index: 0,
  },
  {
    title: "Boeing 787 ",
    sale: "Up to 10% off sale",
    img: "/787.jpg",
    index: 1,
  },
  {
    title: "An 24",
    sale: "Up to 10% off sale",
    img: "/an24.jpg",
    index: 2,
  },
];
export const Hero = () => {
  const [state, setState] = useState(0);
  return (
    <div className="flex flex-col bg-black w-[892px] h-[344px] relative">
      <div className="w-full h-full transition-all duration-500 ease-in-out">
        {listArray.map((list) => (
          <div
            className={`w-full justify-between ${
              list.index == state ? "flex" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-4 pt-10 pl-[70px]">
              <h1 className="text-[#Fafafa]"> {list.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
