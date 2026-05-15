"use client"

import { useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Coins, Gem, User } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "./context/LanguageContext"

export function TopBar({
  comingFrom = "spin-the-wheel",
  remainingJackpot = 0,
}: {
  comingFrom?: string
  remainingJackpot?: number
}) {
  const navigate = useNavigate();
  const { data: response } = useAppSelector((state) => state.home);
  const user_play_coins = response?.data?.userInfo?.user_play_coins;
  const { data: profileData } = useAppSelector((state) => state.profile);
  const userPoints = response?.data?.diamonds ?? profileData?.data?.userPoints ?? 0;

  const dashboard = useAppSelector((state) => state.dashboard);
  const { t } = useLanguage();

  const [gemOpen, setGemOpen] = useState(false)
  const [coinOpen, setCoinOpen] = useState(false)

  const gemTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const coinTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gemOpen) {
      gemTimeoutRef.current = setTimeout(() => {
        setGemOpen(false);
      }, 2000);
    }
    return () => {
      if (gemTimeoutRef.current) {
        clearTimeout(gemTimeoutRef.current);
        gemTimeoutRef.current = null;
      }
    };
  }, [gemOpen]);

  useEffect(() => {
    if (coinOpen) {
      coinTimeoutRef.current = setTimeout(() => {
        setCoinOpen(false);
      }, 2000);
    }
    return () => {
      if (coinTimeoutRef.current) {
        clearTimeout(coinTimeoutRef.current);
        coinTimeoutRef.current = null;
      }
    };
  }, [coinOpen]);

  const handleGemClick = () => {
    setGemOpen(true)
  }

  const handleCoinClick = () => {
    setCoinOpen(true)
  }
  return (
    <>
      <div className="sticky -top-[1px] z-[99] w-full">
        <div
          className="bg-deep-navy px-2 rounded-b-2xl h-[70px] flex items-center"
          style={{
            borderBottom: "1px solid hsl(240 6% 20%)",
          }}
        >
          <div className="flex items-center justify-between w-full">
            {/* LEFT: LOGO */}
            <div className="flex items-center gap-2 cursor-pointer transform translate-y-0.5">
              <div className="rounded-lg">
                <img
                  src="/assets/images/logo.png"
                  className="h-10 w-auto object-contain"
                  alt="Spin Zone"
                  loading="lazy"
                />
              </div>
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex items-center gap-2">
              {/* COINS */}
              <Popover open={gemOpen} onOpenChange={setGemOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGemClick}
                    className="relative
    bg-card/50 dark:bg-card/10
    backdrop-blur-sm
    hover:bg-card/20
    transition-all
    gap-1

    text-white
    border border-blue-400/60

    before:absolute before:inset-0 before:rounded-md
    before:shadow-[0_0_10px_rgba(59,130,246,0.9)]
    before:opacity-100
    before:animate-pulse
    before:pointer-events-none

    px-3"
                  >
                    <img
                      src="/assets/images/diamond5.png"
                      alt="diamond"
                      className="h-5 object-cover me-1"
                    />
                    <span className="font-bold text-blue-400 text-[11px]">{userPoints}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  sideOffset={12}
                  align="end"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className="w-55 bg-card/5 backdrop-blur-xl border border-blue-400/20 shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-xl z-[1100] p-4"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white">
                      {t.totalDiamonds}
                      <span className="font-semibold text-blue-400">
                        {userPoints?.toLocaleString()}
                      </span>{" "}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>

              {/* REWARD COINS */}
              <Popover open={coinOpen} onOpenChange={setCoinOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCoinClick}
                    className="bg-card/50 dark:bg-card/10
    backdrop-blur-sm
    hover:dark:bg-card/20
    transition-all px-1

    text-yellow-400
    border border-border/50 

    before:absolute before:inset-0 before:rounded-md
    before:shadow-[0_0_8px_rgba(250,204,21,0.9)]
    before:opacity-100
    before:animate-pulse
    before:pointer-events-none px-3"
                  >
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="font-bold text-yellow-400 text-[11px]">{user_play_coins}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  sideOffset={10}
                  align="end"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                  className="w-55 bg-card/5 backdrop-blur-xl border border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.3)] rounded-xl z-[1100] p-4"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white">
                      {t.totalCoins}
                      <span className="font-semibold text-yellow-400">
                        {user_play_coins?.toLocaleString()}
                      </span>{" "}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>

              {/* PROFILE ICON */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/profile")}
                className="relative bg-white dark:bg-card/10 backdrop-blur-sm hover:dark:bg-card/20 transition-all border border-white/40 rounded-xl h-7 w-7 p-0 flex items-center justify-center"
              >
                <User className="h-5 w-5 text-black dark:text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
