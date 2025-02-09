"use client";

import { useState, useEffect } from "react";
import { Size } from "../types/ProductType";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // TODO: Fetch categories from API
    // For now, we'll use dummy data
    setCategories([
      {
        _id: "1",
        categoryName: "sample-category",
        categoryLabel: "Sample Category",
      },
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create/update product
    console.log("Submitting product:", product);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newImages = [...product.image];
    newImages[index] = e.target.value;
    setProduct((prev) => ({ ...prev, image: newImages }));
  };

  const addImageField = () => {
    setProduct((prev) => ({ ...prev, image: [...prev.image, ""] }));
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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Images
        </label>
        {product.image.map((img, index) => (
          <input
            key={index}
            type="text"
            value={img}
            onChange={(e) => handleImageChange(e, index)}
            className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Image
        </button>
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
