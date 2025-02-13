"use client";

import { ProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";

const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl ">
          <ProductForm />
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Product List</h2>
          <div className="h-[600px] overflow-y-auto">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
