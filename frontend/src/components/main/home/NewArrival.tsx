"use client";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/utils/Chip";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const NewArrival = () => {
  return (
    <section className="py-16 px-4 mx-auto max-w-7xl">
      <div className="flex flex-col items-center gap-12">
        <Chip title="Бараа" desc="Шинээр нэмэгдсэн" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group">
            <Image
              src="/history/miat787.jpg"
              width={570}
              height={600}
              className="w-full h-[600px] object-cover rounded-lg"
              alt="MIAT Boeing 787"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="font-semibold text-white"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-8">
            <div className="relative group">
              <Image
                src="/history/miat787.jpg"
                width={570}
                height={284}
                className="w-full h-[284px] object-cover rounded-lg"
                alt="MIAT Boeing 787"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="font-semibold text-white"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="relative group">
                <Image
                  src="/history/miat787.jpg"
                  width={270}
                  height={284}
                  className="w-full h-[284px] object-cover rounded-lg"
                  alt="MIAT Boeing 787"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="font-semibold text-white"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative group">
                <Image
                  src="/history/miat787.jpg"
                  width={270}
                  height={284}
                  className="w-full h-[284px] object-cover rounded-lg"
                  alt="MIAT Boeing 787"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="font-semibold text-white"
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
