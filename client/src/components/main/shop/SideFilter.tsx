"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FilterSection } from "./FilterSection";

const airbus = ["A380", "A350", "A330", "A320"];
const boeing = ["747", "787", "777", "737"];
const antonov = ["An-225", "An-124", "An-22", "An-72"];

const scales = ["1:200", "1:144", "1:100", "1:72"];
const categories = ["Commercial", "Military", "Cargo", "Private"];

export const SideFilter: React.FC = () => {
  const [selectedAirbus, setSelectedAirbus] = useState<string>("");
  const [selectedBoeing, setSelectedBoeing] = useState<string>("");
  const [selectedAntonov, setSelectedAntonov] = useState<string>("");
  const [selectedScale, setSelectedScale] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSearch = () => {
    const filters = {
      airbus: selectedAirbus,
      boeing: selectedBoeing,
      antonov: selectedAntonov,
      scale: selectedScale,
      category: selectedCategory,
    };
    console.log("Searching with filters:", filters);
  };

  const handleClearAll = () => {
    setSelectedAirbus("");
    setSelectedBoeing("");
    setSelectedAntonov("");
    setSelectedScale("");
    setSelectedCategory("");
  };

  const hasActiveFilters =
    selectedAirbus ||
    selectedBoeing ||
    selectedAntonov ||
    selectedScale ||
    selectedCategory;

  return (
    <div className="bg-white rounded-lg border  h-fit overflow-hidden w-full max-w-[300px]">
      <div className="p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="mb-4 text-sm"
          >
            Clear All
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <ScrollArea className="h-[60vh] px-6 py-4">
        <FilterSection
          title="Airbus"
          items={airbus}
          selectedItem={selectedAirbus}
          onItemChange={setSelectedAirbus}
        />
        <FilterSection
          title="Boeing"
          items={boeing}
          selectedItem={selectedBoeing}
          onItemChange={setSelectedBoeing}
        />
        <FilterSection
          title="Antonov"
          items={antonov}
          selectedItem={selectedAntonov}
          onItemChange={setSelectedAntonov}
        />
        <FilterSection
          title="Scales"
          items={scales}
          selectedItem={selectedScale}
          onItemChange={setSelectedScale}
        />
        <FilterSection
          title="Categories"
          items={categories}
          selectedItem={selectedCategory}
          onItemChange={setSelectedCategory}
        />
      </ScrollArea>
      <Separator />
      <div className="p-6">
        <Button
          onClick={handleSearch}
          className="w-full rounded-full bg-black text-white hover:bg-red-400"
        >
          <Search className=" h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
};
