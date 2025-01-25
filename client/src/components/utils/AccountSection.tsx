import Link from "next/link";

export function AccountSection() {
  const links = [
    { href: "/account", label: "My Account" },
    { href: "/login", label: "Login / Register" },
    { href: "/cart", label: "Cart" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/shop", label: "Shop" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Account</h2>
      <nav>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
