// "use client";
import Image from "next/image";
import client from "../lib/contentful";
import { BsBasket2 } from "react-icons/bs";
import { Princess_Sofia } from 'next/font/google'
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import {fetchDataStart, fetchDataSuccess, fetchDataFailure} from '../context/slices/DataSlice'

const PrincessSofia = Princess_Sofia({
    weight: '400',
    subsets: ['latin'],
  })

export default async function Menu() {
    // const dispatch = useDispatch ();
    // const {data, loading, error} = useSelector((state) => state.data)
    // useEffect(() => {
    //     const fetchentries = async () => {
    //         try {
    //             dispatch(fetchDataStart())
    //           const entries = await client.getEntries({ content_type: "menu" });
    //           dispatch(fetchDataSuccess(entries))
    //           return entries.items;
    //         } catch (error) {
    //           dispatch(fetchDataFailure(error))
    //         }
    //       };
    //       fetchentries()
    // },[dispatch])

    const fetchentries2 = async () => {
        try {
          const entries = await client.getEntries({ content_type: "menu" });
          return entries.items;
        } catch (error) {
          console.log(error);
        }
      };
      const entries: any = await fetchentries2();
      console.clear();
      console.dir(entries, { depth: null });

  return (
    <>
      <div className={`ContainerMenu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto py-8 ${PrincessSofia.className}`}>
        {entries.length > 0 ? (
          entries.map((entry: any) => {
            const { id, name, image, price, description, category, rating } =
              entry.fields as any;
            const imageUrl = image?.fields?.file.url || "";

            return (
              <div
                key={id}
                className="containerItem flex flex-col items-center justify-center bg-white pb-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="containerImg w-full h-40 mb-4 relative overflow-hidden">
                  <Image
                    src={`https:${imageUrl}`}
                    alt={name}
                    //   width={200}
                    //   height={100}
                    fill
                    className="rounded-lg"
                  />
                </div>
                <div className="info w-full flex flex-col items-start px-8 gap-2">
                  <div className="rating flex text-yellow-500">
                    {Array.from({ length: rating }, (_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    {name}
                  </h2>
                  <div className="price flex justify-between w-full items-center">
                    <p className="text-lg font-medium text-green-600 mb-2">
                      ${price.toFixed(2)}
                    </p>
                    <div className="icon rounded-full bg-gray-200 text-black w-10 h-10 flex items-center justify-center cursor-pointer">
                      <BsBasket2 size={20} className="cursor-pointer"/>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">No items available</div>
        )}
      </div>
    </>
  );
}
