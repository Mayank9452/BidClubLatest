import React, { useEffect, useState, useMemo } from "react";
import { Trophy, Crown, Medal, Star, Sparkles, Timer, Zap, Award, ChevronRight } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import { useNavigate } from "react-router-dom";

const maskMSISDN = (phone: string) => {
    if (!phone || phone.length < 12) return phone;

    // Remove first 2 digits (country code like 95)
    const trimmed = phone.slice(2);

    // Ensure it's 10 digits after trimming
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

// Mock winner data
const WEEKLY_WINNERS = [
    {
        id: 1,
        rank: 1,
        phone: "+91 98765 43210",
        uniqueNumber: "4523",
        avatar: "winner1",
        time: "2m ago",
    },
    {
        id: 2,
        rank: 2,
        phone: "+91 87654 32109",
        uniqueNumber: "7891",
        avatar: "winner2",
        time: "5m ago",
    },
    {
        id: 3,
        rank: 3,
        phone: "+91 76543 21098",
        uniqueNumber: "2156",
        avatar: "winner3",
        time: "8m ago",
    },
    {
        id: 4,
        rank: 4,
        phone: "+91 65432 10987",
        uniqueNumber: "9384",
        avatar: "winner4",
        time: "12m ago",
    },
    {
        id: 5,
        rank: 5,
        phone: "+91 54321 09876",
        uniqueNumber: "5672",
        avatar: "winner5",
        time: "15m ago",
    },
];

const DUMMY_MONTHLY_WINNERS = [
    {
        id: "monthly-1",
        rank: 1,
        phone: "+95 979****123",
        uniqueNumber: "M-7708",
        avatar: "6.png",
        time: "1d ago",
    },
    {
        id: "monthly-2",
        rank: 2,
        phone: "+95 925****456",
        uniqueNumber: "M-6192",
        avatar: "11.png",
        time: "2d ago",
    },
    {
        id: "monthly-3",
        rank: 3,
        phone: "+95 940****789",
        uniqueNumber: "M-8831",
        avatar: "9.png",
        time: "3d ago",
    }
];

const gradientStyles = [
    "from-indigo-600 to-purple-600",
    "from-emerald-500 to-blue-600",
    "from-rose-500 to-orange-500",
    "from-violet-600 to-pink-500",
];

const getRankIcon = (rank: number) => {
    if (rank === 1)
        return <Crown className="w-4 h-4 text-yellow-400" fill="currentColor" />;
    if (rank <= 5) return <Award className="w-4 h-4 text-white" />;
    return <Star className="w-3 h-3 text-white" />;
};

// Generate random sparkles with staggered animations
const generateSparkles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`, // 2-4s
        size: Math.random() > 0.5 ? "w-3 h-3" : "w-2 h-2",
    }));
};

// const sparkles = generateSparkles(15);

export default function WinnerListUpdated({ lastWeeklyWinners, lastMonthLeaderBoardWinners }) {
    const { t } = useLanguage();

    const cardSparkles = useMemo(() => generateSparkles(5), []);

    const weeklyWinners = useMemo(() => {
        if (!Array.isArray(lastWeeklyWinners)) return [];

        return lastWeeklyWinners.map((item: any, index: number) => {
            return {
                id: item.cycle_id,
                rank: Number(item.cycle_reward_rank),
                phone: maskMSISDN(item.user_phone),
                avatar: getAvatarFilename(item.user_image || item.user_avatar, item.user_id, index),
                uniqueNumber: item.cycle_id,
                time: t.justNow,
            };
        });
    }, [lastWeeklyWinners, t.justNow]);

    const monthlyWinners = useMemo(() => {
        const top10 = lastMonthLeaderBoardWinners?.top10;
        if (!Array.isArray(top10)) return [];

        return top10.map((item: any, index: number) => {
            return {
                id: `monthly-${item.id || index}`,
                rank: Number(item.user_rank || index + 1),
                phone: maskMSISDN(item.user_phone),
                avatar: getAvatarFilename(item.user_image || item.user_avatar, item.user_id, index),
                uniqueNumber: item.id,
                time: t.justNow,
                reward: item.user_reward,
            };
        });
    }, [lastMonthLeaderBoardWinners, t.justNow]);

    const combinedWinners = useMemo(() => {
        const list: any[] = [];

        // Add weekly winners
        if (Array.isArray(weeklyWinners)) {
            weeklyWinners.forEach((item) => {
                list.push({ ...item, isMonthly: false });
            });
        }

        // Add monthly winners
        if (Array.isArray(monthlyWinners) && monthlyWinners.length > 0) {
            monthlyWinners.forEach((item) => {
                list.push({ ...item, isMonthly: true });
            });
        } else {
            DUMMY_MONTHLY_WINNERS.forEach((item) => {
                list.push({ ...item, isMonthly: true });
            });
        }

        return list;
    }, [weeklyWinners, monthlyWinners]);

    // console.log("lastWeeklyWinners", lastWeeklyWinners);
    return (
        <div className="relative overflow-hidden">
            {/* Floating Gold Sparkles - Background Layer */}
            {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className={`absolute ${sparkle.size}`}
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animation: `float-sparkle ${sparkle.duration} ease-in-out infinite`,
              animationDelay: sparkle.delay,
            }}
          >
            <Sparkles className="text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.8)]" fill="currentColor" />
          </div>
        ))}
      </div> */}

            <div className=" px-2 relative z-10">
                {/* Header Section with Sparkles */}
                <div className="rounded-xl relative bg-gradient-to-r from-[#0a0f7ac4] to-pink-700 pt-4 pb-16 px-3 overflow-hidden mb-4">
                    {/* Animated Background Blobs */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />

                    {/* Header Sparkles */}
                    {/* {sparkles.slice(0, 8).map((sparkle) => (
            <div
              key={`header-${sparkle.id}`}
              className="absolute w-1 h-1"
              style={{
                left: sparkle.left,
                top: sparkle.top,
                animation: `twinkle ${sparkle.duration} ease-in-out infinite`,
                animationDelay: sparkle.delay,
              }}
            >
              <div className="w-full h-full bg-yellow-300 rounded-full shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
            </div>
          ))} */}

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center relative">
                                <Trophy className="w-6 h-6 text-white" fill="currentColor" />
                                {/* Trophy Sparkle */}
                                <div className="absolute -top-1 -right-1 w-2 h-2 animate-ping">
                                    <Sparkles
                                        className="w-2 h-2 text-yellow-300"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>
                            {cardSparkles.map((sparkle) => (
                                <div
                                    key={`card-${sparkle.id}`}
                                    className="absolute w-1 h-1"
                                    style={{
                                        left: sparkle.left,
                                        top: sparkle.top,
                                        animation: `twinkle ${sparkle.duration} ease-in-out infinite`,
                                        animationDelay: sparkle.delay,
                                    }}
                                >
                                    <div className="w-full h-full bg-yellow-300 rounded-full shadow-[0_0_6px_rgba(253,224,71,0.9)]" />
                                </div>
                            ))}
                            <h1 className="text-xl font-bold text-white ">
                                {t.winners}
                            </h1>
                        </div>
                        <p className="text-center text-white/90 text-sm font-semibold ">
                            {t.congratulationsChampions}
                        </p>
                    </div>
                </div>

                {/* Scrolling Section */}
                <div className="relative -mt-20 mx-1">
                    <div className="relative overflow-hidden py-2 pb-1">
                        <div
                            className={`
    flex gap-4 px-4 will-change-transform
    ${combinedWinners.length > 1
                                    ? "animate-[slide-right_60s_linear_infinite] hover:[animation-play-state:paused] w-max"
                                    : "justify-center"
                                }
  `}
                        >
                            {[...combinedWinners, ...combinedWinners].map((winner, index) => (
                                <WinnerBanner
                                    key={`${winner.id}-${index}`}
                                    winner={winner}
                                    bgGradient={gradientStyles[(index % combinedWinners.length) % gradientStyles.length]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
        @keyframes float-sparkle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-15px) rotate(270deg);
            opacity: 0.6;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes sparkle-rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes shimmer-sparkle {
          0%, 100% {
            opacity: 0;
            transform: translateX(-100%) translateY(-100%);
          }
          50% {
            opacity: 1;
            transform: translateX(100%) translateY(100%);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(250, 204, 21, 0.4), inset 0 0 5px rgba(250, 204, 21, 0.2);
            border-color: rgba(253, 224, 71, 0.6);
          }
          50% {
            box-shadow: 0 0 22px rgba(250, 204, 21, 0.9), inset 0 0 10px rgba(250, 204, 21, 0.5);
            border-color: rgba(253, 224, 71, 1);
          }
        }
      `}</style>
        </div>
    );
}

