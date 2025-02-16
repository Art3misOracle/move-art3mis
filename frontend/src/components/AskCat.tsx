"use client";
import Image from "next/image";

export function AskCat() {
  return (
    <>
      <Image
        src="/images/ask_cat1.webp"
        alt="Ask"
        width={120}
        height={160}
        sizes="120px"
        className="w-full h-full"
        priority
      />
    </>
  );
}
