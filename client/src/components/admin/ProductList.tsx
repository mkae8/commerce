"use client";

import { useState, useEffect } from "react";
import { ProductType } from "../types/ProductType";

export function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // TODO: Fetch products from API
    // For now, we'll use dummy data
    setProducts([
      {
        _id: "1",
        productName: "Sample Product",
        airline: "Sample Airline",
        description: "This is a sample product",
        price: "100",
        image: ["https://example.com/image.jpg"],
        size: "15cm",
        productCategory: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, []);

  const handleDelete = async (id: string) => {
    // TODO: Implement API call to delete product
    console.log("Deleting product:", id);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <ul className="space-y-4">
      {products.map((product) => (
        <li key={product._id} className="border p-4 rounded">
          <h3 className="text-lg font-semibold">{product.productName}</h3>
          <p>Airline: {product.airline}</p>
          <p>Price: {product.price}</p>
          <p>Size: {product.size}</p>
          <button
            onClick={() => handleDelete(product._id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
