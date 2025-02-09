"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Size } from "../types/ProductType";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import Image from "next/image";
import { PlusCircle, X } from "lucide-react";
import { Button } from "../ui/button";

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

  const [uploadImages, setUploadImages] = useState<(File | null)[]>([]);
  const [images, setImages] = useState<(string | null)[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/fetchCategories`
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const filteredUploadImages = uploadImages.filter((image) => !!image);
      const { data } = await axios.get<{
        uploadUrl: string[];
        accessUrls: string[];
      }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/${filteredUploadImages.length}`
      );

      const { uploadUrl, accessUrls } = data;

      await Promise.all(
        uploadUrl.map(async (url, index) => {
          await axios.put(url, filteredUploadImages[index], {
            headers: {
              "Content-Type": filteredUploadImages[index]?.type,
            },
          });
        })
      );

      setProduct((prev) => ({
        ...prev,
        image: accessUrls,
      }));

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createProduct`, {
        ...product,
        image: accessUrls,
      });

      console.log("Product created successfully!");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
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
      }
    };

  const onImageRemove = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    setUploadImages((prevUploadImages) => {
      const newUploadImages = [...prevUploadImages];
      newUploadImages.splice(index, 1);
      return newUploadImages;
    });
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
          type="text"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
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
                  src={image}
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
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryLabel}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Product
      </button>
    </form>
  );
}
