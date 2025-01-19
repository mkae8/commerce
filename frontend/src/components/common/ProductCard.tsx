import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "../types/ProductType";

export const ProductCard = ({ product }: { product: Product }) => (
  <>
    <Card className="group relative overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute text-white flex-col inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-y-2 p-4">
            <Button variant="default" className="w-full border-2">
              Add to favorites <Heart className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="default" className="w-full border-2">
              Add to cart <ShoppingCart className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {product.description}
          </p>
          <p className="font-bold mt-2">${product.price.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  </>
);
