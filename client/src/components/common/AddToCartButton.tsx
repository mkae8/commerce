import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  onClick: () => void;
}

export function AddToCartButton({ onClick }: AddToCartButtonProps) {
  return (
    <Button onClick={onClick}>
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
