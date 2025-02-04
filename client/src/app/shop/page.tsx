import { Products } from "@/components/main/shop/Products";
import { TopFilter } from "@/components/main/shop/TopFilter";

const ShopPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TopFilter />
      <Products />
    </div>
  );
};

export default ShopPage;
