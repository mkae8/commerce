"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import { VisuallyHidden } from "@/components/utils/visual-hidden";
import { WishlistItem } from "@/components/utils/WishlistItem";
import { CartItem } from "@/components/utils/CartItem";

const mockWishlistItems = [
  { id: "1", name: "Product 1", price: 19.99, image: "/product1.jpg" },
  { id: "2", name: "Product 2", price: 29.99, image: "/product2.jpg" },
];

const mockCartItems = [
  {
    id: "1",
    name: "Product 1",
    price: 19.99,
    image: "/product1.jpg",
    quantity: 1,
  },
  {
    id: "2",
    name: "Product 2",
    price: 29.99,
    image: "/product2.jpg",
    quantity: 2,
  },
];

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [cartItems, setCartItems] = useState(mockCartItems);

  const pathname = usePathname();
  if (pathname === "/register" || pathname === "/sign-up") {
    return null;
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateCartItemQuantity = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  return (
    <header className="sticky bg-white top-0 z-50 w-full border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label="Home" className="mr-4">
              <Image
                src="/logo.avif"
                alt="Website Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </Link>
            <nav className="hidden md:flex space-x-6">
              <NavLink href="/" active={pathname === "/"}>
                Нүүр
              </NavLink>
              <NavLink href="/shop" active={pathname === "/shop"}>
                Shop
              </NavLink>
              <NavLink href="/contact" active={pathname === "/contact"}>
                Contact
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <Input
                type="search"
                placeholder="Хайлт"
                className="rounded-full w-[220px] pr-10"
                aria-label="Search"
              />
              <Search
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>
            {isSearchOpen ? (
              <div className="md:hidden flex items-center space-x-2">
                <Input
                  type="search"
                  placeholder="What are you looking for?"
                  className="rounded-full w-[200px] pr-10"
                  aria-label="Search"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close Search"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open Search"
                className="md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Favorites">
                  <Heart className="h-5 w-5 hover:text-red-400 transition-colors" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  <VisuallyHidden>Wishlist</VisuallyHidden>
                </DialogTitle>
                <h2 className="text-lg font-semibold mb-4">Wishlist</h2>
                {wishlistItems.length === 0 ? (
                  <p>Your wishlist is empty.</p>
                ) : (
                  wishlistItems.map((item) => (
                    <WishlistItem
                      key={item.id}
                      {...item}
                      onRemove={removeFromWishlist}
                    />
                  ))
                )}
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Shopping Cart">
                  <ShoppingCart className="h-5 w-5 hover:text-blue-400 transition-colors" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>
                  <VisuallyHidden>Shopping Cart</VisuallyHidden>
                </DialogTitle>
                <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onRemove={removeFromCart}
                        onUpdateQuantity={updateCartItemQuantity}
                      />
                    ))}
                    <div className="mt-4 text-right">
                      <p className="font-semibold">
                        Total: $
                        {cartItems
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </p>
                      <Button className="mt-2">Checkout</Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" aria-label="User Account">
              <Link href="/profile">
                <User className="h-5 w-5 hover:text-green-400 transition-colors" />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8 text-lg">
                  <NavLink href="/" active={pathname === "/"}>
                    Нүүр
                  </NavLink>
                  <NavLink href="/shop" active={pathname === "/shop"}>
                    Shop
                  </NavLink>
                  <NavLink href="/contact" active={pathname === "/contact"}>
                    Contact
                  </NavLink>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => (
  <Link
    href={href}
    className={`px-3 py-2 rounded-md transition-colors ${
      active ? "text-[#DB4444] font-bold" : "hover:text-[#DB4444]"
    }`}
  >
    {children}
  </Link>
);
