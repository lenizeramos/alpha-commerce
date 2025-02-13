import { Delicious_Handrawn } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuBadgePlus } from "react-icons/lu";

const delicious = Delicious_Handrawn({
  weight: "400",
  style: "normal",
});

interface ICTA {
  text?: string;
  icon?: boolean;
}

const CTA = ({ text, icon }: ICTA) => {
  const router = useRouter();
  return (
    <>
      {icon ? (
        <Link href="/menu" >
          <LuBadgePlus
            size={30}
            color="#ea6d27"
            className="cursor-pointer"
          />
        </Link>
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
