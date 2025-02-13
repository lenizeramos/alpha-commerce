import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";
import { fetchData } from "../context/slices/DataSlice";

import { Gowun_Dodum, Mali } from "next/font/google";
const textFont = Mali({
  weight: "400",
  style: "normal",
});
const textTitle = Gowun_Dodum({
  weight: "400",
  style: "normal",
});

const RandomDishes = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.data);

  const element: number[] = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * data.length) + i;
    element.push(randomIndex);
  }
  console.log("my indexes", data[element[0]]);
  useEffect(() => {
    if (!data.length) {
      dispatch(fetchData());
    }
  }, [dispatch]);

  return (
    <>
      <div className="mainContainer flex flex-col items-center justify-center mt-2 gap-10 sm:gap-16 p-8">
        <h3 className={`${textFont.className} text-3xl sm:text-5xl text-center`}>
          Our Special Dishes
        </h3>
        <div className="dishesContainer flex flex-wrap justify-center gap-24">
          {data.length > 0 ? (
            element.map((item, index) => {
              const entry = data[item];
              const { name, image, price } = entry.fields;
              const imgUrl = image?.fields?.file.url || "";
              return (
                <div
                  key={index}
                  className="w-[12rem] sm:w-[15rem] h-[10rem] relative"
                >
                  <h4
                    className={`${textTitle.className} text-2xl sm:text-3xl text-gray-500 text-center`}
                  >
                    {name}
                  </h4>
                  <div className="imgContainer w-[10rem] sm:w-[12rem] h-[10rem] sm:h-[12rem] absolute sm:top-[5rem] top-[3rem]">
                    <Image
                      src={`https:${imgUrl}`}
                      alt={name}
                      layout="fill"
                      className="rounded-full ml-10 border border-[#444242]"
                    />
                    <p
                      className={`${textFont.className} imgRandom text-xl rounded-full bg-[#E3DAC9] w-16 h-16 text-center pt-3 z-50 border border-[#565554]`}
                    >
                      ${price}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>Items not available</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default RandomDishes;
