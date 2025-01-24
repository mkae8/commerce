"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useState } from "react";

interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItem: string;
  onItemChange: (item: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selectedItem,
  onItemChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {items.map((item) => (
              <button
                key={item}
                onClick={() => onItemChange(item)}
                className={`block w-full text-left py-2 px-4 text-sm ${
                  selectedItem === item
                    ? "bg-red-400 text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                } transition-colors rounded-md my-1`}
              >
                {item}
                {selectedItem === item && (
                  <span className="float-right">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
