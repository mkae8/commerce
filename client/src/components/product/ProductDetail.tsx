/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusMinus } from "../common/PlusMinus";

interface ProductDetailProps {
  id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function ProductDetail({
  title,
  images = [],
  price,
  description,
}: ProductDetailProps) {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("20cm");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const mainImage = images[selectedImageIndex] || "/placeholder.svg";

  return (
    <div className="my-16 w-full max-w-6xl mx-auto space-y-16">
      <Card>
        <CardContent className="p-6 sm:p-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-center items-center bg-muted rounded-lg h-[400px]">
                <img
                  src={mainImage || "/placeholder.svg"}
                  alt={title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex justify-center gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 bg-muted rounded-md overflow-hidden ${
                      selectedImageIndex === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${title} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
                <p className="text-muted-foreground">{description}</p>
              </div>
              <div className="space-y-6 mt-8">
                <div>
                  <Label>Size</Label>
                  <RadioGroup
                    value={size}
                    onValueChange={setSize}
                    className="flex flex-wrap gap-4 mt-2"
                  >
                    {["15cm", "20cm", "43cm", "47cm"].map((s) => (
                      <div key={s} className="flex items-center space-x-2">
                        <RadioGroupItem value={s} id={`size-${s}`} />
                        <Label htmlFor={`size-${s}`}>{s}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <PlusMinus count={count} setCount={setCount} />
                  <Button className="flex-grow">Add to Cart</Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
