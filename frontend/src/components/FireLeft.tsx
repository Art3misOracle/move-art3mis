"use client";
import Lottie from "lottie-react";
import React from "react";
import fireAnimation from "@/animations/fire.json";

const FireLeft = () => {
  return (
    <>
      {/* mobile */}

      <div className="md:hidden">
        <div
          className="absolute left-[12vw] bottom-[54vh] 375s:left-[12vw] 375s:bottom-[54vh] 390s:left-[10.5vw] 390s:bottom-[53vh] 412s:left-[9.6vw] 412s:bottom-[53.2vh] 414s:left-[10.5vw] 414s:bottom-[53vh]"
          style={{
            width: "clamp(36px, 6%, 280px)",
            aspectRatio: "138/216",
            transform: "translate(-50%, 50%)",
          }}
        >
          <Lottie animationData={fireAnimation} loop={true} autoplay={true} />
        </div>

        {/* <div
          className=" absolute"
          style={{
            left: "calc(530 / 1920 * 100%)",
            bottom: "calc(532 / 1080 * 100%)",
            width: "clamp(30px, 4%, 160px)",
            aspectRatio: "138/216",
            transform: "translate(-50%, 50%)",
          }}
        >
          <Lottie animationData={fireAnimation} loop={true} autoplay={true} />
        </div> */}
      </div>

      {/* desktop */}

      <div className="hidden md:flex">
        <div
          className=" absolute flex"
          style={{
            left: "calc(496 / 1920 * 100%)",
            bottom: "calc(551 / 1080 * 100%)",
            width: "clamp(40px, 6%, 280px)",
            aspectRatio: "138/216",
            transform: "translate(-50%, 50%)",
          }}
        >
          <Lottie animationData={fireAnimation} loop={true} autoplay={true} />
        </div>

        <div
          className=" absolute"
          style={{
            left: "calc(530 / 1920 * 100%)",
            bottom: "calc(532 / 1080 * 100%)",
            width: "clamp(30px, 4%, 160px)",
            aspectRatio: "138/216",
            transform: "translate(-50%, 50%)",
          }}
        >
          <Lottie animationData={fireAnimation} loop={true} autoplay={true} />
        </div>
      </div>
    </>
  );
};

export default FireLeft;
