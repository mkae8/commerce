import { ChevronDown, ChevronRight, Filter } from "lucide-react";

export const SideFilter = () => {
  return (
    <div className="flex flex-col  items-center rounded-2xl w-[295px] h-fit border">
      <div className="py-6 mt-5 text-[20px] font-semibold flex items-center justify-between w-[247px] h-[30px] ">
        Filter <Filter className="h-5 w-5" />
      </div>
      <div className="flex flex-col items-start mt-5 border-y-2 py-6 mx-auto gap-4">
        <div className="flex items-center w-[247px] justify-between">
          Airbus <ChevronRight className="w-5 h-5" />
        </div>
        <div className="flex items-center w-[247px] justify-between">
          Boeing <ChevronRight className="w-5 h-5" />
        </div>
        <div className="flex items-center w-[247px] justify-between">
          Antonov <ChevronRight className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col items-start border-b-2  py-6 mx-auto gap-4">
        <div className="flex items-center w-[247px] justify-between">
          Size <ChevronDown className="w-5 h-5" />
        </div>
        <div className=" w-[247px] h-fit gap-2 flex justify-center items-start">
          <button className="w-[76px] h-[39px] bg-gray-300 rounded-full ">
            15cm
          </button>
          <button className="w-[76px] h-[39px] bg-gray-300 rounded-full ">
            20cm
          </button>
          <button className="w-[76px] h-[39px] bg-gray-300 rounded-full ">
            43cm
          </button>
          <button className="w-[76px] h-[39px] bg-gray-300 rounded-full ">
            47cm
          </button>
        </div>
      </div>
    </div>
  );
};
