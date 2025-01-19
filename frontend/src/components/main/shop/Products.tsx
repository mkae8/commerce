import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Products = () => {
  return (
    <div className="flex flex-col  w-[925px] gap-4">
      <h3 className="font-semibold text-[36px] p-4">Products</h3>
      <div className=" flex w-full h-[408px]  gap-4">
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
      </div>
      <div className=" flex w-full h-[408px]  gap-4">
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
      </div>
      <div className=" flex w-full h-[408px]  gap-4">
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img
            src="/history/miat787.jpg"
            alt=""
            className="w-[295px] h-[350px] object-cover "
          />
          <p>Mongolian Airlines Boeing 787 </p>
          <p>2500$</p>
          <p>47cm</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10 border-t-2 py-6">
        <Button>
          <ArrowLeft /> Previous
        </Button>
        <div className="flex gap-2">
          <p>1</p>
          <p>2</p>
          <p>3</p>
        </div>

        <Button>
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
