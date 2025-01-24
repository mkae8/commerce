import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WishlistButtonProps {
  isWishlisted: boolean;
  onClick: () => void;
}

export function WishlistButton({ isWishlisted, onClick }: WishlistButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={isWishlisted ? "text-red-500" : ""}
    >
      <Heart
        className="h-4 w-4"
        fill={isWishlisted ? "currentColor" : "none"}
      />
    </Button>
  );
}
