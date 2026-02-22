"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Cars" },
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-gray-200 bg-gray-50"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        {links.map((link) => (
          <Link
            key={link.to}
            href={link.to}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              (
                link.to === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.to)
              )
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
