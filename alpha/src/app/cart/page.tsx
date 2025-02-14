"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import Link from "next/link";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../context/slices/CartSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiMaskSadLight } from "react-icons/pi";
import { Mali } from "next/font/google";
import { LuBadgePlus } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
// import { CiCircleMinus } from "react-icons/ci";
import { AiFillMinusCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const textFont = Mali({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/createCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto py-8 ${textFont.className} flex flex-col items-center`}
    >
      <h1
        className={`my-5 md:text-6xl text-5xl ${textFont.className} text-orange-800 border-b-2 border-orange-800 pb-5 text-center`}
      >
        Your Cart
      </h1>
      <hr className="w-[10rem] sm:w-[30rem] border border-orange-800 mb-10" />

      {isLoading ?( <div className="flex gap-16">
      {[...Array(3)].map((_, index) => (
      <motion.div
      key={index}
      className="my-64 w-16 h-16 bg-orange-800 rounded-full"
      animate={{
        y: [0, -20, 0], 
      }}
      transition={{
        duration: 0.5, 
        ease: "easeInOut",
        repeat: Infinity, 
        repeatType: "loop",
        delay: index * 0.1, 
      }}
      />
      ))}
</div>
      ): cartItems.length === 0 ? (
        <div className="md:text-7xl text-gray-700 w-92 text-5xl flex flex-col items-center justify-center gap-10">
          <p className="text-center">Your cart is empty.</p>
          <PiMaskSadLight size={100} color="#9a3412" />
          <Link
            href="/menu"
            className="botton-shadow flex px-5 py-2 text-white rounded-full gap-3"
          >
            <h1 className="text-xl">Let&apos;s Buy</h1>
            <LuBadgePlus size={25} color="#F2F0EB" className="cursor-pointer" />
          </Link>
        </div>
      ) : (
        <>
          <div className="flex">
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-[#e3dac9] p-4 shadow-xl rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={`https:${item.image}`}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md border border-gray-800"
                    />
                    <div className="flex flex-col gap-3">
                      <h2 className="text-lg font-semibold text-orange-800">
                        {item.name}
                      </h2>
                      <p className="text-green-600 w-24">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-4 w-24">
                        <AiFillMinusCircle
                          size={30}
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        />
                        <span className="text-gray-600 w-4">
                          {item.quantity}
                        </span>
                        <CiCirclePlus
                          size={10}
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        />
                        <IoTrashOutline
                          onClick={() => dispatch(removeFromCart(index))}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <p className="mt-4 text-center">
                Total: $
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
              <div>
                <button
                  onClick={() => dispatch(clearCart())}
                  className=" bg-red-600 text-white rounded-lg"
                >
                  Empty Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className=" bg-blue-500 text-white rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
