// "use client";

// import { useState } from "react";
// import { Heart, ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import type { Product } from "../types/ProductType";

// interface ProductDetailProps {
//   product: Product;
// }

// export function ProductDetail({ product }: ProductDetailProps) {
//   const [quantity, setQuantity] = useState(1);

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="aspect-square relative overflow-hidden rounded-lg">
//           <img
//             src={product.image || "/placeholder.svg"}
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-xl text-blue-600 font-bold mb-4">
//             {formatPrice(product.price)}
//           </p>
//           <p className="text-gray-600 mb-6">{product.description}</p>
//           <div className="flex items-center gap-4 mb-6">
//             <label htmlFor="quantity" className="font-medium">
//               Quantity:
//             </label>
//             <input
//               type="number"
//               id="quantity"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
//               className="border rounded px-2 py-1 w-16 text-center"
//             />
//           </div>
//           <div className="flex gap-4">
//             <Button className="flex-1">
//               <ShoppingCart className="mr-2 h-4 w-4" />
//               Add to Cart
//             </Button>
//             <Button variant="outline" size="icon">
//               <Heart className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
