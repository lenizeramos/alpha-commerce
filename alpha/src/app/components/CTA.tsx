import { Delicious_Handrawn } from "next/font/google";
import { useRouter } from "next/navigation";
import { LuBadgePlus } from "react-icons/lu";
import { useClerk } from "@clerk/nextjs";

const delicious = Delicious_Handrawn({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

interface ICTA {
  text?: string;
  icon?: boolean;
}

const CTA = ({ text, icon }: ICTA) => {
  const router = useRouter();
  const { user } = useClerk();

  const handleOnClick = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/menu");
    }
  };
  return (
    <>
      {icon ? (
          <LuBadgePlus
            size={30}
            color="#ea6d27"
            className="cursor-pointer"
            onClick={handleOnClick}
          />
      ) : (
        <button
          onClick={() => router.push("/sign-in")}
          className={` botton-shadow px-5 py-2 text-white rounded-full ${delicious.className} text-xl`}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default CTA;
