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
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Cart", href: "/cart" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu ] = useState('home')
  const pathname = usePathname();
  const { signOut } = useClerk();

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-[#bd65f0] transition-colors ${textNav.className} ${menu === link.name ? 'text-purple-500 text-lg' : ''}`}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={()=>closeMenu(link.name)}
              >
                {link.name}
              </Link>
            ))}

            <Link href="/menu">
              <CTA />
            </Link>
            <div>
              <SignedOut>
                <SignInButton />
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
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-center py-2 text-gray-900 hover:text-gray-500 transition-colors ${menu === link.name ? 'text-purple-500' : ''}`}
            onClick={()=>closeMenu(link.name)}
          >
            {link.name}
          </Link>
        ))}
        <Link href="" onClick={()=>closeMenu('')}>
          <CTA />
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
