"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CiSearch,
  CiShoppingCart,
  CiHeart,
  CiMenuBurger,
} from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky bg-white top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" aria-label="Home" className="mr-4">
              <Image
                src="/logo.avif"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </Link>
            <nav className="hidden md:flex space-x-4">
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
                placeholder="What are you looking for"
                className="rounded-full w-[220px] pr-10"
                aria-label="Search"
              />
              <CiSearch
                className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <CiSearch className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Favorites">
              <CiHeart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <CiShoppingCart className="h-6 w-6" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="md:hidden"
                >
                  <CiMenuBurger className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
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
        {isSearchOpen && (
          <div className="md:hidden py-2">
            <Input
              type="search"
              placeholder="What are you looking for"
              className="rounded-full w-full pr-10"
              aria-label="Search"
            />
          </div>
        )}
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
      active ? "text-blue-400 " : "hover:text-blue-400"
    } font-bold`}
  >
    {children}
  </Link>
);
