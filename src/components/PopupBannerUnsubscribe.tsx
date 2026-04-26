"use client";

import { useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { useAppSelector } from "@/app/hooks";

const PopupBannerUnsubscribe = ({
  data,
  isShow,
  onClose,
  onConfirm,
  confirmText,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const dashboard = useAppSelector((state) => state?.dashboard);
  const is_freemium = dashboard?.data?.data?.user_is_freemium;

  useEffect(() => {
    if (!isShow) return;
    if (!data?.autoCloseTimer || data.autoCloseTimer <= 0) return;

    const timer = setTimeout(() => {
      onClose?.(); // notify parent on auto-close
    }, data.autoCloseTimer * 1000);

    return () => clearTimeout(timer);
  }, [isShow, data?.autoCloseTimer, onClose]);

  const handleClose = () => {
    onClose?.();
  };

  return (
    <motion.div
      key="popup-banner-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ marginTop: "0px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative gradient-popup-premium backdrop-blur-3xl rounded-[2.5rem] max-w-sm w-[85%] p-6 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(236,72,153,0.1)] flex flex-col items-center gap-4 overflow-hidden"
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
          className="absolute z-[50] top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 border-2 border-pink-900 flex items-center justify-center transition-all"
        >
          <X className="h-5 w-5 text-white/60 hover:text-white" />
        </button>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full text-center relative z-10"
        >
          {/* Celebration Image Visual */}
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
                      src="/assets/robotavatar/3.png"
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

          {data?.title && (
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-white to-pink-600 bg-clip-text text-transparent leading-tight mb-3">
              {data.title}
            </h2>
          )}
          {data?.description && (
            <p className="text-[12px] leading-relaxed text-blue-100/70 font-semibold tracking-[1px]">
              {data.description}
            </p>
          )}

          <div className="mt-8 space-y-3">
            <Button
              className="h-12 w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-900/20 border-t border-white/20 transition-all active:scale-95 tracking-[1px]"
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
            >
              {confirmText || t.confirm}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PopupBannerUnsubscribe;
