import { Delicious_Handrawn } from "next/font/google";

const delicious = Delicious_Handrawn({
  weight: "400",
  style: "normal",
});

const CTA = () => {
  return (
    <>
      <button
        className={` botton-shadow px-5 py-2 text-white rounded-full ${delicious.className} text-xl`}
      >
        TAKEOUT!
      </button>
    </>
  );
};

export default CTA;
