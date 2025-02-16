"use client";
import Lottie from "lottie-react";
import React from "react";
import fireAnimation from "@/animations/fire.json";

const FireRight = () => {
  return (
    <>
      {/* mobile */}
      <div
        className="absolute md:hidden left-[85vw] bottom-[54vh] 375s:left-[83.6vw] 375s:bottom-[54vh] 390s:left-[84.8vw] 390s:bottom-[53vh] 412s:left-[85.6vw] 412s:bottom-[53.2vh] 414s:left-[84.64vw] 414s:bottom-[53vh]"
        style={{
          width: "clamp(36px, 6%, 280px)",
          aspectRatio: "138/216",
          transform: "translate(-50%, 50%)",
        }}
      >
        <Lottie animationData={fireAnimation} loop={true} autoplay={true} />
      </div>

      {/* desktop */}
      <div
        className="absolute hidden md:flex"
        style={{
          left: "calc(1444 / 1920 * 100%)",
          bottom: "calc(630 / 1080 * 100%)",
          width: "clamp(35px, 4%, 160px)",
          aspectRatio: "138/216",
          transform: "translate(-50%, 50%)",
        }}
      >
        <Lottie animationData={fireAnimation} loop={true} autoplay={true} />
      </div>
    </>
  );
};

export default FireRight;
