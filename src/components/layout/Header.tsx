"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Car, LogIn, LogOut, Menu, UserRound, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Our Cars" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Car className="h-8 w-8 text-amber-500" />
          <span className="text-xl font-bold">MrRent</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`text-sm font-medium transition-colors ${
                (link.to === "/" ? pathname === "/" : pathname?.startsWith(link.to))
                  ? "text-amber-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons + mobile toggle */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                <UserRound className="h-4 w-4" />
                {user.firstName || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="hidden sm:inline-flex rounded-full border border-amber-500 px-4 py-2 text-sm font-medium text-amber-500 hover:bg-amber-500 hover:text-white transition-colors"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </>
          )}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-white/10 md:hidden px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium ${
                (link.to === "/" ? pathname === "/" : pathname?.startsWith(link.to))
                  ? "text-amber-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="block w-full py-2 text-left text-sm font-medium text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
