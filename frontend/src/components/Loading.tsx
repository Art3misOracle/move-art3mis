"use client";
import Image from "next/image";
import { motion } from "motion/react";

export function Loading() {
  return (
    <>
      <div className="absolute z-50 w-full h-full">
        <div
          className="absolute w-full"
          style={{
            width: "clamp(300px, calc(600 / 1920 * 100vw), 600px)",
            aspectRatio: "1/1",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            src="/images/loading1.webp"
            alt="Loading"
            width={490}
            height={423}
            sizes="490px"
            className="w-full h-full"
            priority
          />
        </div>

        <motion.div
          className="absolute w-full"
          style={{
            width: "clamp(300px, calc(600 / 1920 * 100vw), 600px)",
            aspectRatio: "1/1",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{ opacity: [0, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/loading2.webp"
            alt="Loading"
            width={490}
            height={423}
            sizes="490px"
            className="w-full h-full"
            priority
          />
        </motion.div>
      </div>
    </>
  );
}
