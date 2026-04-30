"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./context/LanguageContext";

export default function WaitLoader({ isOverlay = false }: { isOverlay?: boolean }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  const phrases = useMemo(() => [
    t.goingOnce,
    t.goingTwice,
    t.preparingLiveBidding,
    t.syncingBiddingData,
    t.gatheringBiddingWinners,
  ], [t]);

  // Cycle through phrases
  useEffect(() => {
    const textTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);

    // Master sync tick for animations (matches hammer cycle)
    const syncTimer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 2000);

    return () => {
      clearInterval(textTimer);
      clearInterval(syncTimer);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${isOverlay ? "bg-black/60 backdrop-blur-md" : "bg-[#0a0b1a]"}`}>
      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative flex flex-col items-center gap-12 text-center">
        
        {/* ── CENTRAL ANIMATION (GAVEL & STAND) ── */}
        <div className="relative scale-150">
          {/* Gavel Hammer */}
          <motion.div
            key={`hammer-${tick}`}
            initial={{ rotate: -40 }}
            animate={{
              rotate: [-40, 5, -40],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.2, 1],
              ease: "easeInOut",
            }}
            className="relative z-20 origin-right"
            style={{ transformOrigin: "85% 75%" }}
          >
            <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-2xl">
              <path
                d="M85,75 L45,45 C42,42 38,42 35,45 C32,48 32,52 35,55 L75,85"
                stroke="url(#loaderGold)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle cx="83" cy="78" r="5" fill="#ca8a04" />
              <g transform="translate(10, 20) rotate(-40 25 25)">
                <rect x="5" y="10" width="30" height="20" fill="url(#loaderGold)" />
                <path d="M5,8 L5,32 L0,35 L0,5 Z" fill="#ca8a04" stroke="#fef3c7" strokeWidth="0.5" />
                <path d="M35,8 L35,32 L40,35 L40,5 Z" fill="#ca8a04" stroke="#fef3c7" strokeWidth="0.5" />
                <rect x="18" y="10" width="4" height="20" fill="#fef3c7" fillOpacity="0.8" />
              </g>
              <defs>
                <linearGradient id="loaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Sound Block Stand */}
          <div className="relative mt-[-15px]">
            <svg viewBox="0 0 100 40" className="w-24 h-10">
              <rect x="20" y="20" width="60" height="12" rx="2" fill="#ca8a04" />
              <rect x="15" y="15" width="70" height="8" rx="2" fill="#fbbf24" />
              <ellipse cx="50" cy="15" rx="35" ry="10" fill="#78350f" />
              <ellipse cx="50" cy="13" rx="30" ry="7" fill="url(#loaderGold)" fillOpacity="0.2" />
            </svg>

            {/* Impact Ripple */}
            <motion.div
              key={`pulse-${tick}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 3],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 0.4,
                delay: 0.16,
                ease: "easeOut",
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-yellow-400 bg-yellow-400/10 pointer-events-none"
            />
          </div>
        </div>

        {/* ── ROTATING PHRASES ── */}
        <div className="relative h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-white text-xl font-bold tracking-widest uppercase italic"
              style={{ textShadow: "0 0 15px rgba(251, 191, 36, 0.4)" }}
            >
              {phrases[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM PROGRESS BAR (SUBTLE) ── */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-600 to-yellow-400"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

      </div>
    </div>
  );
}