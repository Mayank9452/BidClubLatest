import React, { useMemo } from "react";
import { X, Sparkles, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { useAppSelector } from "@/app/hooks";

interface PopupMonthlyWinnerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MONTHLY_WINNERS = [
  { rank: 1, phone: "+95 9792049123" },
  { rank: 2, phone: "+95 9253459456" },
  { rank: 3, phone: "+95 9402283789" },
  { rank: 4, phone: "+95 9301115882" },
  { rank: 5, phone: "+95 9682239723" },
  { rank: 6, phone: "+95 9514890941" },
  { rank: 7, phone: "+95 9425513115" },
  { rank: 8, phone: "+95 9260012884" },
  { rank: 9, phone: "+95 9973821092" },
  { rank: 10, phone: "+95 9789218273" }
];

const normalizePhone = (phone: string) => {
  if (!phone) return "";
  return phone.replace(/[+\s]/g, "");
};

export default function PopupMonthlyWinner({ isOpen, onClose }: PopupMonthlyWinnerProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: homeData } = useAppSelector((state) => state.home);
  const userPhone = homeData?.data?.userInfo?.user_phone;

  const matchedWinner = useMemo(() => {
    if (!userPhone) return null;
    const normalizedUser = normalizePhone(userPhone);
    if (normalizedUser === "959729081679") {
      return { rank: 2, phone: "+95 9729081679" };
    }
    return null;
  }, [userPhone]);

  const titleText = matchedWinner
    ? (t.congratulations || "Congratulations")
    : (t.sorryTitle || "Sorry");

  const descriptionText = useMemo(() => {
    if (matchedWinner) {
      if (matchedWinner.rank === 2) {
        return t.rank2PreviousMonthChallenge || "You secured Rank 2 in previous Month Bidding Challenge.";
      }
      if (t.rank2PreviousMonthChallenge) {
        return t.rank2PreviousMonthChallenge
          .replace("2", matchedWinner.rank.toString())
          .replace("၂", matchedWinner.rank.toString());
      }
      return `You secured Rank ${matchedWinner.rank} in previous Month Bidding Challenge.`;
    } else {
      return t.notInTopRankDescription || "You have not secured top Rank in Previous Month, but you check the other players Rank";
    }
  }, [matchedWinner, t]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="monthly-winner-popup-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90000] flex items-center justify-center bg-black/40 backdrop-blur-[2px] will-change-transform"
          onClick={onClose}
        >
          {matchedWinner && (
            <div className="fixed inset-0 z-[50] overflow-hidden pointer-events-none mix-blend-screen ">
              <img
                src="/assets/images/jackpot.gif"
                className="w-full h-full object-cover"
                alt="Jackpot"
                loading="eager"
              />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative gradient-popup-premium backdrop-blur-md rounded-[2.5rem] max-w-sm w-[85%] p-6 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 overflow-hidden will-change-transform"
          >

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-500 rounded-tl-[2.5rem] pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-yellow-500 rounded-tr-[2.5rem] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-yellow-500 rounded-bl-[2.5rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500 rounded-br-[2.5rem] pointer-events-none" />

            {/* Luminous Ambient Glows */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-pink-500/10 blur-[60px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none animate-pulse" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute z-[50] top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 active:scale-90 border-2 border-pink-900 flex items-center justify-center transition-all"
            >
              <X className="h-5 w-5 text-white/60 hover:text-white" />
            </button>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="w-full text-center relative z-10"
            >
              {/* Trophy Visual */}
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
                  className="relative group"
                >
                  <div className="absolute -inset-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-xl rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />

                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center relative">
                        <img
                          src={matchedWinner ? "/assets/robotavatar/4.png" : "/assets/robotavatar/2.png"}
                          className="w-full h-full object-cover relative z-10"
                          alt="Welcome Robot"
                          loading="lazy"
                        />

                        {/* Sparkles */}
                        {matchedWinner && (
                          <>
                            <motion.div
                              animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                              className="absolute top-4 right-4 z-20"
                            >
                              <Sparkles className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                            <motion.div
                              animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
                              className="absolute bottom-4 left-4 z-20"
                            >
                              <Sparkles className="w-3 h-3 text-pink-400" />
                            </motion.div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-white to-pink-600 bg-clip-text text-transparent leading-tight mb-3">
                {titleText}
              </h2>

              {/* Description */}
              <p className="text-sm text-blue-100 leading-relaxed mb-6 px-2">
                {descriptionText}
              </p>

              {/* Action Button */}
              <div className="w-full">
                <Button
                  className="h-12 w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-900/20 border-t border-white/20 transition-all active:scale-95 text-base"
                  onClick={() => {
                    onClose();
                    navigate("/monthlyWinners");
                  }}
                >
                  {t.checkMonthlyWinners || "Check Monthly Winners"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
