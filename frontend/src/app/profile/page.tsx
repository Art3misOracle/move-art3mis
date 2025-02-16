"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { WalletSelector } from "@/components/WalletSelector";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getNFTs } from "@/view-functions/getNFTs";
import { aptosClient } from "@/utils/aptosClient";
import { toast } from "@/components/ui/use-toast";
import { Loading } from "@/components/Loading";
import { convertUrl } from "@/utils/helpers";
import { useRouter } from "next/navigation";

interface Card {
  current_token_data: {
    token_uri: string;
    token_properties: {
      PROPERTY_KEY_CARD_NAME: string;
      PROPERTY_KEY_CARD_POSITION: string;
      PROPERTY_KEY_QUESTION: string;
      PROPERTY_KEY_READING: string;
      PROPERTY_KEY_TOKEN_NAME: string;
      PROPERTY_KEY_TIMESTAMP: string;
    };
  };
  owner_address: string;
}

export default function Profile() {
  const { account } = useWallet();
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [choseCard, setChoseCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      if (!account) return;

      try {
        setLoading(true);
        const response = await getNFTs(account.address);
        console.log("test233", response);

        setCards(response);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch cards",
          className: "bg-[#573019] text-white",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [account]);

  const getCardDetail = (card: Card) => {
    setChoseCard(card);
  };

  const handleShareClick = () => {
    const tweetText =
      encodeURIComponent(`✨ Unveil the Mysteries of the Blockchain with Art3mis Oracle! ✨

I've discovered the most magical Web3 tarot card project—Art3mis Oracle. 

🔮 Ready to explore your destiny? Join me at 

art3mis.xyz
`);

    const twitterShareUrl = `https://x.com/intent/post?text=${tweetText}`;

    console.log(twitterShareUrl);

    window.open(twitterShareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen bg-black animate-pulse">
          <Loading />
        </div>
      ) : (
        <div className="w-full h-screen">
          <div className="relative w-full h-full">
            {/* Background Image */}
            <Image
              src="/images/bg_profile_mobile.png"
              alt="background"
              fill
              className="md:hidden absolute top-0 left-0 w-full h-full object-cover"
            />

            <Image
              src="/images/bg_profile.png"
              alt="background"
              fill
              className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
            />

            {choseCard !== null && (
              <div
                onClick={() => setChoseCard(null)}
                className="absolute z-10 cursor-pointer"
                style={{
                  left: "calc(40 / 1920 * 100%)",
                  top: "calc(40 /1080 * 100%)",
                  height: "auto",
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: "clamp(106px, 11.0417vw, 212px)",
                    aspectRatio: "212 / 80",
                  }}
                >
                  <Image
                    src="/images/profile_btn.png"
                    alt="background"
                    fill
                    className="object-cover"
                  />
                  <Image
                    src="/images/profile_back.png"
                    alt="back"
                    width={160}
                    height={60}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[56px] h-[32px] md:w-[80px] md:h-[40px]"
                  />
                </div>
              </div>
            )}

            {/* Wallet */}
            <div
              className="absolute z-10"
              style={{
                right: "calc(40 / 1920 * 100%)",
                top: "calc(40 /1080 * 100%)",
                height: "auto",
              }}
            >
              <WalletSelector />
            </div>

            {/* Content */}
            {choseCard === null ? (
              <div className="relative z-0 h-full overflow-y-auto py-28 px-12 md:px-20 lg:px-32">
                {cards.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-6 place-items-center">
                    {cards.map((card, index) => (
                      <div
                        onClick={() => getCardDetail(card)}
                        key={index}
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <Image
                          src={convertUrl(card.current_token_data.token_uri)}
                          alt={
                            card.current_token_data.token_properties
                              ?.PROPERTY_KEY_CARD_NAME
                          }
                          width={186}
                          height={278}
                          className="mb-2 w-[93px] h-[139px] md:w-[186px] md:h-[278px]"
                          style={{
                            transform: `${card.current_token_data.token_properties.PROPERTY_KEY_CARD_POSITION === "upright" ? "" : "rotate(180deg)"}`,
                          }}
                          loading="eager"
                          priority={index < 3}
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENBLzMzLy0zPVBCR0JHMz1DcWl5VGR2h4iIl5eXqqqq+vr6////2wBDAR"
                          unoptimized={true}
                        />
                        <div className="relative w-[100px] h-[40px] md:w-[186px] md:h-[50px]">
                          <Image
                            src="/images/profile_btn.png"
                            alt="timestamp background"
                            fill
                            className="object-cover"
                            loading="eager"
                            unoptimized={true}
                          />
                          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EC9261] text-[0.9rem] md:text-[1.2rem] lg:text-[1.4rem]">
                            {new Date(
                              Number(
                                card.current_token_data.token_properties
                                  .PROPERTY_KEY_TIMESTAMP
                              ) * 1000
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-white text-center">No cards found</div>
                )}
              </div>
            ) : (
              <div className="relative z-0 h-full overflow-y-auto py-16 md:py-28 px-6 md:px-20 lg:px-32 flex items-center justify-center">
                {/* desktop */}
                <div className="hidden md:flex flex-col items-center w-full max-w-7xl relative">
                  <div className="flex items-start gap-8 w-full justify-center">
                    <div className="flex items-end gap-2">
                      <div className="w-[200px] h-[200px] relative">
                        <Image
                          src="/images/ask_cat1.webp"
                          alt="Cat"
                          fill
                          className="object-contain"
                        />
                      </div>

                      <div className="border-2 md:max-w-[847px] md:max-h-[420px] border-[#EC9261] bg-black bg-opacity-80 rounded-lg p-8 flex-1 overflow-y-auto">
                        <div className="py-1">
                          <p className="text-[#EC9261] text-lg md:text-xl lg:text-2xl">
                            {
                              choseCard?.current_token_data.token_properties
                                .PROPERTY_KEY_READING
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start min-w-[186px]">
                      <Image
                        src={convertUrl(
                          choseCard?.current_token_data.token_uri || ""
                        )}
                        alt={
                          choseCard?.current_token_data.token_properties
                            ?.PROPERTY_KEY_CARD_NAME
                        }
                        width={186}
                        height={278}
                        className="mb-2 w-[93px] h-[139px] md:w-[186px] md:h-[278px]"
                        style={{
                          transform: `${choseCard?.current_token_data.token_properties.PROPERTY_KEY_CARD_POSITION === "upright" ? "" : "rotate(180deg)"}`,
                        }}
                        loading="eager"
                        priority
                        unoptimized={true}
                      />
                      <div className="relative w-[100px] h-[40px] md:w-[186px] md:h-[50px]">
                        <Image
                          src="/images/profile_btn.png"
                          alt="timestamp background"
                          fill
                          className="object-cover"
                          loading="eager"
                          unoptimized={true}
                        />
                        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EC9261] text-[0.9rem] md:text-[1.2rem] lg:text-[1.4rem]">
                          {new Date(
                            Number(
                              choseCard?.current_token_data.token_properties
                                .PROPERTY_KEY_TIMESTAMP
                            ) * 1000
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* mobile */}
                <div className="md:hidden flex flex-col items-center w-full h-full overflow-y-auto">
                  <div className="flex flex-col items-center w-full px-4 pt-4">
                    <Image
                      src={convertUrl(
                        choseCard?.current_token_data.token_uri || ""
                      )}
                      alt={
                        choseCard?.current_token_data.token_properties
                          ?.PROPERTY_KEY_CARD_NAME
                      }
                      width={186}
                      height={278}
                      className="w-[93px] h-[139px] mb-6"
                      style={{
                        transform: `${choseCard?.current_token_data.token_properties.PROPERTY_KEY_CARD_POSITION === "upright" ? "" : "rotate(180deg)"}`,
                      }}
                      loading="eager"
                      priority
                      unoptimized={true}
                    />

                    <div className="relative w-[100px] h-[40px] mb-6">
                      <Image
                        src="/images/profile_btn.png"
                        alt="timestamp background"
                        fill
                        className="object-cover"
                        loading="eager"
                        unoptimized={true}
                      />
                      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EC9261] text-[0.9rem]">
                        {new Date(
                          Number(
                            choseCard?.current_token_data.token_properties
                              .PROPERTY_KEY_TIMESTAMP
                          ) * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="w-full bg-[#EBE5C9] rounded-lg p-4 mb-6 shadow-[0_0_8px_#f5be66]">
                      <p className="text-[#EC9261] font-sans text-lg">
                        {
                          choseCard?.current_token_data.token_properties
                            .PROPERTY_KEY_READING
                        }
                      </p>
                    </div>

                    <div
                      onClick={handleShareClick}
                      className="relative w-[120px] h-[40px] cursor-pointer mb-20"
                    >
                      <Image
                        src="/images/share_mobile.png"
                        alt="Share"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* navbar */}
            <div className="fixed md:hidden bottom-0 w-full flex flex-row justify-center content-center items-center z-20">
              {[
                { label: "Home", icon: "/icons/eye-icon.png" },
                { label: "Profile", icon: "/icons/tree-icon.png" },
              ].map((page, index) => (
                <div
                  key={index}
                  onClick={() => {
                    page.label === "Home" && router.push("/");
                  }}
                  className={`px-3 md:px-5 py-1 flex flex-col justify-center bg-[#0F0E26] text-center 
                               items-center w-1/2 ${
                                 page.label === "Profile"
                                   ? "bg-gradient-to-b from-[#7a5833] via-[#0F0E26] to-[#0F0E26] text-[#FFBB54] border-t-2 border-t-[#B47028]"
                                   : "text-gray-300"
                               }`}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10">
                    <Image
                      src={page.icon}
                      alt={page.label}
                      width={50}
                      height={20}
                      sizes="(max-width: 768px) 32px, 40px"
                      className="w-full h-full"
                      priority
                    />
                  </div>
                  <span className="text-sm md:text-base">{page.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
