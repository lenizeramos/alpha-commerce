"use client";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import CTA from "./CTA";
import { GiExitDoor } from "react-icons/gi";
import { useClerk } from "@clerk/clerk-react";
import Image from "next/image";

import { Ephesis, Tomorrow } from "next/font/google";
const textTitle = Ephesis({
  weight: "400",
  style: "normal",
});

const textNav = Tomorrow({
  weight: "400",
  style: "normal",
});

const navLinks = [
  { name: "Home", href: "/", protectedUrl: false },
  { name: "Menu", href: "/menu", protectedUrl: true },
  { name: "Cart", href: "/cart", protectedUrl: true },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu ] = useState('home')
  const pathname = usePathname();
  const { signOut, user } = useClerk();
  const router = useRouter();

  const handleMenuToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeMenu = (id:string) => {
    setMenu(id)
    setIsOpen(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleLinkClick = (href: string, protectedUrl: boolean) => {
    if (!user && protectedUrl) {
      router.push("/sign-in");
    } else {
      router.push(href);
    }
    setIsOpen(false);
  };
  return (
    <nav className="bg-[#311a37] shadow-md fixed w-full z-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            href="/"
            className={`text-shadow flex items-center text-5xl font-bold ${textTitle.className}`}
          >
            <Image src={"/logo1.png"} width={80} height={80} alt="logo" className="pb-2"/>
            Alpha Bites
          </Link>
          <div className="hidden md:flex space-x-6 justify-center items-center">
            {navLinks.map(
              (link) =>
                pathname !== link.href && (
                  <button
                    key={link.href}
                    className={`hover:text-[#bd65f0] transition-colors ${textNav.className} ${menu === link.name ? 'text-purple-500 text-lg' : ''}`}
                    onClick={() =>
                      handleLinkClick(link.href, link.protectedUrl)
                    }
                  >
                    {link.name}
                  </button>
                )
            )}

            <div>
              <SignedOut>
                <CTA />
              </SignedOut>

              <SignedIn>
                <GiExitDoor
                  size={35}
                  onClick={handleSignOut}
                  className="cursor-pointer"
                />
                {/* <SignOutButton /> */}
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
        className={`md:hidden bg-[#d5d7d8] flex flex-col items-center space-y-4 transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 translate-y-5"
        } overflow-hidden `}
      >
        {navLinks.map(
          (link) =>
            pathname !== link.href && (
              <button
                key={link.href}
                className={`text-center py-2 text-gray-900 hover:text-gray-500 transition-colors ${menu === link.name ? 'text-purple-500' : ''}`}
                onClick={() => handleLinkClick(link.href, link.protectedUrl)}
              >
                {link.name}
              </button>
            )
        )}
        <div>
          <SignedOut>
            <div
              onClick={() => {
                console.log("YYYYYY");
                setIsOpen(false);
              }}
            >
              <CTA />
            </div>
          </SignedOut>

          <SignedIn>
            <GiExitDoor
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
