import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  Users,
  Zap,
  TrendingUp,
  Target,
  Gem,
  Award,
  DollarSign,
  Trophy,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchBidInfo } from "@/features/bid/bidSlice";
import MyanmarClock from "./MynammarClock";
import { motion } from "framer-motion";
import TimeSliceClock from "./TimeSliceClock";
import WeeklyProgressClock from "./WeeklyRandomClock";
import WeeklyRandomClock from "./WeeklyRandomClock";

// ── Your original color sets (no new colors added) ───────────────────────────
const themes = [
  {
    gradient: "gradient-violet-indigo",
    border: "border-violet-200",
    shadow: "shadow-violet-100",
    tint: "bg-violet-50",
    accentText: "text-violet-700",
    btnFrom: "from-violet-600",
    btnTo: "to-indigo-600",
  },
  {
    gradient: "gradient-fuchsia-pink",
    border: "border-fuchsia-200",
    shadow: "shadow-fuchsia-100",
    tint: "bg-fuchsia-50",
    accentText: "text-fuchsia-700",
    btnFrom: "from-fuchsia-600",
    btnTo: "to-pink-600",
  },
  {
    gradient: "gradient-cyan-blue",
    border: "border-cyan-200",
    shadow: "shadow-cyan-100",
    tint: "bg-cyan-50",
    accentText: "text-cyan-700",
    btnFrom: "from-cyan-500",
    btnTo: "to-blue-600",
  },
  {
    gradient: "gradient-emerald-teal",
    border: "border-emerald-200",
    shadow: "shadow-emerald-100",
    tint: "bg-emerald-50",
    accentText: "text-emerald-700",
    btnFrom: "from-emerald-500",
    btnTo: "to-teal-600",
  },

];

const weeklyThemes = [
  {
    gradient: "gradient-orange-red",
    border: "border-orange-200",
    shadow: "shadow-orange-100",
    tint: "bg-orange-50",
    accentText: "text-orange-700",
    btnFrom: "from-orange-500",
    btnTo: "to-red-600",
  },
  {
    gradient: "gradient-rose-purple", // 🎯 vibrant premium
    border: "border-rose-300",
    shadow: "shadow-rose-200",
    tint: "bg-rose-50",
    accentText: "text-rose-700",
    btnFrom: "from-rose-500",
    btnTo: "to-purple-600",
  }

]

const bidIcons = [Target, Gem, Award, TrendingUp, DollarSign, Zap];

// ── Helpers ──────────────────────────────────────────────────────────────────
const getMMTTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 6.5 * 60 * 60 * 1000);
};

const formatPrize = (val: number) =>
  val >= 1024 ? `${val / 1024} GB` : `${val} MB`;

const getTimeLeft = (endTime: string) => {
  const now = getMMTTime().getTime();
  const diff = new Date(endTime).getTime() - now;
  if (diff <= 0) return "00 : 00 : 00 : 00";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(d).padStart(2, "0")} : ${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
};

