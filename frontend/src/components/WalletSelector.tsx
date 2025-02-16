// Internal components
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  // APTOS_CONNECT_ACCOUNT_URL,
  AboutAptosConnect,
  type AboutAptosConnectEducationScreen,
  type AnyAptosWallet,
  AptosPrivacyPolicy,
  WalletItem,
  groupAndSortWallets,
  // isAptosConnectWallet,
  isInstallRequired,
  truncateAddress,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  // Copy,
  // LogOut,
  // User,
} from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { getAccountAPTBalance } from "@/view-functions/getAccountBalance";
// import { useRouter } from "next/router";
import { useRouter, usePathname } from "next/navigation";

export function WalletSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const { account, connected, disconnect } = useWallet();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address);
      toast({
        title: "Success",
        description: "Copied wallet address to clipboard.",
        className: "bg-[#573019] text-white",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy wallet address.",
      });
    }
  }, [account?.address, toast]);

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account?.address) {
        try {
          const bal = await getAccountAPTBalance({
            accountAddress: account.address,
          });
          setBalance(bal);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
          setBalance(0);
        }
      }
    };

    fetchBalance();
  }, [account?.address]);

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleHome = () => {
    router.push("/");
  };

  return connected ? (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center cursor-pointer group">
            <div
              className="relative"
              style={{
                width: "clamp(40px, calc(80 / 1920 * 100vw), 80px)",
                aspectRatio: "1/1",
              }}
            >
              <Image
                src="/images/wallet_avatar.webp"
                alt="Avatar"
                width={267}
                height={80}
                sizes="267px"
                className="w-full h-full absolute left-8 z-10"
                priority
              />
            </div>
            <div
              className="relative w-full"
              style={{
                width: "clamp(106px, calc(212 / 1920 * 100vw), 212px)",
                aspectRatio: "212/80",
              }}
            >
              <Image
                src="/images/wallet_bg.webp"
                alt="Account"
                width={267}
                height={80}
                sizes="267px"
                className="w-full h-full"
                priority
              />
              <div className="absolute top-1/2 left-[64%] -translate-x-[60%] -translate-y-1/2 text-[#EC9261] text-[0.7rem] sm:text-[0.7rem] md:text-[0.75rem] lg:text-[1.2rem] font-bold whitespace-nowrap flex items-center gap-2 group-data-[state=open]:text-[#8d5839]">
                Account
                <div className="w-0 h-0 border-l-[2px] border-r-[2px] border-t-[6px] sm:border-l-[2px] sm:border-r-[2px] sm:border-t-[8px] md:border-l-[3px] md:border-r-[3px] md:border-t-[10px] lg:border-l-[4px] lg:border-r-[4px] lg:border-t-[12px] border-l-transparent border-r-transparent border-t-[#f4a07e] group-data-[state=open]:border-t-[#8d5839] bg-transparent after:content-[''] after:absolute after:top-[-1px] after:left-1/2 after:-translate-x-1/2 after:w-[3px] after:h-[1px] after:bg-transparent"></div>
              </div>
            </div>
          </div>
          {/* <Button>
            {account?.ansName || truncateAddress(account?.address) || "Unknown"}
          </Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="relative p-0 border-0 bg-transparent"
        >
          <div
            className="relative w-full"
            style={{
              width: "clamp(168px, calc(212 / 1920 * 100vw), 212px)",
              aspectRatio: "212/194",
            }}
          >
            <Image
              src="/images/wallet_menu.webp"
              alt="Menu"
              width={212}
              height={194}
              sizes="212px"
              className="w-full h-full absolute top-0 left-0 -z-10"
              priority
            />
            <div className="flex flex-col p-4 text-[#FB7942] gap-2 items-start absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center text-16 text-[#FB7942]">
                <span>Balance</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#f6c543]">
                  {balance} <span className="text-[#EC9261]">APTs</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#df966a] text-14">
                  {truncateAddress(account?.address)}
                </span>{" "}
                <button
                  onClick={copyAddress}
                  className="hover:opacity-80 text-12 underline"
                >
                  {/* <Copy className="h-4 w-4" /> */}
                  Copy
                </button>
              </div>
              <button
                onClick={disconnect}
                className="flex items-center gap-1 hover:opacity-80"
              >
                {/* <LogOut className="h-4 w-4" /> */}
                <span className="text-[#df966a] text-20">Log out</span>
              </button>
            </div>
          </div>

          {/* <DropdownMenuItem onSelect={copyAddress} className="gap-2">
            <Copy className="h-4 w-4" /> Copy address
          </DropdownMenuItem>
          {wallet && isAptosConnectWallet(wallet) && (
            <DropdownMenuItem asChild>
              <a
                href={APTOS_CONNECT_ACCOUNT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <User className="h-4 w-4" /> Account
              </a>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={disconnect} className="gap-2">
            <LogOut className="h-4 w-4" /> Disconnect
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        className="hidden md:block cursor-pointer md:relative ml-2"
        style={{
          width: "clamp(106px, calc(212 / 1920 * 100vw), 212px)",
          aspectRatio: "212/80",
        }}
        onClick={
          pathname === "/profile" ? () => handleHome() : () => handleProfile()
        }
      >
        <Image
          src="/images/wallet_bg.webp"
          alt="Profile"
          width={267}
          height={80}
          sizes="267px"
          className="w-full h-full"
          priority
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EC9261] text-[0.5rem] sm:text-[0.5rem] md:text-[0.75rem] lg:text-[1.2rem] font-bold [text-shadow:1px_1px_5px_black] whitespace-nowrap">
          {pathname === "/profile" ? "Home" : "Profile"}
        </div>
      </div>
    </div>
  ) : (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer relative"
          style={{
            width: "clamp(106px, calc(212 / 1920 * 100vw), 212px)",
            aspectRatio: "212/80",
          }}
        >
          <Image
            src="/images/wallet_bg.webp"
            alt="Connect Wallet"
            width={267}
            height={80}
            sizes="267px"
            className="w-full h-full"
            priority
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#EC9261] text-[0.68rem] sm:text-[0.68rem] md:text-[0.75rem] lg:text-[1.2rem] font-bold whitespace-nowrap">
            Connect Wallet
          </div>
        </div>
        {/* <Button>Connect Wallet</Button> */}
      </DialogTrigger>
      <ConnectWalletDialog close={closeDialog} />
    </Dialog>
  );
}

