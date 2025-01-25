import type React from "react";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  quantity,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={64}
          height={64}
          className="rounded-md"
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          disabled={quantity === 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          aria-label={`Remove ${name} from cart`}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
