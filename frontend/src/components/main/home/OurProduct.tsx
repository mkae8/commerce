"use client";
import { Chip } from "@/components/utils/Chip";
import { ProductCard } from "../../common/ProductCard";
import { Product } from "../../types/ProductType";
import { Button } from "../../ui/button";

export const products: Product[] = [
  {
    id: 1,
    name: "Boeing 737 Max",
    price: 99000000,
    description: "Short to medium-range commercial passenger jet airliner",
    image: "/737max.JPG",
  },
  {
    id: 2,
    name: "Boeing 787 Dreamliner",
    price: 248300000,
    description: "Long-haul, widebody commercial jet airliner",
    image: "/D787.JPG",
  },
  {
    id: 3,
    name: "Antonov An-24",
    price: 20000000,
    description: "Twin-engine turboprop transport aircraft",
    image: "/an-24.jpg",
  },
  {
    id: 4,
    name: "Boeing 787 Freighter",
    price: 292500000,
    description: "Long-haul, widebody freighter aircraft",
    image: "/787F.JPG",
  },
  {
    id: 5,
    name: "Airbus A320neo",
    price: 110600000,
    description: "Short to medium-range commercial passenger jet airliner",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Embraer E175",
    price: 45700000,
    description: "Narrow-body short to medium-range commercial jet airliner",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Bombardier CRJ900",
    price: 48000000,
    description: "Regional jet airliner",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Airbus A350",
    price: 317400000,
    description: "Long-range, wide-body twin-engine jet airliner",
    image: "/placeholder.svg",
  },
];

export const OurProduct = () => {
  return (
    <section
      className="py-16 px-4 max-w-7xl mx-auto flex flex-col justify-between items-center gap-10 border-b-2"
      aria-labelledby="our-products-heading"
    >
      <div className="flex flex-col items-center space-y-8">
        <Chip title="Бараа" desc="Манай бараа" />

        <div className="flex flex-col space-y-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {products.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Button className="w-[245px] h-[50px] border-blue-400" variant="outline">
        See more
      </Button>
    </section>
  );
};
