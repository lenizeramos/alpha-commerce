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
import { CartItem } from "../context/slices/CartSlice";

const PrincessSofia = Princess_Sofia({
  weight: "400",
  subsets: ["latin"],
});

export default function Menu() {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  const [showAnimation, setShowAnimation] = useState(false);

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
      <div
        className={`ContainerMenu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto py-8 ${PrincessSofia.className}`}
      >
        {data.length > 0 ? (
          data.map((entry: any) => {
            const { id, name, image, price, description, category, rating } =
              entry.fields as any;
            const imageUrl = image?.fields?.file.url || "";

            return (
              <Link key={id} href={`/menu/${id}`}>
                <div
                  className="containerItem flex flex-col items-center justify-center bg-white pb-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="containerImg w-full h-40 mb-4 relative overflow-hidden">
                    <Image
                      src={`https:${imageUrl}`}
                      alt={name}
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
          })
        ) : (
          <div className="text-center">No items available</div>
        )}
      </div>
    </>
  );
}
