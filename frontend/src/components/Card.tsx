"use client";
import Image from "next/image";
import { motion } from "motion/react";

export function Card() {
  return (
    <div
      className="relative w-full"
      style={{
        width: "clamp(93px, calc(186 / 1920 * 100vw), 186px)",
        aspectRatio: "93/139",
      }}
    >
      <div
        className="absolute w-full"
        style={{
          width: "clamp(93px, calc(186 / 1920 * 100vw), 186px)",
          aspectRatio: "93/139",
        }}
      >
        <Image
          src="/images/card.webp"
          alt="Loading"
          width={93}
          height={139}
          sizes="93px"
          className="w-full h-full"
          priority
        />
      </div>

      <motion.div
        className="absolute w-full"
        style={{
          width: "clamp(93px, calc(186 / 1920 * 100vw), 186px)",
          aspectRatio: "93/186",
          boxShadow: "0 0 8px #FFD700",
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
          src="/images/card.webp"
          alt="Loading"
          width={93}
          height={139}
          sizes="93px"
          className="w-full h-full"
          priority
        />
      </motion.div>
    </div>
  );
}
