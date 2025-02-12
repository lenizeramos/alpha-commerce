import { Delicious_Handrawn } from "next/font/google";
import { useRouter } from "next/navigation";

const delicious = Delicious_Handrawn({
  weight: "400",
  style: "normal",
});

const CTA = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/sign-in")}
      className={`px-5 py-2 bg-purple-800 text-white rounded-full ${delicious.className} text-xl
  hover:bg-purple-500 
  hover:border hover:border-white 
  hover:shadow-lg transition-transform duration-300 ease-in-out`}
    >
      TAKEOUT!
    </button>
  );
};

export default CTA;
