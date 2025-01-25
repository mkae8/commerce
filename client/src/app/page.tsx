import { OurProduct } from "@/components/main/home/OurProduct";
import { Hero } from "@/components/main/home/Hero";
// import { AircraftCompanies } from "@/components/main/home/AircraftCompanies";
import { AircraftHistory } from "@/components/main/home/AircraftHistory";
import { NewArrival } from "@/components/main/home/NewArrival";

const Page = () => {
  return (
    <>
      <Hero />
      <OurProduct />
      <AircraftHistory />
      <NewArrival />
      {/* <AircraftCompanies /> */}
    </>
  );
};

export default Page;
