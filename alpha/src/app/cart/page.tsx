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
import { useState } from "react";
import { PiMaskSadLight } from "react-icons/pi";
import { Mali } from "next/font/google";
import { LuBadgePlus } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";

const textFont = Mali({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
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
    <>
      <div className="relative">
        <div className="absolute -left-5 top-5">
          <Image
            src={"/decoration/img12.png"}
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="absolute right-5 top-5 rotate-45">
          <Image src={"/decoration/img8.png"} alt="" width={100} height={100} />
        </div>
        <div className="absolute top-5">
          <Image
            src={"/decoration/img12.png"}
            alt=""
            width={400}
            height={400}
            className="opacity-5"
          />
        </div>
        <div className="absolute right-0 opacity-15 -bottom-72">
          <Image
            src={"/decoration/img13.png"}
            alt=""
            width={300}
            height={300}
          />
        </div>
        <div
          className={` py-8 ${textFont.className} flex flex-col items-center justify-center`}
        >
          <h1
            className={`my-5 md:text-6xl text-5xl text-orange-800 border-b-2 border-orange-800 pb-5 text-center`}
          >
            Your Cart
          </h1>
          <hr className="w-[10rem] sm:w-[30rem] border border-orange-800 mb-10" />

          {cartItems.length === 0 ? (
            <div className="md:text-7xl text-gray-700 w-92 text-5xl flex flex-col items-center justify-center gap-10">
              <p className="text-center">Your cart is empty.</p>
              <PiMaskSadLight size={100} color="#9a3412" />
              <Link
                href="/menu"
                className="botton-shadow flex px-5 py-2 text-white rounded-full gap-3"
              >
                <h1 className="text-xl">Let&apos;s Buy</h1>
                <LuBadgePlus
                  size={25}
                  color="#F2F0EB"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2 relative pb-10 items-center justify-center">
                <div className="overflow-y-auto h-[45vh] p-3">
                  <ul className="grid grid-cols-2 gap-4">
                    {cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-center bg-[#e3dac9] p-3 shadow-md rounded-lg hover:scale-105"
                      >
                        <div className="flex items-center  gap-4">
                          <Image
                            src={`https:${item.image}`}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-md border border-gray-800"
                          />
                          <div className="flex flex-col">
                            <h2 className="text-lg font-semibold text-orange-800">
                              {item.name}
                            </h2>
                            <p className="text-gray-700 pb-2">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <div className="flex items-center gap-4 justify-between">
                              <div className="flex items-center gap-4 justify-center">
                                <FaMinusCircle
                                  size={15}
                                  onClick={() =>
                                    dispatch(decreaseQuantity(item.id))
                                  }
                                  color="#693618"
                                  className="cursor-pointer"
                                />
                                <span className="text-gray-600">
                                  {item.quantity}
                                </span>
                                <FaCirclePlus
                                  size={15}
                                  onClick={() =>
                                    dispatch(increaseQuantity(item.id))
                                  }
                                  color="#693618"
                                  className="cursor-pointer"
                                />
                              </div>
                              <IoTrashOutline
                                size={20}
                                onClick={() => dispatch(removeFromCart(index))}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-5 absolute -bottom-28 w-96">
                  <p className="mt-4 text-center text-xl font-bold">
                    Total: $ 
                    <span className="text-orange-700">
                      {cartItems
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </p>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className=" botton-empty rounded-lg text-gray-200 py-1"
                  >
                    Empty Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="botton-checkout rounded-lg text-gray-800 py-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Checkout"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
