import { ProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          <ProductForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Product List</h2>
          <ProductList />
        </div>
      </div>
    </div>
  );
}
