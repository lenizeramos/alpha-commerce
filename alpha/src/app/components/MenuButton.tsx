import { Delicious_Handrawn } from "next/font/google";

const delicious = Delicious_Handrawn({
  weight: "400",
  style: "normal",
});

const MenuButton = () => {
  return (
    <button
      className={`px-5 py-2 bg-purple-800 text-white rounded-full ${delicious.className} text-xl
  hover:bg-purple-500 
  hover:border hover:border-white 
  hover:shadow-lg transition-transform duration-300 ease-in-out`}
    >
      MENU
    </button>
  );
};

export default MenuButton;
