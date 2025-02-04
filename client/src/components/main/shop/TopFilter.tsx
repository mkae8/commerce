"use client";

import type React from "react";
import { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const filterCategories = {
  Manufacturer: ["Airbus", "Boeing", "Antonov"],
  Scale: ["15cm", "20cm", "37cm", "40cm", "43cm"],
};

export const TopFilter: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      const updatedCategory = prev[category]
        ? [...prev[category], value]
        : [value];
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  const handleClearAll = () => {
    setFilters({});
  };

  const handleRemoveFilter = (category: string, value: string) => {
    setFilters((prev) => {
      const updatedCategory = prev[category].filter((item) => item !== value);
      if (updatedCategory.length === 0) {
        const { [category]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [category]: updatedCategory };
    });
  };

  return (
    <div className="bg-white flex justify-center gap-8 rounded-xl  h-[80px] items-center mb-5">
      <div className="flex flex-wrap items-center gap-4  ">
        {Object.entries(filterCategories).map(([category, options]) => (
          <DropdownMenu key={category}>
            <DropdownMenuTrigger asChild className="font-bold text-[18px]">
              <Button variant="ghost" className="capitalize">
                {category} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleFilterChange(category, option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>

      {Object.keys(filters).length > 0 && (
        <div className="flex  gap-2 justify-center items-center ">
          {Object.entries(filters).map(([category, values]) =>
            values.map((value) => (
              <Badge
                key={`${category}-${value}`}
                variant="secondary"
                className="text-[16px] font-medium text-green-400"
              >
                {value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0"
                  onClick={() => handleRemoveFilter(category, value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))
          )}

          {Object.keys(filters).length > 0 && (
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="text-sm text-red-500 "
            >
              Clear All
            </Button>
          )}
        </div>
      )}

      <div className="flex justify-center items-center ">
        <Button
          onClick={handleSearch}
          className="rounded-full border  text-black hover:bg-red-400 hover:text-white "
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};
