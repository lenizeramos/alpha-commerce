"use client";

import { fetchData } from "../app/context/slices/DataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/context/store";
import { useEffect } from "react";
import Image from "next/image";
import CTA from "./components/CTA";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { decoration } from "../../public/variables";

import { Gowun_Dodum, Mali } from "next/font/google";
import RandomDishes from "./components/RandomDishes";
const textTitle = Gowun_Dodum({
  weight: "400",
  style: "normal",
});
const textFont = Mali({
  weight: "400",
  style: "normal",
});

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  return (
    <>
      <div className="relative min-h-screen px-8 sm:py-12 p:8 flex items-center justify-center bg-[#f3f4f4]">
        <div className="hidden lg:block absolute xl:top-10 top-4 left-10">
          <Image src={"/decoration/img4.png"} alt="" width={100} height={100} />
        </div>
        <div className="hidden sm:block absolute border rounded-full border-gray-400 w-[50rem] h-[50rem] -left-[11.5rem] -bottom-[25rem]" />
        <div className="hidden sm:block absolute border rounded-full border-gray-400 w-[50rem] h-[50rem] -left-[29.25rem] -bottom-[12.5rem]" />
        <div className="hidden sm:block absolute border rounded-full border-gray-400 w-[50rem] h-[50rem] -left-[21.75rem] -bottom-[20.75rem]" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 sm:gap-12 gap-5 items-center">
          <div className="flex flex-col sm:gap-10 gap-5">
            <h1
              className={`text-5xl md:text-[4rem] 
              leading-none lg:text-7xl font-bold text-gray-900 text-center ${textTitle.className} `}
            >
              We provide the best food for you
            </h1>
            <p
              className={`text-gray-600 text-xl sm:text-2xl text-center ${textFont.className}`}
            >
              Come experience a unique gastronomic journey! Flavor, quality, and
              the service you deserve. We’re waiting for you!
            </p>
            <div className="flex justify-center">
              <SignedOut>
                <CTA text="TAKEOUT!" />
              </SignedOut>
              <SignedIn>
                <Link href="/menu">
                  <CTA text="Menu" />
                </Link>
              </SignedIn>
            </div>
          </div>
          <div className="relative flex justify-center">
            {decoration.map((item, index) => {
              return (
                <div className={`${item.styles}`} key={index}>
                  <Image src={item.img} alt="" width={200} height={200} />
                </div>
              );
            })}
            <div className="hidden md:block relative w-[400px] h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/home/restaurant.jpg"
                alt="Restaurant Interior"
                layout="fill"
                objectFit="cover"
                className="img-shadow rounded-[86%_14%_90%_10%_/_36%_61%_39%_64%]"
              />
            </div>
            <div className="sm:absolute sm:-bottom-10 sm:left-12 w-56 h-56 transform sm:rotate-12">
              {data.length > 0 &&
                (() => {
                  const randomIndex = Math.floor(Math.random() * data.length);
                  const entry = data[randomIndex];
                  const { id, name, image } = entry.fields;
                  const imageUrl = image?.fields?.file.url || "";

                  return (
                    <div
                      key={id}
                      className="containerImg w-full h-52 mb-4 relative overflow-hidden "
                    >
                      <Image
                        src={`https:${imageUrl}`}
                        alt={name}
                        fill
                        className="rounded-[23%_77%_28%_72%_/_77%_26%_74%_23%] border-[2px] border-[#3d3d37]"
                      />
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      </div>
      <RandomDishes />
    </>
  );
}
