"use client";

import React, { useEffect, useState } from "react";
import { X, Trophy, Gift, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useLanguage } from "./context/LanguageContext";

const PopupBannerUpdated = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const [selectedAvatar] = useState<string>("1.png");

  useEffect(() => {
    const shown = sessionStorage.getItem("popupBannerShown");
    if (!shown) {
      setIsVisible(true);
      // sessionStorage.setItem("popupBannerShown", "true"); // Uncomment this for production-like behavior
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("popupBannerShown", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="welcome-popup-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative gradient-popup-premium backdrop-blur-3xl rounded-[2.5rem] max-w-sm w-full p-6 border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(236,72,153,0.1)] flex flex-col items-center gap-4 overflow-hidden text-center"
          >
            {/* Glowing Corner Accents */}
            {/* Top Left */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-500 rounded-tl-[2.5rem] pointer-events-none" />

            {/* Top Right */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-yellow-500 rounded-tr-[2.5rem] pointer-events-none" />

            {/* Bottom Left */}
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-yellow-500 rounded-bl-[2.5rem] pointer-events-none" />

            {/* Bottom Right */}
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500 rounded-br-[2.5rem] pointer-events-none" />

            {/* Luminous Ambient Glows (Aurora Effect) */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute z-[100] top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 border-2 border-pink-900 flex items-center justify-center transition-all shadow-sm"
            >
              <X className="h-5 w-5 text-white/60 hover:text-white" />
            </button>

            <div className="relative z-10 w-full">
              {/* Decorative Icon Head */}
              {/* Mystery Box Visual (Welcome Variant) */}
              <div className="relative mb-4 flex justify-center">
                <motion.div
                  animate={{
                    y: [-6, 6, -6],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative group"
                >
                  {/* Outer Atmosphere Glow */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />

                  <div className="relative w-24 h-24">
                    {/* The Container */}
                    <div className="absolute inset-0 rounded-[2rem]">
                      <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
                        {/* Golden internal light */}
                        <div className="absolute inset-0 " />

                        <img
                          src="/assets/robotavatar/4.png"
                          className="w-full h-full object-cover relative z-10 "
                          alt="Success Robot"
                        />

                        {/* Floating Sparkle Particles */}
                        <motion.div
                          animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          className="absolute top-4 right-4"
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
                          className="absolute bottom-4 left-4"
                        >
                          <Sparkles className="w-3 h-3 text-pink-400" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Floating Gems/Stars around the container */}
                    {/* <motion.div
                  animate={{ y: [0, -2, 0], rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-4 -left-4 w-7 h-7 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-lg blur-[1px] shadow-lg flex items-center justify-center"
                >
                  <div className="w-3 h-3 bg-white/40 rounded-full" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-2 -right-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-[1px] shadow-lg"
                /> */}
                  </div>
                </motion.div>
              </div>

              {/* Title */}
              <div className="mb-4 px-4">
                <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-white to-pink-600 bg-clip-text text-transparent leading-tight">
                  {t.welcomeToBidblast}
                </h2>
              </div>

              {/* Description */}
              <div className="mb-8 px-2">
                <p className="text-xs tracking-[1px] leading-relaxed text-blue-100/70 font-semibold">
                  {t.welcomeDescription}
                </p>
              </div>

              {/* Action Button */}
              <div className="w-full">
                <Button
                  className="h-14 w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white text-sm tracking-[1px] rounded-2xl shadow-lg shadow-pink-900/20 border-t border-white/20 transition-all active:scale-95 font-bold"
                  onClick={handleClose}
                >
                  {t.startBidding}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupBannerUpdated;
