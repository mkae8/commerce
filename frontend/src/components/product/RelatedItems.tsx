import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface RelatedItem {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface RelatedItemsProps {
  currentProductId: string;
}

export function RelatedItems({ currentProductId }: RelatedItemsProps) {
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);

  useEffect(() => {
    // In a real application, you would fetch related items based on the current product ID
    // For this example, we'll use dummy data
    const dummyRelatedItems: RelatedItem[] = [
      { id: "1", title: "Boeing 747", image: "/boeing-747.jpg", price: 129.99 },
      {
        id: "2",
        title: "Airbus A380",
        image: "/airbus-a380.jpg",
        price: 149.99,
      },
      {
        id: "3",
        title: "Antonov An-225",
        image: "/antonov-an-225.jpg",
        price: 199.99,
      },
    ].filter((item) => item.id !== currentProductId);

    setRelatedItems(dummyRelatedItems);
  }, [currentProductId]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Related Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedItems.map((item) => (
          <Link href={`/product/${item.id}`} key={item.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
