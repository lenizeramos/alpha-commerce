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
import "./details.css";
import { Princess_Sofia } from "next/font/google";
import { getIngredientColor } from "@/app/components/Ingredients";
import Image from "next/image";
import { BsBasket2 } from "react-icons/bs";
import { addToCart } from "../../context/slices/CartSlice";
import { CartItem } from "../../types/SliceTypes";
import CartAnimation from "../../components/CartAnimation";
import { Tomorrow, Mali } from "next/font/google";
import { text } from "stream/consumers";
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
  const { data, loading, error } = useSelector((state: RootState) => state.data);
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
      <div className="container mx-auto p-6 full-info">
        <div className="img-info">
            <div className="image-container">
                <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.name}
                className="w-full h-full object-cover item-img"
            />
            </div>
            <div className="details">
                <h1 className={`text-5xl mb-8 font-bold ${textTitle.className}`}>{item.fields.name}</h1>
                <div className="ingredients-container">
                    <div className="mb-2 flex ingredients flex-wrap gap-2">
                        {item.fields.ingredients?.map((ingredient: any, index: number) => (
                            <span 
                                key={index} 
                                className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getIngredientColor(ingredient.fields.name)}`}
                            >
                                {ingredient.fields.name}
                            </span>
                        ))}
                    </div>
                </div>
                <p className={`text-lg text-justify mb-5 text-gray-700`}>{item.fields.description}</p>
                <div className="flex items-center">
                  <p className={`text-2xl text-green-600 ${textTitle.className}`}>${item.fields.price.toFixed(2)}</p>
                  <button 
                    onClick={handleAddToCart} 
                    className="ml-4 rounded-full cart text-white px-4 py-2"
                  >
                     <BsBasket2 size={20} />
                  </button>
                </div>

                <div className="reviews mt-6">
                    <h2 className={`text-2xl text-center font-semibold mb-4 ${textTitle.className}`}>Reviews</h2>
                    {item.fields.comments && item.fields.comments.length > 0 ? (
                        <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={10}
                        slidesPerView={1} 
                        centeredSlides={true} 
                        loop={true}     
                        navigation
                        pagination={{ clickable: true }}
                        className="max-w-lg mx-auto custom-swiper"
                        >
                        {item.fields.comments.map((review: any, index: number) => (
                            <SwiperSlide key={index}>
                            <div className="bg-white shadow-lg p-6 rounded-lg text-center w-80 mx-auto">
                                <h3 className="text-xl font-semibold text mb-2">{review.fields.title}</h3>
                                <p className="text-gray-700">{review.fields.comment}</p>
                                <p className="text-sm text-gray-500 mt-2 italic mb-1">
                                {new Date(review.fields.date).toLocaleDateString()}
                                </p>
                            </div>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    ) : (
                        <p className="text-center text-gray-500">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default DetailsPage;


