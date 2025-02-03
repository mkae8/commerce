"use client";

import { AccountSection } from "@/components/utils/AccountSection";
import { LocationSection } from "@/components/utils/LocationSection";
import { NewsletterSection } from "@/components/utils/NewsletterSection";
import { SupportSection } from "@/components/utils/SupportSection";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/register" || pathname === "/forgot-password") {
    return null;
  }
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <NewsletterSection />
          <SupportSection />
          <AccountSection />
          <LocationSection />
        </div>
      </div>
    </footer>
  );
}
