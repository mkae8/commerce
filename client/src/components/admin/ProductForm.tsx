/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { useState, useEffect, type ChangeEvent } from "react";
import { Size } from "../types/ProductType";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Image from "next/image";
import { PlusCircle, X, Plane, DollarSign, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loading } from "../utils/Loading";

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

      if (res.data.availableCategories) {
        setCategories(res.data.availableCategories);
      } else {
        console.error("No available categories found");
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" p-6 bg-white rounded-2xl shadow-xl"
      // bg-gradient-to-br from-purple-50 to-indigo-50
    >
      <h2 className="text-3xl font-bold text-center mb-8 ">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="productName" className="block text-sm font-medium ">
              Product Name
            </label>
            <Input
              type="text"
              id="productName"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="airline" className="block text-sm font-medium ">
              Airline
            </label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <Input
                type="text"
                id="airline"
                name="airline"
                value={product.airline}
                onChange={handleChange}
                required
                className="w-full pl-10 rounded-xl border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium ">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full rounded-xl border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium ">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <Input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full pl-10 rounded-xl border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="size" className="block text-sm font-medium ">
              Size
            </label>
            <div className="relative">
              <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" />
              <select
                id="size"
                name="size"
                value={product.size}
                onChange={handleChange}
                required
                className="w-full pl-10 h-[38px] rounded-xl border border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200 appearance-none"
              >
                {Object.entries(Size).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key} ({value})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="productCategory"
            className="block text-sm font-medium "
          >
            Product Category
          </label>
          <select
            id="productCategory"
            name="productCategory"
            value={product.productCategory}
            onChange={handleChange}
            required
            className="w-full rounded-xl h-[38px] border border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
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
        <div className="space-y-2">
          <label className="block text-sm font-medium ">Images</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <label className="block w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-indigo-300 hover:border-indigo-500 transition-colors duration-200 cursor-pointer">
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
                    <div className="flex flex-col items-center justify-center h-full text-indigo-500">
                      <PlusCircle className="w-8 h-8 mb-2" />
                      <span className="text-sm font-medium">Add Image</span>
                    </div>
                  )}
                </label>
                {image && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 hover:bg-red-400 text-white rounded-xl bg-red-500 border-dotted duration-200"
                    onClick={() => onImageRemove(index)}
                  >
                    <X style={{ width: "20px", height: "20px" }} />
                    <span className="sr-only">Remove image</span>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          Create Product
        </Button>
      </form>
    </motion.div>
  );
}
