"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { AlertCircle, X } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

interface PopupBannerForDuplicateSetProps {
  isShow: boolean;
  duplicateSets?: {
    [cycle: string]: {
      [batch: string]: { number: string; set: string }[];
    };
  };
  onConfirm: () => void;
}

const PopupBannerForDuplicateSet = ({
  isShow,
  duplicateSets,
  onConfirm,
}: PopupBannerForDuplicateSetProps) => {
  const { t, language } = useLanguage();
  if (!isShow) return null;

  const handleClose = () => {
    onConfirm?.();
  };

  return (
    <motion.div
      key="duplicate-set-popup-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative gradient-popup-premium backdrop-blur-3xl rounded-[2.5rem] max-w-sm w-[85%] p-6 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(236,72,153,0.1)] flex flex-col items-center gap-4 overflow-hidden"
      >
        {/* Glowing Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-500 rounded-tl-[2.5rem] pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-yellow-500 rounded-tr-[2.5rem] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-yellow-500 rounded-bl-[2.5rem] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500 rounded-br-[2.5rem] pointer-events-none" />

        {/* Luminous Ambient Glows */}
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-red-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute z-[50] top-4 right-4 w-10 h-10 rounded-full bg-black/5 hover:bg-white/10 active:scale-90 border-2 border-pink-900 flex items-center justify-center transition-all"
        >
          <X className="h-5 w-5 text-white/80 hover:text-white" />
        </button>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full text-center relative z-10"
        >
          {/* Warning Visual */}
          <div className="relative mb-4 flex justify-center">
            <motion.div
              animate={{
                y: [-4, 4, -4],
                rotate: [-1, 1, -1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-28 h-28"
            >
              {/* Image Container */}
              <div className="absolute inset-0 rounded-[2rem] ">
                <div className="w-full h-full  flex items-center justify-center overflow-hidden relative">
                  <img
                    src="/assets/robotavatar/2.png"
                    className="w-full h-full object-cover relative z-10"
                    alt="Duplicate Warning"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-white to-pink-600 bg-clip-text text-transparent leading-tight mb-4">
            {t.duplicateSetNumbers}
          </h2>

          <div className="max-h-[150px] overflow-y-auto pr-2 custom-scrollbar space-y-2 mb-6">
            {duplicateSets && Object.entries(duplicateSets).map(([cycleNum, cycleData]) => (
              Object.entries(cycleData).map(([batchNum, details]) => (
                details.map((item, idx) => (
                  <div
                    key={`${cycleNum}-${batchNum}-${idx}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-3 group hover:bg-white/20 transition-all"
                  >
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="text-[10px] text-pink-400 font-bold tracking-[1px]">
                        {t.cycle} {cycleNum}
                      </span>
                      <p className="text-[10px] text-white font-semibold text-left tracking-[1px] leading-relaxed">
                        {language === "en" ? (
                          <>
                            {t.number} <span className="text-yellow-400 font-bold">{item.number}</span> {t.isPresentInSet} {t.set} {batchNum}
                          </>
                        ) : (
                          <>
                            {t.number} <span className="text-yellow-400 font-bold">{item.number}</span> သည် {t.set} {batchNum} {t.isPresentInSet}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ))
            ))}
            {!duplicateSets && (
              <p className="text-[12px] leading-relaxed text-slate-300 font-semibold tracking-[0.5px]">
                {t.duplicateSetMessage || "Duplicate numbers found in existing sets."}
              </p>
            )}
          </div>

          <div className="mt-8">
            <Button
              className="h-14 w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-900/20 border-t border-b border-white/70 transition-all active:scale-95 tracking-[1px] text-sm"
              onClick={onConfirm}
            >
              {t.enterUniqueNumber}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PopupBannerForDuplicateSet;
