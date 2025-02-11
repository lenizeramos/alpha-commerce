"use client";

import { fetchData } from "../app/context/slices/DataSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/context/store";
import { useEffect } from "react";
import { Princess_Sofia } from "next/font/google";
import Image from "next/image";

const PrincessSofia = Princess_Sofia({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    if (!data.length) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  console.log("data", data);

  return (
    <>
      <div className="relative min-h-screen px-8 py-12 flex items-center justify-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className={`text-4xl font-bold text-gray-900`}>
              We provide the best food for you
            </h1>
            <p className="text-gray-600 text-lg">
            Come experience a unique gastronomic journey! Flavor, quality, and the service you deserve. We’re waiting for you!
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg shadow-md">
                Menu
              </button>
              <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md">
                Book a table
              </button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-[400px] h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/home/restaurant.jpg"
                alt="Restaurant Interior"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="absolute -bottom-10 -left-12 w-56 h-56 transform rotate-12">
              {data.length > 0 ? (
                (() => {
                  const randomIndex = Math.floor(Math.random() * data.length);
                  const entry = data[randomIndex];
                  const { id, name, image } = entry.fields as any;
                  const imageUrl = image?.fields?.file.url || "";

                  return (
                    <div
                      key={id}
                      className="containerImg w-full h-40 mb-4 relative overflow-hidden"
                    >
                      <Image
                        src={`https:${imageUrl}`}
                        alt={name}
                        fill
                        className="rounded-lg"
                      />
                    </div>
                  );
                })()
              ) : (
                <div className="text-center">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`ContainerMenu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto py-8 ${PrincessSofia.className}`}
      ></div>
    </>
  );
}
