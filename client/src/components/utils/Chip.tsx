"use client";
interface ChipProps {
  title: string;
  desc: string;
}

export const Chip: React.FC<ChipProps> = ({ title, desc }) => {
  return (
    <div className="flex justify-between w-full h-[108px] flex-col">
      <div className="flex gap-4 text-red-400 items-center ">
        <div>
          <p className="w-5 h-10 bg-red-400 rounded-[4px]"></p>
        </div>
        <p className="font-semibold">{title}</p>
      </div>
      <h1 className="text-[36px] font-semibold">{desc}</h1>
    </div>
  );
};
