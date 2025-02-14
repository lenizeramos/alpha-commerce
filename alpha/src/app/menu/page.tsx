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
import { CartItem, DataState } from "../types/SliceTypes";
import Filters from "../components/Filters";
import "./menu.css";
import { getIngredientColor } from "../components/Ingredients";

const PrincessSofia = Princess_Sofia({
  weight: "400",
  subsets: ["latin"],
});

export default function Menu() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading, error } = useSelector((state: RootState) => state.data as DataState);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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
                  <div key={id} className="containerItem flex flex-col items-center justify-center bg-white pb-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem({
                          id,
                          name,
                          image: imageUrl,
                          price,
                          rating,
                          quantity: 1,
                          description,
                          ingredients: entry.fields.ingredients?.map((ingredient: any) => ingredient.fields.name) || [],
                          comments: entry.fields.comments?.map((comment: any) => comment.fields.comment) || [],
                        });
                        setIsModalOpen(true);
                      }}
                  >
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
                            e.stopPropagation();
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
                );
              }
            })
          ) : (
            <div className="text-center ">No items available</div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {selectedItem ? (
              <>
                <button 
                  className="close-button" 
                  onClick={closeModal}
                >
                  X
                </button>
                <h1 className={`text-3xl font-bold modal-name ${PrincessSofia.className}`}>
                  {selectedItem.name}
                </h1>
                <img
                  src={`https:${selectedItem.image}`}
                  alt={selectedItem.name}
                  className="w-64 h-64 object-cover modal-img"
                />
                {/* <p className={`text-lg text-gray-700 ${PrincessSofia.className}`}>{selectedItem.description}</p> */}
                <p className={`text-xl text-green-600 ${PrincessSofia.className}`}>${selectedItem.price.toFixed(2)}</p>
                
                <div className="rating flex">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < selectedItem.rating
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                
                <div className="modal-ingredients-container">
                  <p className={`text-lg text-gray-700 ${PrincessSofia.className}`}>Ingredients:</p>
                  <div className="mt-4 flex modal-ingredients flex-wrap gap-2">
                    {selectedItem.ingredients?.map((ingredient: string, index: number) => (
                      <span 
                        key={index} 
                        className={`px-3 py-1 rounded-full  text-white text-sm font-semibold ${getIngredientColor(ingredient)}`}
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={`/menu/${selectedItem.id}`} onClick={(e) => e.stopPropagation()}>
                  <button className="rounded-full details-btn">
                    View Details
                  </button>
                </Link>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