const WinnerBanner = React.memo(({ winner, bgGradient }: any) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const cardSparkles = useMemo(() => generateSparkles(winner.isMonthly ? 5 : 3), [winner.isMonthly]);

    // Use regular weekly background gradient for both weekly and monthly winners
    const cardBgGradient = bgGradient;

    const borderStyle = winner.isMonthly
        ? "border-2 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.25)]"
        : "border border-white/20";

    const interactiveClasses = winner.isMonthly
        ? "cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
        : "active:scale-95 transition-transform duration-200";

    const getMonthlyPrize = (w: any) => {
        if (w.reward) {
            const reward = Number(w.reward);
            if (reward >= 1024) {
                return `${Math.round(reward / 1024)} GB ATOM Data`;
            }
            return `${reward} MB ATOM Data`;
        }
        if (w.rank === 1 || w.rank === 2) return "5 GB ATOM Data";
        return "2 GB ATOM Data";
    };

    return (
        <div
            onClick={() => {
                if (winner.isMonthly) {
                    navigate("/monthlyWinners");
                }
            }}
            className={`relative flex-shrink-0 w-[260px] rounded-2xl p-3 shadow-lg ${borderStyle} overflow-hidden bg-gradient-to-br ${cardBgGradient} ${interactiveClasses} will-change-transform`}
        >
            {/* Card-specific floating sparkles */}
            {cardSparkles.map((sparkle) => (
                <div
                    key={`card-${sparkle.id}`}
                    className="absolute w-1 h-1"
                    style={{
                        left: sparkle.left,
                        top: sparkle.top,
                        animation: `twinkle ${sparkle.duration} ease-in-out infinite`,
                        animationDelay: sparkle.delay,
                    }}
                >
                    <div className="w-full h-full bg-yellow-300 rounded-full shadow-[0_0_6px_rgba(253,224,71,0.9)]" />
                </div>
            ))}

            {/* Background Decorative Icon */}
            {winner.isMonthly ? (
                <Crown className="absolute -right-2 -bottom-2 w-16 h-16 text-white/10 -rotate-12" />
            ) : (
                <Zap className="absolute -right-2 -bottom-2 w-16 h-16 text-white/10 -rotate-12" />
            )}

            {/* Content layout */}
            <div className="flex items-center justify-between gap-2.5 h-full">
                {/* Avatar (Left) */}
                <div className="flex-shrink-0 relative">
                    <div className={`w-12 h-12 rounded-xl bg-white/30 p-0.5 border-2 shadow-xl ${winner.isMonthly ? "border-yellow-200" : "border-white/40"}`}>
                        <div className="w-full h-full rounded-lg overflow-hidden bg-white">
                            <img
                                src={`/assets/users/${winner.avatar}`}
                                alt="Winner"
                                className="w-full h-full"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                    {/* Avatar Corner Sparkle for Rank 1 or Monthly */}
                    {(winner.rank === 1 || winner.isMonthly) && (
                        <div className="absolute -top-1 -right-1">
                            <Sparkles
                                className="w-3 h-3 text-yellow-300 drop-shadow-[0_0_4px_rgba(250,204,21,1)]"
                                fill="currentColor"
                                style={{
                                    animation: "sparkle-rotate 1.5s linear infinite",
                                }}
                            />
                        </div>
                    )}
                </div>

                {winner.isMonthly ? (
                    <>
                        {/* Info Section for Monthly Winner */}
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                            <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider leading-none mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                {t.monthlyLeaderboardWinner || "Monthly Leaderboard Winner"}
                            </div>
                            <div className="text-[11px] font-bold text-white truncate leading-tight">
                                {winner.phone}
                            </div>
                            <div className="text-xs font-bold text-white leading-tight mt-1 flex items-center gap-1">
                                🎁 {getMonthlyPrize(winner)}
                            </div>
                        </div>

                        {/* Rank Badge for Monthly Winner (with ChevronRight in place of medal icon) */}
                        <div className="relative z-10 flex-shrink-0 flex flex-col items-center justify-center gap-1.5">
                            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                                {t.rank} {winner.rank}
                            </span>
                            <div className="relative bg-white border border-white/40 rounded-xl h-7 w-7 p-0 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-pulse">
                                <ChevronRight className="w-4 h-4 text-slate-950" />
                                {/* Sparkle for Top 3 */}
                                {winner.rank <= 3 && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2">
                                        <Sparkles
                                            className="w-2 h-2 text-yellow-300"
                                            fill="currentColor"
                                            style={{
                                                animation: "sparkle-rotate 2s linear infinite",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Info Section for Weekly Winner */}
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                            <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider leading-none mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                {t.weeklyBidWinner || "Weekly Bid Winner"}
                            </div>
                            <div className="text-[11px] font-bold text-white truncate leading-tight">
                                {winner.phone}
                            </div>
                            <div className="flex flex-col justify-center gap-0.5 mt-1">
                                <div className="text-[10px] font-semibold text-white/70 italic leading-none">
                                    {t.uniqueBidNumber}
                                </div>
                                <div className="text-[11px] font-semibold text-white leading-none">
                                    {winner.uniqueNumber}
                                </div>
                            </div>
                        </div>

                        {/* Rank Badge for Weekly Winner */}
                        <div className="relative z-10 flex-shrink-0 flex flex-col items-center justify-center gap-1.5">
                            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                                {t.rank} {winner.rank}
                            </span>
                            <div className="p-1 bg-white/30 border border-white/70 rounded-lg relative">
                                {getRankIcon(winner.rank)}
                                {/* Icon Sparkle for Top 3 */}
                                {winner.rank <= 3 && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2">
                                        <Sparkles
                                            className="w-2 h-2 text-yellow-300"
                                            fill="currentColor"
                                            style={{
                                                animation: "sparkle-rotate 2s linear infinite",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Shine Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
    );
});
