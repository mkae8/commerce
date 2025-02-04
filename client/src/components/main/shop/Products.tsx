"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/common/ProductCard";
import { Chip } from "@/components/utils/Chip";

interface Product {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  description: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 2,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 3,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 4,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 5,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 6,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 7,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 8,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
  {
    id: 9,
    name: "Mongolian Airlines Boeing 787",
    price: 2500,
    size: "47cm",
    image: "/787F.JPG",
    description: "A detailed description of the product.",
  },
];

export function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(productsData.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full max-w-7xl mt-10">
      <Chip title="Product" desc="Product" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
