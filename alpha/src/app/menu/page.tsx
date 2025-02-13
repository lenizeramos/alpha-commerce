"use client";
import Image from "next/image";
import { BsBasket2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../context/store";
import { fetchData } from "../context/slices/DataSlice";
import Link from "next/link";
import CartAnimation from "../components/CartAnimation";
import { addToCart } from "../context/slices/CartSlice";
import { CartItem } from "../types/SliceTypes";
import Filters from "../components/Filters";
import { PiMaskSadLight } from "react-icons/pi";
import { Tomorrow, Mali } from "next/font/google";
const textTitle = Tomorrow({
  weight: "400",
  style: "normal",
});
const textFont = Mali({
  weight: "400",
  style: "normal",
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

  useEffect(() => {
    const handleScroll = () => {
      const distance = window.scrollY;
      const scrollDiv = document.getElementById("motionDiv");
      const scrollDiv2 = document.getElementById("motionDiv2");
      if (scrollDiv && scrollDiv2) {
        (scrollDiv as HTMLElement).style.transform = `translateY(${
          distance * 0.9
        }px)`;
        (scrollDiv2 as HTMLElement).style.transform = `translateY(${
          distance * 0.87
        }px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

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
      <div
        className="mainContainer flex flex-col items-center mt-7 mx-8 relative"
        id="mainContainerMenu"
      >
        <div className="absolute">
          <Image src={"/decoration/img7.png"} alt="" width={300} height={300} />
        </div>
        <div className="absolute -left-5 md:top-56 top-96" id="motionDiv">
          <Image
            src={"/decoration/img12.png"}
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="hidden sm:block absolute lg:top-16 md:top-10 md:right-5 top-8 right-3 -rotate-[32deg]">
          <Image src={"/decoration/img5.png"} alt="" width={100} height={100} />
          <Image src={"/decoration/img6.png"} alt="" width={100} height={100} />
        </div>
        <div
          className="absolute sm:top-[40rem] -right-10 opacity-15 top-[70rem]"
          id="motionDiv2"
        >
          <Image
            src={"/decoration/img13.png"}
            alt=""
            width={300}
            height={300}
          />
        </div>
        <h1
          className={`my-5 md:text-6xl text-5xl ${textFont.className} text-orange-800 border-b-2 border-orange-800 pb-5 text-center`}
        >
          Our Special Dishes
        </h1>
        <hr className="w-[10rem] sm:w-[30rem] border border-orange-800 mb-10" />
        <Filters category={filter} setCategory={setFilter} />
        <div
          className={`ContainerMenu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl mx-auto py-8 ${textTitle.className}`}
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
                          <p className="text-lg text-orange-800 mb-2 font-bold">
                            ${price.toFixed(2)}
                          </p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart({
                                id,
                                name,
                                image: imageUrl,
                                price,
                                rating,
                                quantity: 1,
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
            <div className="md:text-7xl text-orange-800 w-92 md:absolute md:left-96 text-5xl">
              <h1 className="text-center">No items available</h1>
              <PiMaskSadLight size={100} color="#9a3412" className="md:absolute md:left-64"/>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