// ── BidCard ──────────────────────────────────────────────────────────────────
const BidCard = React.memo(({ bid, index, activeTab }: { bid: any; index: number; activeTab: string }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const dispatch = useAppDispatch();

  const theme = activeTab === "Weekly" ? weeklyThemes[index % weeklyThemes.length] : themes[index % themes.length];
  const BidIcon = bidIcons[index % bidIcons.length];
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(bid.endTime));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(bid.endTime)), 1000);
    return () => clearInterval(id);
  }, [bid.endTime]);

  return (
    <div
      // className={`
      //   relative w-full rounded-[20px] overflow-hidden bg-white
      //   border-2 ${theme.border} shadow-lg ${theme.shadow}
      //   cursor-pointer transition-all duration-200
      //   hover:-translate-y-1 hover:shadow-xl active:scale-[0.97]
      // `}
      className={`
        relative w-full rounded-[20px] overflow-hidden bg-white
        border-2 ${theme.border} 
        cursor-pointer transition-all duration-200
        hover:-translate-y-1 hover:shadow-xl active:scale-[0.97]
      `}
      onClick={async () => {
        const encodedBidId = btoa(String(bid.id));
        sessionStorage.setItem("bidId", encodedBidId);
        // await dispatch(fetchBidInfo(bid.id)).unwrap();
        navigate(`/biddingPage`);
      }}
    >
      {/* ── Banner ── */}
      <div
        className={`relative h-24 ${theme.gradient} flex flex-col items-center justify-center gap-1.5 overflow-hidden`}
      >
        {/* diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff,#fff 1px,transparent 1px,transparent 10px)",
          }}
        />

        {/* cycle badge top-right */}
        {/* <span className="absolute top-2 right-2 z-10 bg-white/20 border border-white/40 rounded-lg px-2 py-0.5 text-[9px] font-bold text-white tracking-widest uppercase">
          Cycle {bid.activeCycle}
        </span> */}

        {/* icon ring */}
        <div className="relative z-10 w-9 h-9 rounded-xl bg-white/20 border-2 border-white/50 flex items-center justify-center">
          {/* <BidIcon className="w-5 h-5 text-white" strokeWidth={2.5} /> */}
          {/* <MyanmarClock /> */}
          {/* <TimeSliceClock index={index % 4} /> */}
          {bid.name.includes("Daily") ? (
            <WeeklyRandomClock seed={index} />
          ) : (
            <WeeklyRandomClock seed={index} />
          )}
        </div>

        {/* bid name */}
        <p className="relative z-10 text-[12px] font-bold text-white tracking-[1px] text-center px-3 truncate max-w-full">
          {bid.name}
        </p>

        {/* prize strip */}
        <div className="relative z-10  rounded-lg px-3 flex items-center gap-1.5 ">
          <Trophy className="w-3 h-3 text-white/90" strokeWidth={2.5} />
          <span className="text-[10px] font-bold text-white uppercase tracking-[1px]">
            {t.winAmount} {formatPrize(Number(bid.prize))} {t.atomData}
          </span>
        </div>

        {/* bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${theme.gradient} opacity-90`}
        />
      </div>

      {/* ── Body ── */}
      <div className={`${theme.tint} p-2 flex flex-col gap-1.5`}>
        {/* Timer */}
        <div
          className={`bg-white  border-2 ${theme.border} rounded-xl px-3 py-1.5 flex flex-col gap-0.5`}
        >
          <div className="flex items-center gap-1">
            <Clock
              className={`w-3 h-3 ${theme.accentText}`}
              strokeWidth={2.5}
            />
            <span
              className={`text-[9px] font-bold uppercase tracking-widest ${theme.accentText}`}
            >
              {t.endsIn}
            </span>
          </div>
          <div className="flex flex-col items-center">
            {/* Time Values with colons */}
            <div className="flex items-center justify-center text-[11px] font-bold text-red-500 tracking-[1px] tabular-nums animate-pulse">
              {timeLeft.split(" : ").map((t: string, i: number) => (
                <div key={i} className="flex items-center">
                  <span className="w-[26px] text-center">{t}</span>
                  {i !== 3 && <span className="mx-[2px]">:</span>}
                </div>
              ))}
            </div>

            {/* Labels aligned under numbers */}
            <div className="flex justify-center text-[10px] text-gray-400 font-semibold tracking-widest mt-[2px]">
              {[t.daysShort, t.hoursShort, t.minutesShort, t.secondsShort].map((label, i) => (
                <div key={i} className="flex items-center">
                  <span className="w-[26px] text-center">{label}</span>
                  {i !== 3 && <span className="mx-[2px] opacity-0">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1.5">
          <div
            className={`bg-white border-2 ${theme.border} rounded-xl p-1.5 flex flex-col items-center gap-0.5`}
          >
            <Users
              className={`w-3.5 h-3.5 ${theme.accentText}`}
              strokeWidth={2.5}
            />
            <span
              className={`text-[8px] font-bold uppercase tracking-widest ${theme.accentText}`}
            >
              {t.players}
            </span>
            <span className="text-sm font-bold text-slate-800">
              {bid.currentBid}
            </span>
          </div>
          <div
            className={`bg-white border-2 ${theme.border} rounded-xl p-1.5 flex flex-col items-center gap-0.5`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${theme.accentText} animate-spin`} />
            <span
              className={`text-[8px] font-bold uppercase tracking-widest text-center ${theme.accentText}`}
            >
              {t.cycle}
            </span>
            <span className="text-sm font-bold text-slate-800">
              {bid.activeCycle}
            </span>
          </div>
        </div>

        {/* CTA button */}
        <button
          // className={`
          //   w-full py-2 rounded-xl
          //   bg-gradient-to-r ${theme.btnFrom} ${theme.btnTo}
          //   text-white text-[11px] font-bold tracking-[2px] uppercase
          //   flex items-center justify-center gap-1.5
          //   transition-all duration-150 hover:opacity-90 active:scale-[0.97]

          // `}
          className="bg-gradient-to-r from-pink-500 to-rose-500 active:from-pink-600 active:to-rose-600 text-white font-bold py-2 rounded-xl text-sm tracking-[1px] transition-colors duration-150 shadow-md active:shadow-lg flex items-center justify-center gap-2"
        >
          <Target className="w-3.5 h-3.5" />
          {bid.joinedStatus ? t.reBid : t.enterBid}
        </button>
      </div>
    </div>
  );
});

// ── BidCardDemo ──────────────────────────────────────────────────────────────
export default function BidCardDemo() {
  const { data: response } = useAppSelector((state) => state.home);
  const liveBids = response?.data?.liveBids || [];
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<"Daily" | "Weekly">("Daily");
  const scrollRef = useRef(null);

  const formattedBids = useMemo(() => {
    return liveBids.map((item: any) => {
      const rawName = item.bid_name.replace(/\+/g, " ");
      let translatedName = rawName;

      if (rawName.toLowerCase().includes("daily")) {
        const number = rawName.match(/\d+/);
        translatedName = `${t.dailyBid}${number ? " " + number[0] : ""}`;
      } else if (rawName.toLowerCase().includes("weekly")) {
        const number = rawName.match(/\d+/);
        translatedName = `${t.weeklyBid}${number ? " " + number[0] : ""}`;
      }

      return {
        id: item.bid_id,
        name: translatedName,
        prize: item.bid_prize_1,
        endTime: item.bid_end_timestamp,
        activeCycle: item.bid_active_cycle,
        currentBid: item.total_bids_count,
        joinedStatus: item.joinedStatus,
      };
    });
  }, [liveBids, t]);

  const DailyBids = useMemo(() =>
    formattedBids.filter((bid) =>
      bid.name.toLowerCase().includes(t.dailyBid.toLowerCase()) ||
      bid.name.toLowerCase().includes("daily")
    ), [formattedBids, t.dailyBid]);

  const WeeklyBids = useMemo(() =>
    formattedBids.filter((bid) =>
      bid.name.toLowerCase().includes(t.weeklyBid.toLowerCase()) ||
      bid.name.toLowerCase().includes("weekly")
    ), [formattedBids, t.weeklyBid]);

  const displayedBids = useMemo(() =>
    activeTab === "Daily" ? DailyBids : WeeklyBids
    , [activeTab, DailyBids, WeeklyBids]);

  const isSingle = displayedBids.length === 1;
  const isOdd = displayedBids.length > 1 && displayedBids.length % 2 !== 0;
  const isEven = displayedBids.length > 1 && displayedBids.length % 2 === 0;

  return (
    <div className="rounded-2xl">
      {/* Tab Switcher */}
      <div className="flex bg-white/30 backdrop-blur-md p-1 rounded-xl shadow-xl mx-5 mb-5">
        {["Daily", "Weekly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`relative flex-1 px-3 py-2 text-[11px] font-bold capitalize transition-all duration-200 rounded-lg text-white`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 active:from-pink-600 active:to-rose-600 text-white rounded-xl shadow-md"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.5,
                }}
              />
            )}
            <span className="relative z-10 text-white font-bold tracking-[1px] text-[12px]">
              {tab === "Daily" ? t.daily : t.weekly}
            </span>
          </button>
        ))}
      </div>

      {/* Single card */}
      {isSingle && (
        <div className="w-[95%] mx-auto">
          <BidCard bid={displayedBids[0]} index={0} activeTab={activeTab} />
        </div>
      )}

      {/* Multiple cards — scrollable drag
          FIX 1: (isOdd || isEven) instead of isOdd || (isEven && ...)
          FIX 2: key={activeTab} resets drag position on every tab switch       */}
      {(isOdd || isEven) && (
        <div ref={scrollRef} className="overflow-hidden">
          <motion.div
            key={activeTab}
            className="flex gap-3 cursor-grab active:cursor-grabbing pb-4 w-max"
            drag="x"
            dragConstraints={scrollRef}
            dragElastic={0.05}
            whileTap={{ cursor: "grabbing" }}
          >
            {displayedBids.map((bid: any, index: number) => (
              <div key={bid.id} className="w-[225px] sm:w-[280px]">
                <BidCard bid={bid} index={index} activeTab={activeTab} />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
