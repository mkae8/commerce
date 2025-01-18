import { SideFilter } from "@/components/SideFilter";
import { Hero } from "@/components/Hero";

const Page = () => {
  return (
    <>
      <div className="container mx-auto py-8 mt-10">
        <div className="flex justify-center items-start gap-8">
          <SideFilter />
          <Hero />
        </div>
      </div>
    </>
  );
};

export default Page;
