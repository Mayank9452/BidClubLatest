import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchDashboardData } from "@/features/dashboard/dashboardSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
  claimSummerReward,
  resetSummerReward,
} from "@/features/summerReward/summerRewardSlice";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./context/LanguageContext";
import { fetchHomeData } from "@/features/home/homeSlice";

interface PopupSummerRewardProps {
  isShow: boolean;
  onClose: () => void;
  participantId: number;
}

// Card Data - 5GB is fixed to the middle (index 1) at the start
const INITIAL_CARDS = [
  {
    id: "c1",
    val: "1GB DATA",
    img: "/assets/images/sr_popup_3.jpg",
  },
  {
    id: "c2",
    val: "5GB DATA",
    img: "/assets/images/sr_popup_3.jpg",
  },
  {
    id: "c3",
    val: "500MB DATA",
    img: "/assets/images/sr_popup_3.jpg",
  },
];

const CARD_FRONT_URL = "/assets/images/sr_popup_4.jpg";

const PopupSummerRewardUpdated = ({
  isShow,
  onClose,
  participantId,
}: PopupSummerRewardProps) => {
  // console.log("participantId", participantId);
  const { t, language } = useLanguage();
  const [gameState, setGameState] = useState("init"); // init, revealing, hiding, shuffling, ready, won
  const [cardOrder, setCardOrder] = useState([0, 1, 2]); // Tracks visual slot for each card ID
  const [pickedId, setPickedId] = useState(null);
  const dispatch = useAppDispatch();

  const { reward, status, error } = useAppSelector(
    (state) => state.summerReward,
  );
  const { data: response } = useAppSelector((state) => state.home);
  // const dashboard = useAppSelector((state) => state?.dashboard);
  const latestWin = response?.data?.latestWinForSummerCampaign || [];
  const canvasRef = useRef(null);
  const particles = useRef([]);

  const tickerText =
    latestWin.length > 0
      ? latestWin
        .map((item) =>
          language === "my"
            ? `အသုံးပြုသူ ${item.participant_msisdn} အနိုင်ရသည် ${item.participant_reward_value} Data!`
            : `User ${item.participant_msisdn} won ${item.participant_reward_value} Data!`,
        )
        .join(" \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ")
      : "";

  // Animation Sequence
  useEffect(() => {
    if (isShow) {
      const startSequence = async () => {
        // 1. Initial Entry
        setGameState("init");
        await new Promise((r) => setTimeout(r, 1000));

        // 2. REVEAL MIDDLE (Index 1 is the 5GB card)
        setGameState("revealing");
        await new Promise((r) => setTimeout(r, 3000));

        // 3. HIDE
        setGameState("hiding");
        await new Promise((r) => setTimeout(r, 800));

        // 4. SHUFFLE
        await runShuffle();
      };
      startSequence();
    }
  }, [isShow]);

  useEffect(() => {
    if (isShow) {
      dispatch(resetSummerReward());
      setPickedId(null);
    }
  }, [isShow, dispatch]);

  useEffect(() => {
    if (status === "success" && reward) {
      setGameState("won");

      dispatch(fetchHomeData() as any);

      setTimeout(() => {
        triggerConfetti();
      }, 600);

      setTimeout(() => {
        handleClose();
      }, 5000);
    }

    if (status === "failed") {
      setGameState("won");
      setTimeout(() => {
        handleClose();
      }, 5000);
    }
  }, [status, reward]);

  const runShuffle = async () => {
    setGameState("shuffling");
    let currentOrder = [0, 1, 2];

    for (let i = 0; i < 18; i++) {
      let idx1 = Math.floor(Math.random() * 3);
      let idx2 = Math.floor(Math.random() * 3);
      while (idx1 === idx2) idx2 = Math.floor(Math.random() * 3);

      // Swap slots
      [currentOrder[idx1], currentOrder[idx2]] = [
        currentOrder[idx2],
        currentOrder[idx1],
      ];
      setCardOrder([...currentOrder]);

      await new Promise((r) => setTimeout(r, 130));
    }
    setGameState("ready");
  };

  // const handlePick = (id) => {
  //   if (gameState !== 'ready') return;
  //   setPickedId(id);
  //   setGameState('won');
  //   triggerConfetti();
  // };

  const handlePick = (id) => {
    if (gameState !== "ready" || pickedId !== null) return;

    setPickedId(id);

    if (participantId) {
      // console.log("participantId", participantId);
      dispatch(claimSummerReward(participantId));
    }
  };

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ["#FFD700", "#00B4D8", "#FF4D6D", "#FFFFFF", "#FB8500"];
    particles.current = Array.from({ length: 120 }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15 - 5,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }));

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= 0.01;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.life <= 0) particles.current.splice(i, 1);
      });
      if (particles.current.length > 0) requestAnimationFrame(update);
    };
    update();
  };

  const handleClose = () => {
    dispatch(resetSummerReward());
    onClose();
  };

  return (
    <AnimatePresence>
      {isShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm z-[1000] p-4 overflow-hidden"
        >
          <style>{`
        
        
        .game-card {
          
          background: linear-gradient(165deg, #00b4d8 0%, #03045e 100%);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.1);
        }

        .mystery-container {
          perspective: 1000px;
          height: 140px;
          width: 90px;
          position: absolute;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mystery-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }

        .mystery-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          border: 3px solid white;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .face-back {
          background: linear-gradient(135deg, #fff, #ffea00);
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }

        .is-flipped { transform: rotateY(180deg); }
        .is-won { transform: rotateY(180deg) scale(1.3) translateY(-10px); z-index: 50; }

        .bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          bottom: -20px;
          animation: rise 8s infinite linear;
          pointer-events: none;
        }
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translateY(-500px) scale(2); opacity: 0; }
        }

        .ticker-anim {
          display: inline-block;
          white-space: nowrap;
          left: 100%;
          animation: ticker 25s linear infinite;
        }
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(calc(-100% - 300px), 0, 0); }
        }
      `}</style>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`game-card relative w-full max-w-[340px] h-[520px] rounded-[50px] border-4 border-white/40 flex flex-col overflow-hidden transition-all duration-700 ${gameState === "won" ? "border-[#ffea00]" : ""}`}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-[100]"
            />

            {/* Decorative Palms (Inline SVG) */}
            <div className="absolute -top-4 -left-6 opacity-20 text-white transform rotate-45 pointer-events-none">
              <svg
                width="140"
                height="140"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4l1-1 1 1h2Z" />
                <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-2l-1-1-1 1h-4l-1-1-1 1h-2" />
                <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43s5.28 1.8 7.43-.35l-1.41-1.41c-1.37 1.37-3.48 1.5-4.61.37s-1-3.24.37-4.61L5.89 9.71Z" />
                <path d="m11 15.5 5.5 5.5" />
                <path d="m17 11.5 5.5 5.5" />
                <path d="m14 14.5 5.5 5.5" />
              </svg>
            </div>
            <div className="absolute -top-4 -right-6 opacity-20 text-white transform -rotate-45 pointer-events-none">
              <svg
                width="140"
                height="140"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4l1-1 1 1h2Z" />
                <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-2l-1-1-1 1h-4l-1-1-1 1h-2" />
                <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43s5.28 1.8 7.43-.35l-1.41-1.41c-1.37 1.37-3.48 1.5-4.61.37s-1-3.24.37-4.61L5.89 9.71Z" />
                <path d="m11 15.5 5.5 5.5" />
                <path d="m17 11.5 5.5 5.5" />
                <path d="m14 14.5 5.5 5.5" />
              </svg>
            </div>

            {/* Bubbles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bubble"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${10 + Math.random() * 15}px`,
                  height: `${10 + Math.random() * 15}px`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-[200]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Header */}
            <div
              className={`px-8 pt-12 text-center transition-all duration-500 ${gameState === "won" ? "opacity-0 -translate-y-10" : "opacity-100"}`}
            >
              <p className="text-[#ffea00] font-black tracking-[5px] uppercase mb-1">
                {language === "my" ? "Summer Rush 2026" : "Summer Rush 2026"}
              </p>
              <h1 className="italic text-white text-4xl drop-shadow-lg">
                {language === "my" ? "Mystery Card" : "Mystery Card"}
              </h1>
            </div>

            {/* Victory Header */}
            {gameState === "won" && (
              <div className="absolute inset-x-0 top-20 text-center animate-bounce z-[150]">
                <h2 className="font-['Pacifico'] text-[#ffea00] text-4xl drop-shadow-md">
                  {language === "my" ? "ကံကောင်းတယ်!" : "Lucky Splash!"}
                </h2>
              </div>
            )}

            {/* Card Pool */}
            <div className="flex-1 relative flex items-center justify-center">
              <div className="relative w-full h-[200px] flex items-center justify-center">
                {INITIAL_CARDS.map((card, idx) => {
                  const currentSlot = cardOrder[idx];
                  const isWon = pickedId === card.id;
                  const isDimmed = pickedId && !isWon;

                  // Only flip card with index 1 (5GB) during reveal
                  const isRevealing = gameState === "revealing" && idx === 1;

                  // Position Logic
                  // Slots: 0 (Left), 1 (Middle), 2 (Right)
                  const xPos = (currentSlot - 1) * 105;

                  return (
                    <div
                      key={card.id}
                      onClick={() => handlePick(card.id)}
                      className={`mystery-container ${isDimmed ? "opacity-0 scale-50" : "opacity-100"}`}
                      style={{
                        transform: isWon
                          ? "translateX(0)"
                          : `translateX(${xPos}px)`,
                        zIndex: isWon || isRevealing ? 50 : 10,
                      }}
                    >
                      <div
                        className={`mystery-inner ${isRevealing || isWon ? "is-flipped" : ""}`}
                      >
                        {/* FRONT */}
                        <div className="mystery-face bg-sky-400">
                          <img
                            src={CARD_FRONT_URL}
                            className="w-full h-full object-cover brightness-110"
                            alt="Surf"
                          />
                        </div>
                        {/* BACK */}
                        <div className="mystery-face face-back">
                          <img
                            src={card.img}
                            className="w-12 h-12 rounded-full border-2 border-[#03045e] mb-2 bg-white object-cover"
                            alt="Reward"
                          />
                          <span className="text-[#03045e] font-black text-[11px] uppercase tracking-tighter text-center">
                            {/* {card.val} */}
                            {gameState === "revealing" && idx === 1
                              ? card.val
                              : pickedId === card.id
                                ? reward
                                  ? `${reward} DATA`
                                  : ""
                                : ""}
                          </span>
                          <div className="mt-1 text-[#03045e]">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="m12 3-1.912 5.813L4.275 9l4.7 4.087L7.063 19 12 15.187 16.938 19l-1.913-5.913 4.7-4.087-5.812-.187L12 3Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Area */}
            <div className="p-10 pt-0 text-center relative z-20">
              {gameState === "won" ? (
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {status === "failed"
                      ? language === "my"
                        ? "အမှားတစ်ခုဖြစ်ပွားခဲ့သည်"
                        : "CLAIM FAILED:"
                      : language === "my"
                        ? "နွေရာသီဆု ရရှိပြီ"
                        : "SUMMER PRIZE UNLOCKED:"}
                  </p>
                  <h3 className={`text-white font-black mb-6 drop-shadow-lg tracking-tight ${status === "failed" ? "text-base" : "text-4xl"}`}>
                    {/* {INITIAL_CARDS.find((c) => c.id === pickedId)?.val} */}
                    {status === "failed"
                      ? error ?? "Something went wrong"
                      : status === "loading"
                        ? language === "my"
                          ? "Loading လုပ်နေတယ်..."
                          : "Loading..."
                        : reward
                          ? `${reward} DATA`
                          : INITIAL_CARDS.find((c) => c.id === pickedId)?.val}
                  </h3>
                  <button
                    onClick={handleClose}
                    className="w-full py-4 bg-gradient-to-b from-[#ffea00] to-[#fb8500] text-[#03045e] font-black rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all text-xs tracking-widest uppercase"
                  >
                    {status === "failed"
                      ? language === "my" ? "ပိတ်ပါ" : "CLOSE"
                      : language === "my" ? "ဆုရယူပါ" : "CATCH REWARD"}
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="inline-block px-5 py-2 bg-white/10 border border-white/30 rounded-full text-white text-[10px] font-black uppercase tracking-[2px]">
                    {gameState === "revealing" &&
                      (language === "my"
                        ? "အလယ်ဆုကို ကြည့်ပါ!"
                        : "WATCH THE CENTER PRIZE!")}

                    {gameState === "hiding" &&
                      (language === "my"
                        ? "ဆုများ ဝှက်နေသည်..."
                        : "HIDING REWARDS...")}

                    {gameState === "shuffling" &&
                      (language === "my" ? "ရောနှောနေသည်!" : "SHUFFLING!")}

                    {gameState === "ready" &&
                      (language === "my" ? "ကဒ်တစ်ခု ရွေးပါ!" : "PICK A CARD!")}

                    {gameState === "init" &&
                      (language === "my"
                        ? "နွေရာသီ Loading လုပ်နေတယ်"
                        : "LOADING SUMMER...")}
                  </div>

                  {latestWin.length > 0 && (
                    <div className="bg-black/30 rounded-full p-2 border border-white/10 overflow-hidden relative h-6">
                      <div
                        className="ticker-anim text-[9px] text-white/60 font-bold italic absolute whitespace-nowrap"
                        style={{
                          animationDuration: `${latestWin.length * 6}s`,
                        }}
                      >
                        {tickerText}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupSummerRewardUpdated;
