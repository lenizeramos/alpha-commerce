"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { removeFromCart, clearCart } from "../context/slices/CartSlice";
import Image from "next/image";
import { Princess_Sofia } from "next/font/google";

const PrincessSofia = Princess_Sofia({
  weight: "400",
  subsets: ["latin"],
});

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

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
                  <Image src={`https:${item.image}`} alt={item.name} width={60} height={60} className="rounded-md"/>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-green-600">${item.price.toFixed(2)}</p>
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
        </>
      )}
    </div>
  );
}
