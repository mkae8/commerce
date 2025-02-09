"use client";

import { useState, useEffect } from "react";

type Category = {
  _id: string;
  categoryName: string;
  categoryLabel: string;
  createdAt: Date;
  updatedAt: Date;
};

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // TODO: Fetch categories from API
    // For now, we'll use dummy data
    setCategories([
      {
        _id: "1",
        categoryName: "sample-category",
        categoryLabel: "Sample Category",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, []);

  const handleDelete = async (id: string) => {
    // TODO: Implement API call to delete category
    console.log("Deleting category:", id);
    setCategories(categories.filter((c) => c._id !== id));
  };

  return (
    <ul className="space-y-4">
      {categories.map((category) => (
        <li
          key={category._id}
          className="border p-4 rounded flex justify-between items-center"
        >
          <div>
            <span className="font-semibold">{category.categoryLabel}</span>
            <span className="text-sm text-gray-500 ml-2">
              ({category.categoryName})
            </span>
          </div>
          <button
            onClick={() => handleDelete(category._id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
