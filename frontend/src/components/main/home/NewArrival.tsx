/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/utils/Chip";
import { ArrowRight } from "lucide-react";

export const NewArrival = () => {
  return (
    <div className="flex justify-center items-center min-h-screen py-16 px-4 mx-auto">
      <div className="flex flex-col justify-center items-center gap-[60px]">
        <Chip title="Бараа" desc="Шинээр нэмэгдсэн" />
        <div className="flex gap-[30px]">
          <img
            src="/history/miat787.jpg"
            className="w-[570px] h-[600px] object-cover"
            alt="PSP product"
          />
          <Button variant="link" className="self-start text-red-700 p-0 h-auto">
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="flex flex-col gap-[30px]">
            <img
              src="/history/miat787.jpg"
              className="w-[570px] h-[284px] object-cover"
              alt="Women's product"
            />
            <div className="flex gap-[30px]">
              <img
                src="/history/miat787.jpg"
                className="w-[270px] h-[284px] object-cover"
                alt="Speaker product"
              />
              <img
                src="/history/miat787.jpg"
                className="w-[270px] h-[284px] object-cover"
                alt="Perfume product"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
