"use client";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import CTA from "./CTA";
import { GiExitDoor } from "react-icons/gi";
import { BsBasket2Fill } from "react-icons/bs";
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
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState("home");
  // const pathname = usePathname();
  const { signOut, user } = useClerk();
  const router = useRouter();

  const handleMenuToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleLinkClick = (
    href: string,
    protectedUrl: boolean,
    name: string
  ) => {
    if (!user && protectedUrl) {
      router.push("/sign-in");
    } else {
      router.push(href);
    }
    setIsOpen(false);
    setMenu(name);
  };
  return (
    <nav className="bg-[#f4f4f3] shadow-md fixed w-full z-10 text-[#311a37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            href="/"
            className={`text-shadow flex items-center text-[2.5rem] sm:text-5xl font-bold ${textTitle.className} sm:gap-4`}
          >
            <Image
              src={"/logo.png"}
              width={50}
              height={50}
              alt="logo"
              className="pb-2"
            />
            Alpha Bites
          </Link>
          <div className="hidden md:flex space-x-6 justify-center items-center">
            {navLinks.map((link) => (
              <button
                key={link.href}
                className={`hover:text-[#ea6d27] transition-colors ${
                  textNav.className
                } ${menu === link.name ? "text-orange-400 text-lg" : ""}`}
                onClick={() =>
                  handleLinkClick(link.href, link.protectedUrl, link.name)
                }
              >
                {link.name}
              </button>
            ))}
            <BsBasket2Fill
              size={25}
              className={`cursor-pointer hover:text-[#ea6d27] ${
                menu === "Cart" ? "text-orange-400" : ""
              }`}
              onClick={() => handleLinkClick("/cart", true, "Cart")}
            />
            <div>
              <SignedOut>
                <CTA text="TAKEOUT!" />
              </SignedOut>

              <SignedIn>
                <GiExitDoor
                  size={35}
                  onClick={handleSignOut}
                  className="cursor-pointer hover:text-[#ea6d27]"
                />
              </SignedIn>
            </div>
          </div>

          <button
            className="md:hidden text-gray-700 dark:text-[#311a37]"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden bg-[#d5d7d8] flex flex-col items-center gap-2 transition-all duration-300 ease-in-out transform ${
          textNav.className
        } ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0 pb-3"
            : "max-h-0 opacity-0 translate-y-5"
        } overflow-hidden `}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            className={`text-center py-2 text-gray-900 hover:text-[#ea6d27] transition-colors ${
              menu === link.name ? "text-orange-400" : ""
            }`}
            onClick={() =>
              handleLinkClick(link.href, link.protectedUrl, link.name)
            }
          >
            {link.name}
          </button>
        ))}
        <BsBasket2Fill
          size={25}
          className="cursor-pointer hover:text-[#ea6d27]"
          onClick={() => handleLinkClick("/cart", true, "Cart")}
        />
        <div>
          <SignedOut>
            <div
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <CTA text="TAKEOUT!" />
            </div>
          </SignedOut>

          <SignedIn>
            <GiExitDoor
              size={35}
              onClick={handleSignOut}
              className="cursor-pointer hover:text-[#ea6d27]"
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
