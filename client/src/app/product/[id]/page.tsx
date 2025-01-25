import { ProductDetail } from "@/components/product/ProductDetail";

const getProductDetails = async (id: string) => {
  return {
    id,
    title: "Airbus A320neo",
    images: ["/737max.JPG", "/placeholder.svg", "/placeholder.svg"],
    price: 3000,
    description:
      "The Airbus A320neo (new engine option) is a narrow-body airliner developed by Airbus. It is the latest generation of the A320 family, offering improved fuel efficiency and reduced operating costs.",
    rating: { count: 5, rate: 4.5 },
  };
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductDetails(params.id);

  return (
    <div>
      <ProductDetail {...product} />
    </div>
  );
}
