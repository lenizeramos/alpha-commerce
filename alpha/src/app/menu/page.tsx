"use client";
import Image from "next/image";
import { BsBasket2 } from "react-icons/bs";
import { Princess_Sofia } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../context/store";
import { fetchData } from "../context/slices/DataSlice";
import Link from "next/link";
import CartAnimation from "../components/CartAnimation";
import { addToCart } from "../context/slices/CartSlice";
import { CartItem } from "../types/SliceTypes";
import Filters from "../components/Filters";

const PrincessSofia = Princess_Sofia({
  weight: "400",
  subsets: ["latin"],
});

export default function Menu() {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.data);
  const [filter, setFilter] = useState<string>("All");

  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 1500);
  };

  return (
    <>
      {showAnimation && <CartAnimation />}
      <div className="mainContainer flex flex-col items-center mt-7 mx-8">
        <Filters category={filter} setCategory={setFilter} />
        <div
          className={`ContainerMenu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto py-8 ${PrincessSofia.className}`}
        >
          {data.length > 0 ? (
            data.map((entry: any) => {
              const { id, name, image, price, description, category, rating } =
                entry.fields as any;
              const imageUrl = image?.fields?.file.url || "";
              if (filter === "All" || category === filter) {
                return (
                  <Link key={id} href={`/menu/${id}`}>
                    <div className="containerItem flex flex-col items-center justify-center bg-white pb-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
                      <div className="containerImg w-full h-40 mb-4 relative overflow-hidden">
                        <Image
                          src={`https:${imageUrl}`}
                          alt={name}
                          fill
                          sizes="auto"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="info w-full flex flex-col items-start px-8 gap-2">
                        <h2 className="text-xl font-semibold text-gray-800 text-center">
                          {name}
                        </h2>
                        <div className="rating flex">
                          {Array.from({ length: 5 }, (_, index) => (
                            <span
                              key={index}
                              className={
                                index < rating
                                  ? "text-yellow-500"
                                  : "text-gray-400"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="price flex justify-between w-full items-center">
                          <p className="text-lg text-purple-900 mb-2 font-bold">
                            ${price.toFixed(2)}
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart({
                                name,
                                image: imageUrl,
                                price,
                                rating,
                              });
                            }}
                            className="icon rounded-full bg-gray-200 text-black w-10 h-10 flex items-center justify-center cursor-pointer"
                          >
                            <BsBasket2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              }
            })
          ) : (
            <div className="text-center ">No items available</div>
          )}
        </div>
      </div>
    </>
  );
}
