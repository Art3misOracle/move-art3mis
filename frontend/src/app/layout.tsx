// "use client";
import type { ReactNode } from "react";
import { irishGrover } from "@/fonts/fonts";
import type { Metadata } from "next";

import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.art3mis.xyz"),
  applicationName: "Art3MisOracle",
  title: "Art3MisOracle",
  description: "Art3MisOracle",
  manifest: "/manifest.json",
  openGraph: {
    title: "Art3MisOracle",
    description:
      "🧚‍♀️ Mystical #AITarot on the #Blockchain, in the heart of the #cryptoverse ✨",
    images: ["/favicon.ico"],
    url: "https://www.art3mis.xyz/",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" className={`${irishGrover.variable}`}>
        <body>
          <WalletProvider>
            <ReactQueryProvider>
              <div id="root">{children}</div>
              <WrongNetworkAlert />
              <Toaster />
            </ReactQueryProvider>
          </WalletProvider>
        </body>
      </html>
    </>
  );
}
