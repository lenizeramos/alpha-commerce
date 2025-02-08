"use client";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "YYYYY", href: "/yyy" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#B4FCB6] shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Alpha
          </Link>
          <div className="hidden md:flex space-x-6 justify-center items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-900 hover:text-gray-500 transition-colors"
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}

            <Link href="#email">
              <p>XXXXX</p>
            </Link>
            <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>

            <SignedIn>
              <SignOutButton />
            </SignedIn>
          </div>
          </div>

          <button
            className="md:hidden text-gray-700 dark:text-white"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
        </div>
      </div>

      <div
        className={`md:hidden bg-[#B4FCB6] p-4 flex flex-col items-center space-y-4 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-5"
        } overflow-hidden`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="  text-center py-2 text-gray-900 hover:text-gray-500 transition-colors"
            onClick={closeMenu}
          >
            {link.name}
          </Link>
        ))}
        <Link href="#email" onClick={closeMenu}>
          <p>XXXXX</p>
        </Link>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>

          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
