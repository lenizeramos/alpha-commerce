import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { menu_list } from "../../../public/variables";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Ephesis, Mali } from "next/font/google";

const textFont = Mali({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const textTitle = Ephesis({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Footer = () => {
  const { user } = useClerk();
  const router = useRouter();
  const handleOnClick = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/menu");
    }
  };
  return (
    <>
      <div className={`${textFont.className} bg-white lg:pt-20 md:pt-16 sm:pt-5 pt-10 px-10 pb-5`}>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.png"} alt="logo" width={50} height={50} />
          <h1
            className={`${textTitle.className} text-shadow text-3xl text-orange-800`}
          >
            Alpha Bites
          </h1>
        </div>
        <div className="border-b border-b-gray-400 grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-5 items-start mb-3 pb-3 text-gray-400 sm:text-sm text-xs">
          <div>
            <h3 className="font-bold mb-3 text-gray-800">OPENING HOURS</h3>
            <div className="grid grid-cols-2">
              <p>Moday - Friday</p>
              <p>8:00 am to 10:00 pm</p>
              <p>Saturday</p>
              <p>9:00 am to 11:00 pm</p>
              <p>Sunday</p>
              <p>CLOSED</p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h4 className="font-bold  text-gray-800">DISHES</h4>
            <ul className="grid grid-cols-2 list-none">
              {menu_list.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="hover:text-gray-800 cursor-pointer"
                    onClick={handleOnClick}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex md:flex-col gap-2 justify-between">
            <h4 className="font-bold text-gray-800">FOLLOW US</h4>
            <div>
              <div className="flex gap-3 justify-center sm:justify-start">
                <AiFillInstagram className="hover:text-gray-800 cursor-pointer" />
                <FaFacebookF className="hover:text-gray-800 cursor-pointer" />
                <FaTwitter className="hover:text-gray-800 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between text-gray-500 px-5 sm:px-2 lg:text-sm text-xs sm:gap-4 gap-3">
          <p className="text-center sm:text-left">
            © 2025 Alpha Bites. All Right Reserved. Designed by AlphaTeam
          </p>
          <div className="flex sm:gap-5 justify-center sm:justify-start text-center gap-4 ">
            <p className="hover:text-gray-800 cursor-pointer">
              Terms of Service
            </p>
            <p className="hover:text-gray-800 cursor-pointer">Privacy Policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
