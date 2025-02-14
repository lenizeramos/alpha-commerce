import Image from "next/image";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { menu_list } from "../../../public/variables";
import { Mali } from "next/font/google";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const textFont = Mali({
  weight: "400",
  style: "normal",
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
      <div className={`${textFont.className} bg-white pt-32 px-10 pb-5`}>
        <div className="border-b border-b-gray-400 grid grid-cols-3 gap-20 items-start mb-3 text-gray-400 text-sm">
          <div className="flex flex-col gap-3 pb-2">
            <div className="flex text-xl items-center font-bold text-gray-800">
              <Image src={"/logo.png"} alt="logo" width={50} height={50} />
              <h1>Alpha Bites</h1>
            </div>
            <p className="text-justify text-sm ">
              Alpha Bites offers a unique dining experience, blending global
              flavors with fresh, locally sourced ingredients. With a modern,
              inviting atmosphere, our menu features creative dishes and gourmet
              twists on classics.
            </p>
            <div className="">
              <h3 className="font-bold mb-3 text-gray-800">OPENING HOURS</h3>
              <div className="flex gap-5 justify-between">
                <div>
                  <p>Moday - Friday</p>
                  <p>8:00 am to 10:00 pm</p>
                </div>
                <div>
                  <p>Saturday</p>
                  <p>9:00 am to 11:00 pm</p>
                </div>
                <div>
                  <p>Sunday</p>
                  <p>CLOSED</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <h4 className="font-bold text-center text-gray-800">DISHES</h4>
            <ul className="grid grid-cols-2 pl-32 list-none">
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
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-gray-800">FOLLOW US</h4>
            <div>
              <div className="flex gap-3 ">
                <AiFillInstagram className="hover:text-gray-800 cursor-pointer" />
                <FaFacebookF className="hover:text-gray-800 cursor-pointer" />
                <FaTwitter className="hover:text-gray-800 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-gray-500 px-20">
          <p>© 2025 Alpha Bites. All Right Reserved. Designed by AlphaTeam</p>
          <div className="flex gap-10">
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
