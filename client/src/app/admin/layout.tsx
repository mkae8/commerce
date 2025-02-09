import Link from "next/link";
import type React from "react";
import { BsAirplaneEnginesFill } from "react-icons/bs";
import { FaFolderPlus } from "react-icons/fa";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-[60px] border-r p-4">
        <ul className="flex flex-col justify-center items-center gap-4">
          <li>
            <Link href="/admin/product" className="text-blue-400">
              <BsAirplaneEnginesFill
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </Link>
          </li>
          <li>
            <Link href="/admin/categories" className="text-blue-500 ">
              <FaFolderPlus style={{ width: "30px", height: "30px" }} />
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
