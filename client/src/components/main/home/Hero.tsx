"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const listArray = [
  {
    title: "Boeing 737 Max",
    sale: "Up to 10% off sale",
    img: "/737max.JPG",
    index: 0,
  },
  {
    title: "Boeing 787 Freighter",
    sale: "Up to 10% off sale",
    img: "/787F.JPG",
    index: 1,
  },
  {
    title: "Boeing 787 Dreamliner",
    sale: "Up to 10% off sale",
    img: "/D787.JPG",
    index: 2,
  },
  // {
  //   title: "Antonov 24",
  //   sale: "Up to 10% off sale",
  //   img: "/an-24.jpg",
  //   index: 3,
  // },
] as const;

export const Hero = () => {
  const [state, setState] = useState(0);

  const nextSlide = useCallback(() => {
    setState((prev) => (prev + 1) % listArray.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      className="bg-black max-w-7xl mx-auto h-[500px] relative mt-10"
      aria-label="Featured aircraft deals"
    >
      {listArray.map((list) => (
        <div
          key={list.index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            list.index === state
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={list.index !== state}
        >
          <div className="flex h-full">
            <div className="flex flex-col justify-center gap-4 p-10 md:p-20">
              <p className="text-white text-lg md:text-xl">{list.title}</p>
              <h2 className="text-[#FAFAFA] text-3xl md:text-5xl font-semibold">
                {list.sale}
              </h2>
              <Link href="/shop">
                <Button
                  variant="link"
                  className="self-start text-[#FAFAFA] p-0 h-auto"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-1 relative">
              <Image
                src={list.img || "/placeholder.svg"}
                alt={list.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={list.index === 0}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 py-4">
        {listArray.map((item) => (
          <button
            key={item.index}
            onClick={() => setState(item.index)}
            className={`border-2 rounded-full w-3 h-3 transition-all duration-500 ease-linear ${
              item.index === state
                ? "bg-red-400"
                : "bg-transparent hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${item.index + 1}`}
            aria-current={item.index === state}
          ></button>
        ))}
      </div>
    </section>
  );
};
