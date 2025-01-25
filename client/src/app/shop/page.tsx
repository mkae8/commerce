import { Products } from "@/components/main/shop/Products";
import { SideFilter } from "@/components/main/shop/SideFilter";

const page = () => {
  return (
    <div className=" flex max-w-7xl h-100vh py-16 px-4 mx-auto justify-between">
      <SideFilter />
      <Products />
    </div>
  );
};

export default page;
