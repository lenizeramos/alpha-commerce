'use client'
import Image from "next/image";
import { Tomorrow } from "next/font/google";
import { motion } from "framer-motion";

const textFont = Tomorrow({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function checkout() {
  return (
    <>
      <div className={`${textFont.className} flex flex-col xl:gap-60 sm:gap-20 gap:10 xl:px-36 p-10 relative`}>
      <div className="absolute -left-5 md:top-5">
          <Image
            src={"/decoration/img12.png"}
            alt=""
            width={300}
            height={300}
          />
        </div>
      <div className="hidden md:block absolute right-5 bottom-0 opacity-15">
          <Image
            src={"/decoration/img11.png"}
            alt=""
            width={400}
            height={400}
          />
        </div>
      <motion.h1
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0,scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 100 }}
      className="text-checkout md:text-7xl sm:text-5xl text-3xl text-orange-800 text-center sm:pt-14"
    >
      Thanks a ton! Your order is on its way. Can&apos;t wait for you to receive it!
    </motion.h1>
        <div className="relative">
          <Image
            src={"/delivery.png"}
            alt="delivery"
            width={100}
            height={100}
            className="absolute z-20 -left-32"
            id="delivery"
          />
          <Image
            src={"/food.png"}
            alt="food"
            width={30}
            height={30}
            className="absolute z-10 bottom-0 left-[60%] opacity-0"
            id="food"
          />
        </div>
      </div>
    </>
  );
}
