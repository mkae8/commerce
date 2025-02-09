import { CategoryForm } from "@/components/admin/CategoryForm";
import { CategoryList } from "@/components/admin/CategoryList";

export default function AdminCategoriesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Category Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
          <CategoryForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Category List</h2>
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
