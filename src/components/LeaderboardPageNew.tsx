import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Crown,
  TrendingUp,
  Zap,
  Star,
  Award,
} from "lucide-react";
import { BottomNavBar } from "./BottomNavBar";
import { TopBar } from "./TopBar";
import { useLanguage } from "./context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  fetchLeaderboard,
  resetLeaderboard,
} from "@/features/leaderboard/leaderboardSlice";

const maskPhone = (phone: string) => {
  if (!phone) return "";

  // remove first 2 digits
  const trimmed = phone.slice(2); // 10 digits left

  const first3 = trimmed.slice(0, 3);
  const last3 = trimmed.slice(-3);

  return `${first3}xxxx${last3}`;
};



const getTierColor = (tier: string) => {
  const colors = {
    diamond: "gradient-diamond",
    platinum: "gradient-platinum",
    gold: "gradient-gold-tier",
    silver: "gradient-silver-tier",
    bronze: "gradient-bronze-tier",
  };
  return colors[tier as keyof typeof colors] || colors.bronze;
};

const getTierBadge = (tier: string) => {
  const badges = {
    diamond: "💎",
    platinum: "⚪",
    gold: "🥇",
    silver: "🥈",
    bronze: "🥉",
  };
  return badges[tier as keyof typeof badges] || "🏅";
};



