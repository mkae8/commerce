import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PlusMinusProps {
  count: number;
  setCount: (count: number) => void;
}

export function PlusMinus({ count, setCount }: PlusMinusProps) {
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCount(Math.max(1, count - 1))}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min="1"
        value={count}
        onChange={(e) =>
          setCount(Math.max(1, Number.parseInt(e.target.value) || 1))
        }
        className="w-16 text-center mx-2"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCount(count + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
