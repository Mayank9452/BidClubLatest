import React from "react";
import { Trophy, Gem, Zap, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const maskPhone = (phone: string) => {
    if (!phone) return "";
    const trimmed = phone.replace("+", "").trim();
    if (trimmed.length < 10) return phone;
    const start = trimmed.slice(0, 3);
    const end = trimmed.slice(-3);
    return `+${start}xxxx${end}`;
};

const MONTHLY_CHAMPIONS_DATA = [
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

export default function MonthlyWinnersOld() {
    return (
        <div className="w-full max-w-md mx-auto space-y-3.5">
            {MONTHLY_CHAMPIONS_DATA.map((user, index) => {
                const isTopThree = user.rank <= 3;

                // Card Border styling (Top ranks get glowing borders)
                const cardBorder = isTopThree
                    ? user.rank === 1
                        ? "border-yellow-400 shadow-[0_4px_20px_rgba(250,204,21,0.25)]"
                        : user.rank === 2
                            ? "border-slate-300 shadow-[0_4px_15px_rgba(148,163,184,0.15)]"
                            : "border-amber-500 shadow-[0_4px_15px_rgba(217,119,6,0.15)]"
                    : "border-gray-100 shadow-md";

                // Top rank colored top strip (similar to Notification strip)
                const statusStrip = isTopThree
                    ? user.rank === 1
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500"
                        : user.rank === 2
                            ? "bg-gradient-to-r from-slate-300 to-slate-400"
                            : "bg-gradient-to-r from-amber-500 to-amber-600"
                    : "bg-gradient-to-r from-indigo-400 to-purple-400";

                // Rank Badge colors
                const badgeColor =
                    user.rank === 1
                        ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white"
                        : user.rank === 2
                            ? "bg-gradient-to-r from-slate-400 to-zinc-600 text-white"
                            : user.rank === 3
                                ? "bg-gradient-to-r from-amber-600 to-orange-700 text-white"
                                : "bg-gray-100 text-gray-500 border border-gray-200";

                return (
                    <motion.div
                        key={user.rank}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`relative rounded-2xl p-4 bg-white border ${cardBorder} overflow-hidden transition-all duration-150`}
                    >
                        {/* Colored top strip */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${statusStrip}`} />

                        {/* Top Rank + User Details */}
                        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5 mt-1">
                            <div className="flex items-center gap-2.5">
                                {/* Rank Badge */}
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shadow-inner ${badgeColor}`}>
                                    {user.rank}
                                </div>

                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-lg p-[1px] bg-gray-200">
                                        <div className="w-full h-full bg-white rounded-[6px] overflow-hidden flex items-center justify-center p-0.5">
                                            <img
                                                src={`/assets/users/${user.avatar}`}
                                                alt="Avatar"
                                                className="w-full h-full bg-white rounded-md"
                                            />
                                        </div>
                                    </div>
                                    {user.rank === 1 && (
                                        <div className="absolute -top-1 -right-1">
                                            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                                        </div>
                                    )}
                                </div>

                                {/* Masked Phone */}
                                <span className="text-sm font-extrabold text-gray-800">
                                    {maskPhone(user.phone)}
                                </span>
                            </div>

                            {/* Prize Tag */}
                            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                                <Trophy className="w-3 h-3 text-amber-600" fill="currentColor" />
                                <span className="text-xs font-black text-amber-600 uppercase">
                                    {user.totalPrizeWon}
                                </span>
                            </div>
                        </div>

                        {/* Details Grid (similar colors to NotificationPage box styles) */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            {/* Bids */}
                            <div className="flex flex-col gap-0.5 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg p-2.5 border border-violet-200 items-center justify-center">
                                <span className="text-xs font-semibold text-violet-600 flex items-center gap-1 leading-relaxed mb-0.5">
                                    <Zap className="w-3 h-3 text-violet-600" />
                                    Total Bid
                                </span>
                                <span className="text-gray-700 font-bold text-xs leading-relaxed">
                                    {user.totalBids} Bids
                                </span>
                            </div>

                            {/* Diamonds */}
                            <div className="flex flex-col gap-0.5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-2.5 border border-emerald-200 items-center justify-center">
                                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 leading-relaxed mb-0.5">
                                    <Gem className="w-3 h-3 text-emerald-600" />
                                    Diamond Earned
                                </span>
                                <span className="text-gray-700 font-bold text-xs flex items-center gap-0.5 leading-relaxed">
                                    <img
                                        src="/assets/images/diamond5.png"
                                        alt="Diamond"
                                        className="h-4 object-cover"
                                    />
                                    {user.diamondsEarned.toLocaleString()}
                                </span>
                            </div>

                            {/* Prize Won */}
                            <div className="flex flex-col gap-0.5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-2.5 border border-amber-200 items-center justify-center">
                                <span className="text-xs font-semibold text-amber-600 flex items-center gap-1 leading-relaxed mb-0.5">
                                    <Trophy className="w-3 h-3 text-amber-600" />
                                    Total Prize Won
                                </span>
                                <span className="text-gray-700 font-bold text-xs leading-relaxed">
                                    {user.totalPrizeWon}
                                </span>
                            </div>

                            {/* Winning Bid Name */}
                            <div className="flex flex-col gap-0.5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-2.5 border border-indigo-200 items-center justify-center">
                                <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 leading-relaxed mb-0.5">
                                    <Award className="w-3 h-3 text-indigo-600" />
                                    Winning Bid
                                </span>
                                <span className="text-gray-700 font-bold text-xs leading-relaxed">
                                    {user.winningBidName}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
