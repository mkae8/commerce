import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface WishlistItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onRemove: (id: string) => void;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({
  id,
  name,
  price,
  image,
  onRemove,
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
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(id)}
        aria-label={`Remove ${name} from wishlist`}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};
