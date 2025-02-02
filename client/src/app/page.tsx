import { OurProduct } from "@/components/main/home/OurProduct";
import { Hero } from "@/components/main/home/Hero";
import { AircraftHistory } from "@/components/main/home/AircraftHistory";
import { NewArrival } from "@/components/main/home/NewArrival";

const Page = () => {
  return (
    <>
      <Hero />
      <OurProduct />
      <AircraftHistory />
      <NewArrival />
    </>
  );
};

export default Page;
