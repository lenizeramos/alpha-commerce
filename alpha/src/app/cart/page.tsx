"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../context/slices/CartSlice";
import Image from "next/image";
import { Princess_Sofia } from "next/font/google";
import { useState } from "react";

const PrincessSofia = Princess_Sofia({
  weight: "400",
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
    <div className={`max-w-4xl mx-auto py-8 ${PrincessSofia.className}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
                <div className="flex items-center gap-4">
                  <Image
                    src={`https:${item.image}`}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="flex flex-row gap-16">
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-green-600 w-24">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-4 w-24">
                      <button
                        className="text-gray-600 w-4 bg-gray-200"
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                      >
                        -
                      </button>
                      <span className="text-gray-600 w-4">{item.quantity}</span>
                      <button
                        className="text-gray-600 w-4 bg-gray-200"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(index))}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => dispatch(clearCart())}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg"
          >
            Empty Cart
          </button>
          <p className="mt-4 text-center">
            Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </p>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg"
            disabled={isLoading} 
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        </>
      )}
    </div>
  );
}
