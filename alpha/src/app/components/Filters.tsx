import Image from "next/image";
import { menu_list } from "../../../public/variables";

interface IFilters {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

}

const Filters = ({ category, setCategory }: IFilters) => {
  return (
    <>
      <div className="flex justify-between items-center gap-2 text-center mx-5 w-full max-w-6xl">
        {menu_list.map((menu, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) => (prev === menu.name ? "All" : menu.name))
              }
            >
              <Image
                src={menu.img}
                alt={menu.name}
                width={100}
                height={100}
                className={`cursor-pointer rounded-[50%] transition duration-200 ${category === menu.name ? 'border-[4px] border-purple-900 p-[2px]': ''}`}
              />
              <p className="text-[#747474] mt-3 text-[max(1.4vw,1rem)]">
                {menu.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Filters;
