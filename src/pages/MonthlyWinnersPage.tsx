import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Crown,
  ChevronLeft,
  Sparkles,
  Zap,
  Award,
  Gem,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/components/context/LanguageContext";
import { TopBar } from "@/components/TopBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useAppSelector } from "@/app/hooks";

// Masking helper
const maskMSISDN = (phone: string) => {
  if (!phone || phone.length < 12) return phone;
  const trimmed = phone.slice(2);
  if (trimmed.length !== 10) return phone;
  const start = trimmed.slice(0, 3);
  const end = trimmed.slice(-3);
  return `${start}xxxx${end}`;
};

const getAvatarFilename = (userImage: any, userId: any, index: number) => {
  if (userImage) {
    const parsed = parseInt(String(userImage).replace(".png", ""), 10);
    if (!isNaN(parsed) && parsed <= 15 && parsed >= 1) {
      return `${parsed}.png`;
    }
  }
  const avatarIndex = (Number(userId || index) % 15) + 1;
  return `${avatarIndex}.png`;
};

const getMonthlyPrize = (reward: any, rank: number, wonText: string = "Won", lang: string = "en") => {
  if (reward) {
    const parsed = Number(reward);
    const amount = parsed >= 1024 ? `${Math.round(parsed / 1024)} GB` : `${parsed} MB`;
    if (lang === "my") {
      return `${amount} ${wonText}`;
    }
    return `${wonText} ${amount}`;
  }
  return "";
};

// Premium monthly winner mock data (top 10 with ATOM Data prizes)
const MONTHLY_WINNERS = [
  {
    rank: 1,
    phone: "+95 9792049123",
    avatar: "6.png",
    totalBids: 28,
    totalPrizeWon: "5 GB ATOM Data",
    diamondsEarned: 2500,
    winningBidName: "Bid Weekly 1"
  },
  {
    rank: 2,
    phone: "+95 9253459456",
    avatar: "11.png",
    totalBids: 24,
    totalPrizeWon: "5 GB ATOM Data",
    diamondsEarned: 2100,
    winningBidName: "Bid Daily 1"
  },
  {
    rank: 3,
    phone: "+95 9402283789",
    avatar: "9.png",
    totalBids: 22,
    totalPrizeWon: "2 GB ATOM Data",
    diamondsEarned: 1800,
    winningBidName: "Bid Weekly 1"
  },
  {
    rank: 4,
    phone: "+95 9301115882",
    avatar: "4.png",
    totalBids: 19,
    totalPrizeWon: "2 GB ATOM Data",
    diamondsEarned: 1500,
    winningBidName: "Bid Daily 3"
  },
  {
    rank: 5,
    phone: "+95 9682239723",
    avatar: "5.png",
    totalBids: 15,
    totalPrizeWon: "1 GB ATOM Data",
    diamondsEarned: 1200,
    winningBidName: "Bid Daily 1"
  },
  {
    rank: 6,
    phone: "+95 9514890941",
    avatar: "12.png",
    totalBids: 13,
    totalPrizeWon: "1 GB ATOM Data",
    diamondsEarned: 1000,
    winningBidName: "Bid Weekly 2"
  },
  {
    rank: 7,
    phone: "+95 9425513115",
    avatar: "8.png",
    totalBids: 12,
    totalPrizeWon: "1 GB ATOM Data",
    diamondsEarned: 850,
    winningBidName: "Bid Daily 2"
  },
  {
    rank: 8,
    phone: "+95 9260012884",
    avatar: "14.png",
    totalBids: 9,
    totalPrizeWon: "1 GB ATOM Data",
    diamondsEarned: 700,
    winningBidName: "Bid Daily 4"
  },
  {
    rank: 9,
    phone: "+95 9791100922",
    avatar: "3.png",
    totalBids: 7,
    totalPrizeWon: "1 GB ATOM Data",
    diamondsEarned: 600,
    winningBidName: "Bid Daily 1"
  },
  {
    rank: 10,
    phone: "+95 9450091238",
    avatar: "10.png",
    totalBids: 5,
    totalPrizeWon: "1 GB ATOM Data",
    diamondsEarned: 500,
    winningBidName: "Bid Weekly 1"
  }
];

