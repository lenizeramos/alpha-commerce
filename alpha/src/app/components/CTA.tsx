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
      className={` botton-shadow px-5 py-2 text-white rounded-full ${delicious.className} text-xl`}
    >
      TAKEOUT!
    </button>
  );
};

export default CTA;
