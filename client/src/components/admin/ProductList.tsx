/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loading } from "../utils/Loading";
import { Trash2, Edit } from "lucide-react";

export type ProductType = {
  _id: string;
  productName: string;
  airline: string;
  description: string;
  price: string;
  image: string[];
  size: string;
  productCategory: string;
};

export const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<ProductType[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/fetch-products`
        );

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          throw new Error("Received data is not an array");
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-product/${id}`
      );
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {products.map((product) => (
        <li
          key={product._id}
          className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            <div className="w-24 h-24 relative flex-shrink-0">
              <img
                src={
                  product.image && product.image.length > 0
                    ? product.image[0]
                    : "/placeholder.svg?height=300&width=300"
                }
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Airline: {product.airline}
                  </p>
                  <p className="text-sm text-gray-600">Size: {product.size}</p>
                  <p className="text-sm text-gray-600">
                    Category: {product.productCategory}
                  </p>
                  <p className="mt-2 text-sm">{product.description}</p>
                </div>
                <p className="text-xl font-bold">${product.price}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  onClick={() => handleDelete(product._id)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
