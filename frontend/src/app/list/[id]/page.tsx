import { ProductDetail } from "@/components/product/ProductDetail";

const page = () => {
  return (
    <div>
      <ProductDetail
        id="123"
        title="hehe"
        image="123"
        price={3000}
        description="hehe"
        rating={{ count: 5, rate: 5 }}
      />
    </div>
  );
};

export default page;
