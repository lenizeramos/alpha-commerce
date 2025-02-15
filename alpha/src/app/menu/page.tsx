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
import { CartItem, DataItem, DataState } from "../types/SliceTypes";
import Filters from "../components/Filters";
import { getIngredientColor } from "../components/Ingredients";
import { motion } from "framer-motion";
import { PiMaskSadLight } from "react-icons/pi";
import { Tomorrow, Mali } from "next/font/google";
import { IoMdCloseCircle } from "react-icons/io";
const textTitle = Tomorrow({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const textFont = Mali({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Menu() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSelector(
    (state: RootState) => state.data as DataState
  );
  const [filter, setFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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

        {isLoading ? (
          <div className="flex gap-16 mx-auto">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className="my-64 sm:w-16 sm:h-16 w-10 h-10 bg-orange-800 rounded-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.1,
                }}
              />
            ))}
          </div>
        ) : (
          <div
            className={`ContainerMenu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl mx-auto py-8 ${textTitle.className}`}
          >
            {data.length > 0 ? (
              data.map((entry: DataItem) => {
                const { id, name, image, price, category, rating } =
                  entry.fields;
                const imageUrl = image?.fields?.file.url || "";
                if (filter === "All" || category === filter) {
                  return (
                    <Link
                      key={id}
                      href={`/menu/${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedItem({
                          id,
                          name,
                          image: imageUrl,
                          price,
                          rating,
                          quantity: 1,
                          description: entry.fields.description,
                          ingredients:
                            entry.fields.ingredients?.map(
                              (ingredient: any) => ingredient.fields.name
                            ) || [],
                          comments:
                            entry.fields.comments?.map(
                              (comment: any) => comment.fields.comment
                            ) || [],
                        });
                        setIsModalOpen(true);
                      }}
                    >
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
                    </Link>
                  );
                }
              })
            ) : (
              <div className="md:text-7xl text-orange-800 w-92 md:absolute md:left-96 text-5xl">
                <h1 className="text-center">No items available</h1>
                <PiMaskSadLight
                  size={100}
                  color="#9a3412"
                  className="md:absolute md:left-64"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-[#efeee9] rounded-lg shadow-[0_4px_8px_#00000033] lg:max-w-[500px] md:w-[25rem] w-[18rem] flex flex-col items-center text-center px-4 py-2 gap-2 z-60">
            {selectedItem ? (
              <>
                <IoMdCloseCircle
                  size={25}
                  onClick={closeModal}
                  className="cursor-pointer text-[#693618] hover:text-[#ea6d27] self-end"
                />
                <h1
                  className={`text-3xl font-bold modal-name ${textTitle.className} text-orange-900`}
                >
                  {selectedItem.name}
                </h1>
                <Image
                  src={`https:${selectedItem.image}`}
                  alt={selectedItem.name}
                  width={100}
                  height={100}
                  className="lg:w-64 lg:h-64 md:w-40 md:h-40 object-cover modal-img border border-gray-800 rounded-xlgi"
                />
                <p className={`sm:text-xl text-lg ${textFont.className}`}>
                  Price:
                  <span className="text-orange-600 ">
                    ${selectedItem.price.toFixed(2)}
                  </span>
                </p>

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

                <div className="modal-ingredients-container border-t border-t-gray-400 border-b border-b-gray-400 py-2">
                  <p
                    className={`text-md text-orange-700 ${textFont.className}`}
                  >
                    Ingredients
                  </p>
                  <div className="mt-4 flex modal-ingredients flex-wrap gap-2 justify-center">
                    {selectedItem.ingredients?.map(
                      (ingredient: string, index: number) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full  text-white text-sm font-semibold ${getIngredientColor(
                            ingredient
                          )}`}
                        >
                          {ingredient}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <Link
                  href={`/menu/${selectedItem.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="rounded-full details-btn border border-orange-800 bg-[#b46527] px-2 py-1 text-orange-200 my-2 hover:bg-orange-900">
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