interface ConnectWalletDialogProps {
  close: () => void;
}

function ConnectWalletDialog({ close }: ConnectWalletDialogProps) {
  const { wallets = [] } = useWallet();
  const { aptosConnectWallets, availableWallets, installableWallets } =
    groupAndSortWallets(wallets);

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  return (
    <DialogContent className="max-h-screen overflow-auto">
      <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
        <DialogHeader>
          <DialogTitle className="flex flex-col text-center leading-snug">
            {hasAptosConnectWallets ? (
              <>
                <span>Log in or sign up</span>
                <span>with Social + Aptos Connect</span>
              </>
            ) : (
              "Connect Wallet"
            )}
          </DialogTitle>
        </DialogHeader>

        {hasAptosConnectWallets && (
          <div className="flex flex-col gap-2 pt-3">
            {aptosConnectWallets.map((wallet) => (
              <AptosConnectWalletRow
                key={wallet.name}
                wallet={wallet}
                onConnect={close}
              />
            ))}
            <p className="flex gap-1 justify-center items-center text-muted-foreground text-sm">
              Learn more about{" "}
              <AboutAptosConnect.Trigger className="flex gap-1 py-3 items-center text-foreground">
                Aptos Connect <ArrowRight size={16} />
              </AboutAptosConnect.Trigger>
            </p>
            <AptosPrivacyPolicy className="flex flex-col items-center py-1">
              <p className="text-xs leading-5">
                <AptosPrivacyPolicy.Disclaimer />{" "}
                <AptosPrivacyPolicy.Link className="text-muted-foreground underline underline-offset-4" />
                <span className="text-muted-foreground">.</span>
              </p>
              <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-muted-foreground" />
            </AptosPrivacyPolicy>
            <div className="flex items-center gap-3 pt-4 text-muted-foreground">
              <div className="h-px w-full bg-secondary" />
              Or
              <div className="h-px w-full bg-secondary" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-3">
          {availableWallets.map((wallet) => (
            <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
          ))}
          {!!installableWallets.length && (
            <Collapsible className="flex flex-col gap-3">
              <CollapsibleTrigger asChild>
                <Button size="sm" variant="ghost" className="gap-2">
                  More wallets <ChevronDown />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-3">
                {installableWallets.map((wallet) => (
                  <WalletRow
                    key={wallet.name}
                    wallet={wallet}
                    onConnect={close}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </AboutAptosConnect>
    </DialogContent>
  );
}

interface WalletRowProps {
  wallet: AnyAptosWallet;
  onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem
      wallet={wallet}
      onConnect={onConnect}
      className="flex items-center justify-between px-4 py-3 gap-4 border rounded-md"
    >
      <div className="flex items-center gap-4">
        <WalletItem.Icon className="h-6 w-6" />
        <WalletItem.Name className="text-base font-normal" />
      </div>
      {isInstallRequired(wallet) ? (
        <Button size="sm" variant="ghost" asChild>
          <WalletItem.InstallLink />
        </Button>
      ) : (
        <WalletItem.ConnectButton asChild>
          <Button size="sm">Connect</Button>
        </WalletItem.ConnectButton>
      )}
    </WalletItem>
  );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton asChild>
        <Button size="lg" variant="outline" className="w-full gap-4">
          <WalletItem.Icon className="h-5 w-5" />
          <WalletItem.Name className="text-base font-normal" />
        </Button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
  return (
    <>
      <DialogHeader className="grid grid-cols-[1fr_4fr_1fr] items-center space-y-0">
        <Button variant="ghost" size="icon" onClick={screen.cancel}>
          <ArrowLeft />
        </Button>
        <DialogTitle className="leading-snug text-base text-center">
          About Aptos Connect
        </DialogTitle>
      </DialogHeader>

      <div className="flex h-[162px] pb-3 items-end justify-center">
        <screen.Graphic />
      </div>
      <div className="flex flex-col gap-2 text-center pb-4">
        <screen.Title className="text-xl" />
        <screen.Description className="text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-foreground" />
      </div>

      <div className="grid grid-cols-3 items-center">
        <Button
          size="sm"
          variant="ghost"
          onClick={screen.back}
          className="justify-self-start"
        >
          Back
        </Button>
        <div className="flex items-center gap-2 place-self-center">
          {screen.screenIndicators.map((ScreenIndicator, i) => (
            <ScreenIndicator key={i} className="py-4">
              <div className="h-0.5 w-6 transition-colors bg-muted [[data-active]>&]:bg-foreground" />
            </ScreenIndicator>
          ))}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={screen.next}
          className="gap-2 justify-self-end"
        >
          {screen.screenIndex === screen.totalScreens - 1 ? "Finish" : "Next"}
          <ArrowRight size={16} />
        </Button>
      </div>
    </>
  );
}
