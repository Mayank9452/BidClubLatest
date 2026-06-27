"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, X, Award } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "./context/LanguageContext";

interface PopupMonthlyRewardsProps {
  onClose: () => void;
  currentUserPosition?: number;
}

const PopupMonthlyRewards = ({
  onClose,
  currentUserPosition,
}: PopupMonthlyRewardsProps) => {
  const { t } = useLanguage();

  const isRank1Matched = currentUserPosition === 1;
  const isRank2Matched = currentUserPosition === 2;
  const isRank3Matched = currentUserPosition === 3;
  const isRank4to7Matched = currentUserPosition !== undefined && currentUserPosition >= 4 && currentUserPosition <= 7;
  const isRank8to10Matched = currentUserPosition !== undefined && currentUserPosition >= 8 && currentUserPosition <= 10;

  const highlightClass = "bg-gradient-to-r from-violet-600/70 to-purple-600/70 border-violet-400 font-bold scale-[1.03]";
  const normalClass = "bg-white/5 border border-white/10 hover:bg-white/10";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-[2px] will-change-transform"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative gradient-popup-premium backdrop-blur-md rounded-[2.5rem] max-w-sm w-[85%] p-6 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 overflow-hidden text-white z-10 will-change-transform"
      >
        {/* Glowing Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-500 rounded-tl-[2.5rem] pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-yellow-500 rounded-tr-[2.5rem] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-yellow-500 rounded-bl-[2.5rem] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500 rounded-br-[2.5rem] pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-pink-500/10 blur-[60px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />

        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute z-[50] top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 border-2 border-pink-900 flex items-center justify-center transition-all"
        >
          <X className="h-5 w-5 text-white/60 hover:text-white" />
        </button> */}

        {/* Header / Mascot container */}
        <div className="w-full text-center relative z-10 mt-2">
          <h2 className="text-lg font-bold bg-gradient-to-r from-pink-400 via-white to-pink-600 bg-clip-text text-transparent leading-tight mb-2">
            {t.monthlyRewardsTitle}
          </h2>
          <p className="text-xs text-blue-100 leading-relaxed mb-4">
            {t.monthlyRewardsDesc}
          </p>

          {/* Reward Items List */}
          <div className="space-y-2 text-left w-full max-h-[220px] overflow-y-auto pr-1">
            {/* Rank 1 */}
            <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${isRank1Matched ? highlightClass : normalClass}`}>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className={`text-xs font-bold ${isRank1Matched ? "text-white" : "text-amber-300"}`}>
                  {t.monthlyRewardsRank1} {isRank1Matched && `(${t.youText})`}
                </span>
              </div>
              <span className={`text-xs font-black tracking-wide ${isRank1Matched ? "text-white" : "text-amber-300"}`}>
                {t.monthlyRewardsAtomData5GB}
              </span>
            </div>

            {/* Rank 2 */}
            <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${isRank2Matched ? highlightClass : normalClass}`}>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span className={`text-xs font-bold ${isRank2Matched ? "text-white" : "text-slate-300"}`}>
                  {t.monthlyRewardsRank2} {isRank2Matched && `(${t.youText})`}
                </span>
              </div>
              <span className={`text-xs font-black tracking-wide ${isRank2Matched ? "text-white" : "text-slate-300"}`}>
                {t.monthlyRewardsAtomData1GB}
              </span>
            </div>

            {/* Rank 3 */}
            <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${isRank3Matched ? highlightClass : normalClass}`}>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className={`text-xs font-bold ${isRank3Matched ? "text-white" : "text-amber-500"}`}>
                  {t.monthlyRewardsRank3} {isRank3Matched && `(${t.youText})`}
                </span>
              </div>
              <span className={`text-xs font-black tracking-wide ${isRank3Matched ? "text-white" : "text-amber-500"}`}>
                {t.monthlyRewardsAtomData500MB}
              </span>
            </div>

            {/* Rank 4-7 */}
            <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${isRank4to7Matched ? highlightClass : normalClass}`}>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className={`text-xs font-bold ${isRank4to7Matched ? "text-white" : "text-slate-400"}`}>
                  {t.monthlyRewardsRanks4To7} {isRank4to7Matched && `(${t.youText})`}
                </span>
              </div>
              <span className={`text-xs font-black tracking-wide ${isRank4to7Matched ? "text-white" : "text-slate-200"}`}>
                {t.monthlyRewardsAtomData100MB}
              </span>
            </div>

            {/* Rank 8-10 */}
            <div className={`flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${isRank8to10Matched ? highlightClass : normalClass}`}>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className={`text-xs font-bold ${isRank8to10Matched ? "text-white" : "text-slate-400"}`}>
                  {t.monthlyRewardsRanks8To10} {isRank8to10Matched && `(${t.youText})`}
                </span>
              </div>
              <span className={`text-xs font-black tracking-wide ${isRank8to10Matched ? "text-white" : "text-slate-200"}`}>
                {t.monthlyRewardsAtomData50MB}
              </span>
            </div>
          </div>

          <p className="text-xs text-center text-slate-200 mt-3 leading-relaxed border-t border-white/5 pt-2 mb-2">
            {t.monthlyRewardsDisclaimer}
          </p>

          <Button
            className="text-base h-12 w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-900/20 border-t border-white/20 transition-all active:scale-95 mt-2"
            onClick={onClose}
          >
            {t.okayText}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopupMonthlyRewards;
