import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function FallingProduct() {
  const [closed, setClosed] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

    <motion.div
        className="absolute w-96 h-96 bg-green-200 rounded-full z-0"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.1 }}
      />
      
      {!closed && (
        <motion.div
          className="absolute w-24 h-24"
          initial={{ y: -200 }}
          animate={{ y: 40, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onAnimationComplete={() => setClosed(true)}
        >
          <Image
            src="https://images.vexels.com/media/users/3/146320/isolated/preview/296d7b675af0d7a70c10063746969cd2-bolsa-de-papel-para-alimentos.png"
            alt="Box"
            width={100}
            height={100}
          />
        </motion.div>
      )}
      <motion.div
        className="relative w-32 h-40 bg-yellow-500 rounded-b-lg overflow-hidden flex items-start justify-center"
        initial={{ scaleY: 1.1 }}
        animate={closed ? { scaleY: 1 } : { scaleY: 1.1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </div>
  );
}