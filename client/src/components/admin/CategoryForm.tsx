"use client";

import { useState } from "react";

export function CategoryForm() {
  const [category, setCategory] = useState({
    categoryName: "",
    categoryLabel: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create category
    console.log("Creating category:", category);
    setCategory({ categoryName: "", categoryLabel: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="categoryName"
          className="block text-sm font-medium text-gray-700"
        >
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={category.categoryName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="categoryLabel"
          className="block text-sm font-medium text-gray-700"
        >
          Category Label
        </label>
        <input
          type="text"
          id="categoryLabel"
          name="categoryLabel"
          value={category.categoryLabel}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Category
      </button>
    </form>
  );
}
