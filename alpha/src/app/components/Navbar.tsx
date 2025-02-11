"use client";
import {
  SignedIn,
  SignedOut,
  useClerk,
} from "@clerk/nextjs";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import CTA from "./CTA";
import { LiaSignOutAltSolid } from "react-icons/lia";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Cart", href: "/cart" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleMenuToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-[#d5d7d8] shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Alpha
          </Link>
          <div className="hidden md:flex space-x-6 justify-center items-center">
            {navLinks.map(
              (link) =>
                pathname !== link.href && (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-900 hover:text-gray-500 transition-colors"
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )
            )}

            <div>
              <SignedOut>
                <CTA />
              </SignedOut>

              <SignedIn>
                <LiaSignOutAltSolid
                  size={35}
                  onClick={handleSignOut}
                  className="cursor-pointer hover:text-purple-500"
                />
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
        className={`md:hidden bg-[#d5d7d8] p-4 flex flex-col items-center space-y-4 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-5"
        } overflow-hidden`}
      >
        {navLinks.map(
          (link) =>
            pathname !== link.href && (
              <Link
                key={link.href}
                href={link.href}
                className="text-center py-2 text-gray-900 hover:text-gray-500 transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            )
        )}
        <div>
          <SignedOut>
            <CTA />
          </SignedOut>

          <SignedIn>
            <LiaSignOutAltSolid
              size={35}
              onClick={handleSignOut}
              className="cursor-pointer hover:text-purple-500"
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
