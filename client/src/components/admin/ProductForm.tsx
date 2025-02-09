/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { useState, useEffect, type ChangeEvent } from "react";
import { Size } from "../types/ProductType";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import Image from "next/image";
import { PlusCircle, X, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

type Category = {
  _id: string;
  categoryName: string;
  categoryLabel: string;
};

export function ProductForm() {
  const [product, setProduct] = useState({
    productName: "",
    airline: "",
    description: "",
    price: "",
    image: [""],
    size: Size.Small,
    productCategory: "",
  });

  const [uploadImages, setUploadImages] = useState<(File | null)[]>([null]);
  const [images, setImages] = useState<(string | null)[]>([null]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/fetchCategories`
      );
      console.log("Fetched Categories:", res.data);

      if (res.data.availableCategories) {
        setCategories(res.data.availableCategories);
      } else {
        console.error("No available categories found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []); //Fixed useEffect dependency issue

  const handleUpload = async () => {
    const filteredUploadImages = uploadImages.filter((image) => !!image);
    const { data } = await axios.get<{
      uploadUrl: string[];
      accessUrls: string[];
    }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/${filteredUploadImages.length}`
    );
    console.log(data);

    const uploadUrls = data.uploadUrl;
    const imageArray = data.accessUrls;

    try {
      await Promise.all(
        uploadUrls.map(async (uploadUrl: string, index: number) => {
          await axios.put(uploadUrl, filteredUploadImages[index], {
            headers: {
              "Content-Type": filteredUploadImages[index]?.type,
            },
          });
        })
      );
      console.log("Uploaded image URLs:", imageArray);
      return imageArray;
    } catch (error) {
      console.error("Error uploading file:", error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const accessUrls = await handleUpload();
      const filteredUploadImages = uploadImages.filter(
        (image) => image !== null
      );

      if (filteredUploadImages.length > 0) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/create`,
          {
            ...product,
            image: accessUrls,
          }
        );
        console.log("Product created:", response.data);
        toast.success("Product created successfully!");
        resetForm();
      } else {
        toast.error("Please upload at least one image.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to create product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setProduct({
      productName: "",
      airline: "",
      description: "",
      price: "",
      image: [""],
      size: Size.Small,
      productCategory: "",
    });
    setUploadImages([null]);
    setImages([null]);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setUploadImages((prev) => {
          const newUploadImages = [...prev];
          newUploadImages[index] = file;
          return newUploadImages;
        });
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);

        if (index === images.length - 1) {
          setUploadImages((prev) => [...prev, null]);
          setImages((prev) => [...prev, null]);
        }
      }
    };

  const onImageRemove = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
    setUploadImages((prev) => {
      const newUploadImages = [...prev];
      newUploadImages.splice(index, 1);
      return newUploadImages;
    });

    if (images.length === 1) {
      setUploadImages([null]);
      setImages([null]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <Input
          type="text"
          id="productName"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="airline"
          className="block text-sm font-medium text-gray-700"
        >
          Airline
        </label>
        <Input
          type="text"
          id="airline"
          name="airline"
          value={product.airline}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <Input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <label className="block w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-200 cursor-pointer">
              <input
                type="file"
                onChange={onImageChange(index)}
                className="hidden"
                accept="image/*"
              />
              {image ? (
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <PlusCircle className="w-8 h-8 mb-2" />
                  <span className="text-sm font-medium">ЗУРАГ НЭМЭХ</span>
                </div>
              )}
            </label>
            {image && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => onImageRemove(index)}
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            )}
          </div>
        ))}
      </div>
      <div>
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700"
        >
          Size
        </label>
        <select
          id="size"
          name="size"
          value={product.size}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {Object.entries(Size).map(([key, value]) => (
            <option key={key} value={value}>
              {key} ({value})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="productCategory"
          className="block text-sm font-medium text-gray-700"
        >
          Product Category
        </label>
        <select
          id="productCategory"
          name="productCategory"
          value={product.productCategory}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryLabel}
              </option>
            ))}
        </select>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Product...
          </>
        ) : (
          "Create Product"
        )}
      </Button>
    </form>
  );
}
