"use client";
import Lottie from "lottie-react";
import fireAnimation from "@/animations/fire.json";

export default function FireAnimation() {
  return (
    <>
      <div className="col-start-1 row-start-1 relative">
        <div
          className="absolute"
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
          className="absolute"
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

        <div
          className="absolute"
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
      </div>
    </>
  );
}