export default function LeaderboardPageNew() {
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState({
    tab: "weekly",
    pageNo: 1,
  });

  const { list, status, hasMore } = useAppSelector(
    (state) => state.leaderboard,
  );

  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const { t } = useLanguage();

  // const topThree = MOCK_USERS.slice(0, 3);
  // const theRest = MOCK_USERS.slice(3);

  useEffect(() => {
    dispatch(fetchLeaderboard(filters));
  }, [filters]);

  const handleTabChange = (tab: "weekly" | "monthly") => () => {
    setActiveTab(tab);
    setExpandedUser(null);

    dispatch(resetLeaderboard());

    setFilters({
      tab,
      pageNo: 1,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const threshold = window.innerWidth < 650 ? 200 : 50;

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        if (status !== "loading" && hasMore) {
          setFilters((prev) => ({
            ...prev,
            pageNo: prev.pageNo + 1,
          }));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status, hasMore]);

  const formatUsers = useCallback((users: any[] = []) => {
    return users.map((user: any) => {
      // Deterministic avatar index based on user_id
      const avatarIndex = (Number(user.user_id) % 15) + 1;

      return {
        id: user.user_id,
        name: maskPhone(user.user_phone),
        score: Number(user.points || 0),
        bids: user.bidsCount || 0,
        avatar: `${avatarIndex}.png`,
        tier: "bronze",
        streak: (Number(user.user_id) % 10) + 1, // stable streak
      };
    });
  }, []);

  const users = useMemo(() => formatUsers(list), [list, formatUsers]);

  const topThree = useMemo(() => users.slice(0, 3), [users]);
  const theRest = useMemo(() => users.slice(3), [users]);

  return (
    <>
      <TopBar />
      <div className="p-2 min-h-screen bg-premium-soft pb-16">

        {/* Header Section - Compact for mobile */}
        <div className="relative rounded-xl gradient-home-section active:from-purple-700 active:to-rose-700 text-white pt-4 pb-24 px-3 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />

          <div className="relative z-10 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Trophy
                  className="w-6 h-6 text-yellow-300"
                  fill="currentColor"
                />
              </div>
              <h1 className="text-xl font-bold text-white tracking-[1px]">
                {t.leaderboard}
              </h1>
            </div>

            <p className="text-center text-white text-xs font-semibold tracking-[1px] mb-4">
              {t.leaderboardDesc}
            </p>

            {/* Tab Switcher - Touch optimized */}
            <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-xl">
              {["weekly", "monthly"].map((tab) => (
                <button
                  key={tab}
                  onClick={handleTabChange(tab as any)}
                  className={`relative flex-1 px-3 py-2 text-[11px] font-bold capitalize transition-all duration-200 rounded-xl ${activeTab === tab ? "text-violet-700" : "text-white/70"
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-xl shadow-md"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10 tracking-[1px] text-xs font-bold">
                    {tab === "allTime" ? t.allTime : t[tab]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium - Compact for mobile */}
        <div className="relative z-10 -mt-20 px-3 mb-4">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-1 pb-0 border border-gray-100">
            <div className="flex items-end justify-center gap-2  bg-white rounded-2xl">
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

        {/* Rest of Rankings - Mobile optimized */}
        <div className="max-w-md mx-auto px-3">
          <div className="bg-white rounded-2xl shadow-lg p-3 border border-gray-100 ">
            <h2 className="text-base font-bold text-gray-800 mb-3 text-center">
              {t.topPlayers}
            </h2>

            <div className="space-y-2">
              <AnimatePresence>
                {theRest.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <button
                      // onClick={() =>
                      //   setExpandedUser(
                      //     expandedUser === user.id ? null : user.id,
                      //   )
                      // }
                      className="w-full"
                    >
                      <div className="flex items-center gap-2.5 p-2.5 bg-gradient-to-r from-indigo-100 to-purple-100 active:from-violet-50 active:to-purple-50 rounded-xl border border-gray-100 transition-all active:scale-[0.98]">
                        {/* Rank */}
                        <div className="w-7 h-7 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-gray-700">
                            {index + 4}
                          </span>
                        </div>

                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-11 h-11 ${getTierColor(user.tier)} rounded-lg p-0.5`}
                          >
                            <div className="w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center">
                              <img
                                src={`/assets/users/${user.avatar}`}
                                alt={user.name}
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 text-xs">
                            {getTierBadge(user.tier)}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-left min-w-0">
                          <h3 className="text-sm font-bold text-gray-800 leading-tight truncate">
                            {user.name}
                          </h3>
                          <p className="text-[10px] text-gray-500 font-semibold tracking-[1px]">
                            {user.bids} {t.bids}🔥
                          </p>
                        </div>

                        {/* Score */}
                        <div className="text-right ">
                          <div className="flex items-center justify-end gap-1 text-[15px] font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            <div className="relative">
                              <img
                                src="/assets/images/diamond3.png"
                                alt="diamond"
                                className="h-6 w-6 object-cover"
                              />

                              {/* premium shimmer */}
                              {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent 
                                animate-[shimmer_2s_linear_infinite] opacity-50 rotate-[25deg] pointer-events-none rounded-full" /> */}
                            </div>
                            <span className="text-[13px]">{user.score.toLocaleString()}</span>
                          </div>
                          {/* <div className="flex items-center justify-end gap-0.5 text-[10px] text-emerald-600 font-bold">
                          <TrendingUp className="w-2.5 h-2.5" />
                          <span>+5%</span>
                        </div> */}
                        </div>

                        {/* Expand Icon */}
                        {/* <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${expandedUser === user.id ? 'rotate-180' : ''}`} /> */}
                      </div>
                    </button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedUser === user.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 py-2.5 bg-gradient-to-r from-violet-50 to-purple-50 rounded-b-xl border-x border-b border-gray-100 -mt-2 pt-3">
                            <div className="grid grid-cols-2 gap-2 mx-auto">
                              <StatCard
                                icon={<Star className="w-3.5 h-3.5" />}
                                label="Wins"
                                value="28"
                              />
                              <StatCard
                                icon={<Zap className="w-3.5 h-3.5" />}
                                label="Win Rate"
                                value="64%"
                              />
                              {/* <StatCard icon={<Award className="w-3.5 h-3.5" />} label="Tier" value={user.tier.slice(0, 4)} /> */}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* ✅ ADD HERE */}
              {status === "loading" && (
                <p className="text-center text-sm text-gray-500 py-3">
                  Loading more...
                </p>
              )}

              {users.length === 0 && status === "success" && (
                <p className="text-center text-gray-400 py-5">
                  No leaderboard data
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Your Rank Card - Sticky bottom */}
        <div className="fixed bottom-20 left-0 right-0 px-3 z-10">
          <div className="max-w-md mx-auto gradient-home-section active:from-purple-700 active:to-rose-700 text-white rounded-xl p-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <span className="text-base font-bold text-white/80 tracking-[1px]">
                    #47
                  </span>
                </div>
                <div>
                  <p className="text-white/80 text-[10px] tracking-[1px] font-semibold">
                    {t.yourRank}
                  </p>
                  <p className="text-white/80 text-xs font-bold tracking-[1px]">
                    {t.keepClimbing}!
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl text-white/80 font-semibold">3,450</p>
                <p className="text-white/80 text-[10px] font-semibold tracking-[1px]">
                  {t.points}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </>
  );
}



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
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: rank * 0.08, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center flex-1"
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
              alt={user.name}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Rank Badge */}
        <div
          className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold border-2 border-white ${current.badge}`}
        >
          {rank}
        </div>
      </div>

      {/* 🧾 Info */}
      <div className="text-center mb-1.5 px-1 flex flex-col items-center gap-1">
        <p className="text-[11px] font-bold text-gray-800 truncate max-w-[80px]">
          {user.name?.split(" ")[0]}
        </p>

        {/* 💎 Score */}
        <div className="text-xs font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-1.5">
          <div className="relative">
            <img
              src="/assets/images/diamond3.png"
              alt="diamond"
              className="h-6 w-6 object-cover"
            />

            {/* ✨ Optional shimmer */}
            {/* 
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent 
            animate-[shimmer_2s_linear_infinite] opacity-40 rotate-[25deg] pointer-events-none rounded-full" />
            */}
          </div>
          <span>{user.score.toLocaleString()}</span>
        </div>

        <p className={`text-[10px] font-bold tracking-[1px] ${current.text}`}>
          {user.bids.toLocaleString()} {t.bids}
        </p>
      </div>

      {/* 🏆 Podium */}
      <motion.div
        initial={{ height: 0 }}
        animate={{
          height: type === "gold" ? 75 : type === "silver" ? 55 : 45,
        }}
        transition={{ delay: 0.25 + rank * 0.08 }}
        style={current.podium}
        className="w-full rounded-t-xl  border border-white/30 shadow-inner relative overflow-hidden"
      >
        {/* ✨ subtle shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20" />
      </motion.div>
    </motion.div>
  );
});

const StatCard = React.memo(({ icon, label, value }: any) => {
  return (
    <div className="bg-white rounded-lg p-2 text-center">
      <div className="flex justify-center text-violet-600 mb-0.5">{icon}</div>
      <p className="text-[9px] text-gray-500 font-medium uppercase">{label}</p>
      <p className="text-xs font-bold text-gray-800">{value}</p>
    </div>
  );
});