export default function MonthlyWinnersPage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [expandedUser, setExpandedUser] = useState<number | null>(null);

  const { data: homeResponse } = useAppSelector((state) => state.home);
  const lastMonthData = homeResponse?.data?.lastMonthLeaderBoardWinners;
  const currentUserRankVal = lastMonthData?.currentUserRank?.rank ?? homeResponse?.data?.userInfo?.previous_month_rank;

  const winners = useMemo(() => {
    const top10 = lastMonthData?.top10;
    if (!Array.isArray(top10) || top10.length === 0) {
      return MONTHLY_WINNERS;
    }
    return top10.map((item: any, index: number) => ({
      rank: Number(item.user_rank || index + 1),
      phone: item.user_phone,
      avatar: getAvatarFilename(item.user_image, item.user_id, index),
      totalBids: Number(item.user_total_bids || 0),
      totalPrizeWon: getMonthlyPrize(item.user_reward, Number(item.user_rank || index + 1), t.won || "Won", language),
      diamondsEarned: Number(item.user_total_points || 0),
      winningBidName: "Leaderboard Challenge"
    }));
  }, [lastMonthData, t.won, language]);

  const topThree = useMemo(() => winners.slice(0, 3), [winners]);
  const theRest = useMemo(() => winners.slice(3), [winners]);

  const displayedSurrounding = useMemo(() => {
    if (!lastMonthData || !currentUserRankVal || currentUserRankVal <= 10) return [];

    const prev = lastMonthData.previousUserRank;
    const curr = lastMonthData.currentUserRank;
    const aft = lastMonthData.afterUserRank;

    const list: any[] = [];
    if (prev && Number(prev.rank) > 10) {
      list.push({
        rank: Number(prev.rank),
        phone: prev.user_phone,
        avatar: getAvatarFilename(prev.user_image, prev.user_id, 0),
        totalBids: Number(prev.bidsCount || 0),
        totalPrizeWon: getMonthlyPrize(prev.reward, Number(prev.rank), t.won || "Won", language),
        diamondsEarned: Number(prev.points || 0),
        winningBidName: "Leaderboard Challenge"
      });
    }
    if (curr && Number(curr.rank) > 10) {
      list.push({
        rank: Number(curr.rank),
        phone: curr.user_phone,
        avatar: getAvatarFilename(curr.user_image, curr.user_id, 1),
        totalBids: Number(curr.bidsCount || 0),
        totalPrizeWon: getMonthlyPrize(curr.reward, Number(curr.rank), t.won || "Won", language),
        diamondsEarned: Number(curr.points || 0),
        winningBidName: "Leaderboard Challenge"
      });
    }
    if (aft && Number(aft.rank) > 10) {
      list.push({
        rank: Number(aft.rank),
        phone: aft.user_phone,
        avatar: getAvatarFilename(aft.user_image, aft.user_id, 2),
        totalBids: Number(aft.bidsCount || 0),
        totalPrizeWon: getMonthlyPrize(aft.reward, Number(aft.rank), t.won || "Won", language),
        diamondsEarned: Number(aft.points || 0),
        winningBidName: "Leaderboard Challenge"
      });
    }

    return list.sort((a, b) => a.rank - b.rank);
  }, [lastMonthData, currentUserRankVal, t.won, language]);

  return (
    <>
      <TopBar />
      <div className="p-2">
        {/* Header Section - styled exactly like LeaderboardPageNew.tsx */}
        <div className="relative rounded-xl gradient-home-section active:from-purple-700 active:to-rose-700 text-white pt-4 pb-24 px-3 overflow-hidden mb-4">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-xl animate-pulse will-change-[opacity]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-lg will-change-[opacity]" />

          <div className="relative z-10 max-w-md mx-auto">
            {/* Header row with back button and title */}
            <div className="relative flex items-center justify-center gap-2 mb-2">
              <button
                onClick={() => navigate(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-white/95 hover:bg-white rounded-xl backdrop-blur-md transition-all active:scale-95 border border-white/10"
              >
                <ChevronLeft className="w-5 h-5 text-indigo-600" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Trophy
                    className="w-6 h-6 text-yellow-300"
                    fill="currentColor"
                  />
                </div>
                <h1 className="text-xl font-bold text-white">
                  {t.monthlyWinners || "Monthly Winners"}
                </h1>
              </div>
            </div>

            <p className="text-center text-white text-sm font-semibold mb-4">
              {t.topPlayersPreviousMonth || "Top Players of Previous Month"}
            </p>
          </div>
        </div>

        {/* Top 3 Podium - Identical style and wrapper to LeaderboardPageNew.tsx */}
        <div className="relative z-10 -mt-28 px-3 mb-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl pb-0 border border-gray-100">
            <div className="flex items-end justify-center bg-white rounded-2xl">
              {/* 2nd Place */}
              {topThree[1] && <PodiumCard user={topThree[1]} rank={2} />}

              {/* 1st Place */}
              {topThree[0] && (
                <PodiumCard user={topThree[0]} rank={1} isFirst />
              )}

              {/* 3rd Place */}
              {topThree[2] && <PodiumCard user={topThree[2]} rank={3} />}
            </div>
          </div>
        </div>

        {/* Rest of Rankings - Identical layout/collapsible list style to LeaderboardPageNew.tsx */}
        <div className="max-w-md mx-auto px-3">
          <div className="bg-white rounded-2xl shadow-xl p-3 border border-gray-100">
            <div className="space-y-2">
              <AnimatePresence>
                {theRest.map((player, index) => {
                  const isCurrentUser = currentUserRankVal && player.rank === Number(currentUserRankVal);
                  return (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.03, 0.3) }}
                      className="will-change-[transform,opacity]"
                    >
                      <button
                        onClick={() =>
                          setExpandedUser(
                            expandedUser === player.rank ? null : player.rank
                          )
                        }
                        className="w-full text-left"
                      >
                        <div className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all active:scale-[0.98] ${isCurrentUser
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 border-violet-500 text-white shadow-md"
                          : "bg-gradient-to-r from-indigo-100 to-purple-100 active:from-violet-50 active:to-purple-50 border-gray-100"
                          }`}>
                          {/* Rank */}
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isCurrentUser
                            ? "bg-white text-violet-700 font-extrabold"
                            : "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-700 font-bold"
                            }`}>
                            <span className="text-xs">
                              {player.rank}
                            </span>
                          </div>

                          {/* Avatar with orange gradient ring to match monthly look */}
                          <div className="relative flex-shrink-0">
                            <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-0.5">
                              <div className="w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                  src={`/assets/users/${player.avatar}`}
                                  alt={player.phone}
                                  className="w-full h-full"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 text-left min-w-0">
                            <h3 className={`text-sm font-bold leading-tight truncate ${isCurrentUser ? "text-white" : "text-gray-800"}`}>
                              {maskMSISDN(player.phone)} {isCurrentUser && `(${t.yourRank || "Your Rank"})`}
                            </h3>
                            {/* <p className={`text-xs font-semibold mt-0.5 ${isCurrentUser ? "text-white/90" : "text-gray-600"}`}>
                              {player.totalBids} {t.bids || "Bids"}🔥
                            </p> */}
                            {player.totalPrizeWon && (
                              <div className="mt-1">
                                <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${isCurrentUser
                                  ? "text-white bg-white/20 border-white/30"
                                  : "text-amber-600 bg-amber-50 border-amber-200/50"
                                  }`}>
                                  🎁 {player.totalPrizeWon}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Score (Diamonds) */}
                          <div className="text-right me-0.5">
                            <div className={`flex items-center justify-end gap-1 text-base font-bold ${isCurrentUser
                              ? "text-white"
                              : "bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
                              }`}>
                              <div className="relative">
                                <img
                                  src="/assets/images/diamond5.png"
                                  alt="diamond"
                                  className="h-5 object-cover"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                              <span className="text-xs">{player.diamondsEarned.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Separator and Surrounding Ranks for Rank > 10 */}
              {currentUserRankVal && Number(currentUserRankVal) > 10 && (
                <>
                  <div className="flex items-center justify-center my-3 py-1">
                    <span className="text-gray-400 font-extrabold text-lg tracking-widest">. . .</span>
                  </div>
                  {displayedSurrounding.map((player, index) => {
                    const isCurrentUser = currentUserRankVal && player.rank === Number(currentUserRankVal);
                    return (
                      <motion.div
                        key={player.rank}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.03, 0.3) }}
                        className="will-change-[transform,opacity]"
                      >
                        <button
                          onClick={() =>
                            setExpandedUser(
                              expandedUser === player.rank ? null : player.rank
                            )
                          }
                          className="w-full text-left"
                        >
                          <div className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all active:scale-[0.98] ${isCurrentUser
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 border-violet-500 text-white shadow-md"
                            : "bg-gradient-to-r from-indigo-100 to-purple-100 active:from-violet-50 active:to-purple-50 border-gray-100"
                            }`}>
                            {/* Rank */}
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${isCurrentUser
                              ? "bg-white text-violet-700 font-extrabold"
                              : "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-700 font-bold"
                              }`}>
                              <span className="text-xs">
                                {player.rank}
                              </span>
                            </div>

                            {/* Avatar with orange gradient ring to match monthly look */}
                            <div className="relative flex-shrink-0">
                              <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-0.5">
                                <div className="w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center">
                                  <img
                                    src={`/assets/users/${player.avatar}`}
                                    alt={player.phone}
                                    className="w-full h-full"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-left min-w-0">
                              <h3 className={`text-sm font-bold leading-tight truncate ${isCurrentUser ? "text-white" : "text-gray-800"}`}>
                                {maskMSISDN(player.phone)}
                              </h3>
                              {/* <p className={`text-xs font-semibold mt-0.5 ${isCurrentUser ? "text-white/90" : "text-gray-600"}`}>
                                {player.totalBids} {t.bids || "Bids"}🔥
                              </p> */}
                              {player.totalPrizeWon && (
                                <div className="mt-1">
                                  <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${isCurrentUser
                                    ? "text-white bg-white/20 border-white/30"
                                    : "text-amber-600 bg-amber-50 border-amber-200/50"
                                    }`}>
                                    🎁 {player.totalPrizeWon}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Score (Diamonds) */}
                            <div className="text-right me-0.5">
                              <div className={`flex items-center justify-end gap-1 text-base font-bold ${isCurrentUser
                                ? "text-white"
                                : "bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"
                                }`}>
                                <div className="relative">
                                  <img
                                    src="/assets/images/diamond5.png"
                                    alt="diamond"
                                    className="h-5 object-cover"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </div>
                                <span className="text-xs">{player.diamondsEarned.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}

// PodiumCard matches Podium styling of LeaderboardPageNew
type PodiumType = "gold" | "silver" | "bronze";

const PodiumCard = React.memo(({ user, rank, isFirst = false }: any) => {
  const { t } = useLanguage();

  const type: PodiumType =
    rank === 1 ? "gold" : rank === 2 ? "silver" : "bronze";

  const styles = {
    gold: {
      ring: {
        background:
          "linear-gradient(135deg, hsl(45, 85%, 35%), hsl(48, 95%, 75%), hsl(45, 85%, 35%))",
      },
      badge:
        "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-yellow-500/40",
      podium: {
        background:
          "linear-gradient(180deg, hsl(45, 85%, 35%), hsl(48, 95%, 75%), hsl(45, 85%, 35%))",
      },
      glow: "shadow-[0_0_15px_rgba(251,191,36,0.5)]",
      crown: "text-yellow-400",
      text: "text-yellow-600",
    },
    silver: {
      ring: {
        background:
          "linear-gradient(135deg, hsl(0, 0%, 55%), hsl(0, 0%, 90%), hsl(0, 0%, 55%))",
      },
      badge:
        "bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-gray-400/40",
      podium: {
        background:
          "linear-gradient(180deg, hsl(0, 0%, 55%), hsl(0, 0%, 90%), hsl(0, 0%, 55%))",
      },
      glow: "shadow-[0_0_12px_rgba(156,163,175,0.5)]",
      crown: "",
      text: "text-gray-600",
    },
    bronze: {
      ring: {
        background:
          "linear-gradient(135deg, hsl(25, 70%, 35%), hsl(30, 80%, 65%), hsl(25, 70%, 35%))",
      },
      badge:
        "bg-gradient-to-r from-orange-500 to-amber-700 text-white shadow-orange-500/40",
      podium: {
        background:
          "linear-gradient(180deg, hsl(25, 70%, 35%), hsl(30, 80%, 65%), hsl(25, 70%, 35%))",
      },
      glow: "shadow-[0_0_12px_rgba(249,115,22,0.5)]",
      crown: "",
      text: "text-orange-600",
    },
  };

  const current = styles[type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: rank * 0.05, type: "spring", bounce: 0.3, duration: 0.4 }}
      className="flex flex-col items-center flex-1 will-change-[transform,opacity]"
    >
      {/* 👑 Crown */}
      {type === "gold" && (
        <Crown
          className={`w-6 h-6 mb-1.5 animate-bounce ${current.crown}`}
          fill="currentColor"
        />
      )}

      {/* 🧑 Avatar */}
      <div className={`relative mb-2 ${type === "gold" ? "scale-110" : ""}`}>
        <div
          style={current.ring}
          className={`w-14 h-14 rounded-xl p-[2px] ${current.glow}`}
        >
          <div className="w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={`/assets/users/${user.avatar}`}
              alt={user.phone}
              className="w-full h-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Rank Badge */}
        <div
          className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border-2 border-white ${current.badge} text-xs`}
        >
          {rank}
        </div>
      </div>

      {/* 🧾 Info */}
      <div className="text-center px-1 flex flex-col items-center mb-0.5 text-xs">
        <p className="font-bold text-gray-800 truncate max-w-[80px]">
          {maskMSISDN(user.phone).split(" ")[0]}
        </p>

        {/* 💎 Score */}
        <div className="font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center">
          <div className="relative ">
            <img
              src="/assets/images/diamond5.png"
              alt="diamond"
              className="h-5 object-cover me-1"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span>{user.diamondsEarned.toLocaleString()}</span>
        </div>

        {/* Prize Tag */}
        {user.totalPrizeWon && (
          <p className={`font-bold text-[10px] leading-tight px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200/50 ${current.text} mt-0.5 mb-0.5`}>
            🎁 {user.totalPrizeWon}
          </p>
        )}

        {/* <p className={`font-bold ${current.text}`}>
          {user.totalBids.toLocaleString()} {t.bids || "Bids"}
        </p> */}
      </div>

      {/* 🏆 Podium - Hardware accelerated height animation */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2 + rank * 0.05, duration: 0.5, ease: "easeOut" }}
        style={{
          ...current.podium,
          height: type === "gold" ? 110 : type === "silver" ? 80 : 60,
          transformOrigin: "bottom"
        }}
        className="w-full rounded-t-[1.5rem] border border-white/30 shadow-inner relative overflow-hidden will-change-transform"
      >
        {/* ✨ subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-10" />
      </motion.div>
    </motion.div>
  );
});
PodiumCard.displayName = "PodiumCard";

const StatCard = React.memo(({ icon, label, value }: any) => {
  return (
    <div className="bg-white rounded-lg p-2 text-center">
      <div className="flex justify-center text-violet-600 mb-0.5">{icon}</div>
      <p className="text-[9px] text-gray-500 font-medium uppercase">{label}</p>
      <p className="text-xs font-bold text-gray-800">{value}</p>
    </div>
  );
});
StatCard.displayName = "StatCard";

