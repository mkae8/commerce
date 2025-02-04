"use client";

import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { Product } from "../types/ProductType";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleViewProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={`absolute inset-0  flex flex-col justify-between p-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex justify-end items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10  bg-accent "
            >
              <Heart
                style={{
                  width: "20px",
                  height: "20px",
                  color: "white",
                }}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-[50px] w-[50px]"
              onClick={handleViewProduct}
            >
              <Eye style={{ width: "20px", height: "20px", color: "white" }} />
            </Button>
          </div>
          <Button
            className="w-full bg-green-400 text-black hover:text-white hover:bg-green-600"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-blue-600 font-bold">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
