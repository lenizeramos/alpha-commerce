"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { RootState, AppDispatch } from "../../context/store";
import { fetchData } from "../../context/slices/DataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getIngredientColor } from "@/app/components/Ingredients";
import Image from "next/image";
import { BsBasket2 } from "react-icons/bs";
import { addToCart } from "../../context/slices/CartSlice";
import { CartItem } from "../../types/SliceTypes";
import CartAnimation from "../../components/CartAnimation";
import { Tomorrow, Mali } from "next/font/google";
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

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  const [item, setItem] = useState<any>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  useEffect(() => {
    if (data.length > 0) {
      const selectedItem = data.find(
        (entry) => String(entry.fields.id) === String(id)
      );
      setItem(selectedItem || null);
    }
  }, [id, data]);

  const handleAddToCart = () => {
    if (item) {
      const cartItem: CartItem = {
        id: item.fields.id,
        name: item.fields.name,
        image: item.fields.image.fields.file.url,
        price: item.fields.price,
        rating: item.fields.rating,
        quantity: 1,
      };
      dispatch(addToCart(cartItem));
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 1500);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <>
      {showAnimation && <CartAnimation />}
      <div className="container mx-auto p-6 md:p-10 full-info">
        <div className="img-info grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full h-full mb-5 flex flex-col items-center justify-center ">
            <h1
              className={`lg:hidden md:text-5xl text-3xl font-bold ${textTitle.className} text-center text-orange-900 mb-5`}
            >
              {item.fields.name}
            </h1>
            <div className="xl:w-[35rem] xl:h-[30rem] md:w-[25rem] md:h-[20rem] sm:w-[20rem] sm:h-[15rem]  w-[15rem] h-[10rem] relative">
              <Image
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.name}
                layout="fill"
                objectFit="cover" 
                className="item-img border border-gray-800 rounded-2xl"
              />
            </div>
          </div>
          <div className="details">
            <h1
              className={`md:text-5xl hidden lg:block mb-8 font-bold text-center ${textTitle.className} text-orange-800`}
            >
              {item.fields.name}
            </h1>
            <div className="ingredients-container">
              <div className="mb-2 flex ingredients flex-wrap gap-2 justify-center">
                {item.fields.ingredients?.map(
                  (ingredient: any, index: number) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getIngredientColor(
                        ingredient.fields.name
                      )}`}
                    >
                      {ingredient.fields.name}
                    </span>
                  )
                )}
              </div>
            </div>
            <p className={`md:text-lg text-md text-justify my-5 text-gray-700`}>
              {item.fields.description}
            </p>
            <div className="flex items-center justify-center gap-10">
              <p
                className={`md:text-2xl text-lg text-gray-800  ${textTitle.className}`}
              >
                Price:&nbsp;
                <span className="text-orange-600 font-bold">
                  ${item.fields.price.toFixed(2)}
                </span>
              </p>
              <BsBasket2
                size={25}
                onClick={handleAddToCart}
                className="cursor-pointer text-[#693618] hover:text-[#ea6d27]"
              />
            </div>

            <div className="reviews mt-6">
              <h2
                className={`text-2xl md:text-3xl text-center font-semibold mb-4 ${textTitle.className} text-orange-800`}
              >
                Reviews
              </h2>
              {item.fields.comments && item.fields.comments.length > 0 ? (
                <Swiper
                  modules={[Pagination, Navigation]}
                  spaceBetween={10}
                  slidesPerView={1}
                  centeredSlides={true}
                  loop={true}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  pagination={{ clickable: true }}
                  className="max-w-lg custom-swiper text-sm"
                >
                  {item.fields.comments.map((review: any, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="bg-white shadow-lg p-6 rounded-lg text-center w-full mx-auto h-auto flex flex-col justify-between overflow-hidden">
                        <h3
                          className={`text-xl sm:text-2xl font-semibold text mb-2 text-orange-600 ${textTitle.className}`}
                        >
                          {review.fields.title}
                        </h3>
                        <p
                          className={`text-gray-700 ${textFont.className} sm:text-xl`}
                        >
                          {review.fields.comment}
                        </p>
                        <p
                          className={`text-sm sm:text-xl text-gray-500 mt-2 italic mb-1 ${textFont.className}`}
                        >
                          {new Date(review.fields.date).toLocaleDateString()}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <p className="text-center text-gray-500 text-xl">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
