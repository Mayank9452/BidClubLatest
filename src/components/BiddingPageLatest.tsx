import { useState, useEffect } from "react";
import {
    Sparkles,
    Trophy,
    Shuffle,
    Trash2,
    Check,
    X,
    Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TopBar } from "./TopBar";
import { BottomNavBar } from "./BottomNavBar";
import PopupBannerForBidPage from "./PopupBannerForBidPage";
import { useLanguage } from "./context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { checkUniqueNumbers } from "@/features/uniqueNumber/uniqueNumberSlice";
import { placeBid } from "@/features/placebid/placeBidSlice";
// import biddingPageImg from "../assets/image/biddingPage.png";
// import jackpotGif from "../assets/image/jackpot.gif";

// ── Helpers ──────────────────────────────────────────────────────────────────
const getMMTTime = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 6.5 * 60 * 60 * 1000);
};

const getTimeLeft = (endTime: string) => {
    const now = getMMTTime().getTime();
    if (!endTime) return "00 : 00 : 00 : 00";
    const diff = new Date(endTime).getTime() - now;
    if (diff <= 0) return "00 : 00 : 00 : 00";
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(d).padStart(2, "0")} : ${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
};

export default function BiddingPageLatest() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectedTickets, setSelectedTickets] = useState<{
        [key: number]: string;
    }>({});
    const [currentTicket, setCurrentTicket] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const { t } = useLanguage();

    const { data: bidResponse } = useAppSelector((state) => state.bid);

    // actual API payload
    const bidData = bidResponse?.data;
    const bidInfo = bidData?.bidInfo;

    // values you need
    const bidName = bidInfo?.bid_name?.replace(/\+/g, " ");
    const bidCycle = bidInfo?.bid_cycles;
    const batchCount = bidData?.batchCount;

    useEffect(() => {
        if (!bidInfo?.bid_end_timestamp) return;

        setTimeLeft(getTimeLeft(bidInfo.bid_end_timestamp));
        const id = setInterval(() => {
            setTimeLeft(getTimeLeft(bidInfo.bid_end_timestamp));
        }, 1000);
        return () => clearInterval(id);
    }, [bidInfo?.bid_end_timestamp]);

    const tickets = Array(6).fill(null);

    const handleNumberClick = (num: string) => {
        if (currentTicket === null) return;

        const newValue = inputValue + num;
        if (newValue.length <= 4) {
            setInputValue(newValue);
        }
    };

    const handleTicketSelect = (index: number) => {
        setCurrentTicket(index);
        setInputValue(selectedTickets[index] || "");
    };

    const handleConfirm = () => {
        if (currentTicket !== null && inputValue.length > 0) {
            setSelectedTickets({ ...selectedTickets, [currentTicket]: inputValue });
            setInputValue("");
            setCurrentTicket(null);
        }
    };

    const handleDelete = () => {
        setInputValue(inputValue.slice(0, -1));
    };

    const handleConfirmValue = () => {
        if (inputValue.length === 4) {
            handleConfirm();
        }
    };

    const handleCancelInput = () => {
        setInputValue("");
        setCurrentTicket(null);
    };

    const handleAutoPick = () => {
        const newTickets: { [key: number]: string } = {};
        tickets.forEach((_, index) => {
            const digits = Math.floor(Math.random() * 4) + 1; // 1-4 digits
            const maxNum = Math.pow(10, digits) - 1;
            const minNum = Math.pow(10, digits - 1);
            newTickets[index] = Math.floor(
                minNum + Math.random() * (maxNum - minNum + 1),
            ).toString();
        });
        setSelectedTickets(newTickets);
        setCurrentTicket(null);
        setInputValue("");
    };

    const handleClearAll = () => {
        setSelectedTickets({});
        setCurrentTicket(null);
        setInputValue("");
    };

    const handleSubmit = async (e?: any) => {
        e?.preventDefault();

        if (Object.keys(selectedTickets).length !== 6) return;

        const numbersArray = Object.values(selectedTickets).map(Number);

        const checkPayload = {
            bid: btoa(bidInfo?.bid_id.toString()),
            data: JSON.stringify(numbersArray),
        };

        try {
            const checkRes = await dispatch(
                checkUniqueNumbers(checkPayload),
            ).unwrap();

            if (checkRes?.status === "success") {
                const placeBidPayload: any = {
                    bid: checkPayload.bid,
                    bCount: btoa(bidData.cycleCount.toString()),
                    cCount: btoa(bidData.batchCount.toString()),
                };

                Object.values(selectedTickets).forEach((value, index) => {
                    placeBidPayload[`set_${index + 1}`] = value;
                });

                await dispatch(placeBid(placeBidPayload)).unwrap();
            }
        } catch (err: any) {
            console.error("Error:", err.message);
        }
    };

    return (
        <>
            <TopBar />
            <div className="min-h-screen bg-white overflow-x-hidden relative">
                {/* Background Layers */}

                {/* Jackpot GIF Overlay (Appears ABOVE all components) */}
                <div className="fixed inset-0 z-[50] overflow-hidden pointer-events-none mix-blend-screen ">
                    <img
                        src="/assets/images/jackpot.gif"
                        className="w-full h-full object-cover"
                        alt="Jackpot"
                    />
                </div>

                <div className="relative z-10 p-2">

                    {/* Global Brand Gradient Header */}
                    <div className="relative gradient-home-section py-4 px-3 overflow-hidden rounded-xl mb-4 shadow-xl shadow-pink-200/20 flex flex-col justify-center items-center gap-2">
                        <div className="relative z-10 max-w-md mx-auto text-center flex flex-col items-center gap-1">
                            <h1 className="text-xl font-bold text-white tracking-[1px] drop-shadow-md">
                                {bidName?.includes("Daily")
                                    ? `${t.bidDaily} ${bidName?.split(" ")[2]}`
                                    : `${t.bidWeekly} ${bidName?.split(" ")[2]}`}
                            </h1>
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <h2 className="text-xs font-semibold text-white tracking-[2px]">
                                {`Active Cycle : ${bidCycle} | Set : ${batchCount}`}
                            </h2>
                        </div>
                    </div>

                    {/* Small Premium Timer with Enhanced Shadow */}
                    <div className="flex flex-col items-center justify-center -mt-12 bg-white backdrop-blur-2xl w-[85%] rounded-xl p-2 mx-auto mb-4 shadow-[0px_3px_0px_rgba(255,0,156,1)] border border-indigo-50/50">
                        <div className="flex items-center justify-center gap-2 ">
                            {timeLeft.split(" : ").map((unit, i) => (
                                <div key={i} className="flex items-center justify-center gap-2">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="relative bg-[#ff084bcc]/80 backdrop-blur-lg border border-white/80 rounded-xl w-12 h-12 flex items-center justify-center shadow-2xl">
                                            <span className="text-lg font-bold text-white tabular-nums drop-shadow-lg">
                                                {unit}
                                            </span>
                                        </div>
                                        <span className="text-[10px] tracking-[1px] font-bold text-pink-500/90 mt-1.5">
                                            {["Days", "Hrs", "Min", "Sec"][i]}
                                        </span>
                                    </div>
                                    {i < 3 && (
                                        <div className="text-xl font-bold text-[#ff084bcc] mb-5 animate-pulse">
                                            :
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="">
                        <div className="max-w-md mx-auto space-y-6">
                            {/* Tickets Grid - Enhanced Shadow Container */}
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-xl blur-2xl opacity-20 bg-indigo-500" />

                                {/* Tinted container with deep shadow */}
                                <div className="relative rounded-xl backdrop-blur-2xl p-[4px] gradient-home-section shadow-xl">
                                    {/* Dashed line sitting directly on the gradient */}
                                    <div className="border-2 border-dashed border-white/80 rounded-xl p-1">
                                        {/* Content container with solid background */}
                                        <div className="bg-white/95 backdrop-blur-xl rounded-lg p-3">
                                            <div className="flex items-center justify-center gap-3 w-[80%] mx-auto relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 p-2 shadow-xl mb-6 backdrop-blur-2xl">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xl transform -rotate-3 transition-transform hover:rotate-0">
                                                    <Sparkles
                                                        className="w-5 h-5 text-pink-500"
                                                        fill="currentColor"
                                                    />
                                                </div>
                                                <h2 className="text-lg font-bold text-white tracking-[1px]">
                                                    {t.fillYourTickets}
                                                </h2>
                                            </div>

                                            {/* Tickets Grid */}
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <AnimatePresence mode="popLayout">
                                                    {tickets.map((_, index) => {
                                                        const isSelected = currentTicket === index;
                                                        const hasValue = selectedTickets[index];

                                                        // Using White cards for tickets to pop against the tinted container
                                                        const ticketColor = hasValue
                                                            ? " gradient-diamond"
                                                            : "gradient-button-gold border-2 border-pink-100/50";

                                                        return (
                                                            <motion.button
                                                                layout
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                type="button"
                                                                key={index}
                                                                onClick={() => handleTicketSelect(index)}
                                                                className={`relative group active:scale-95 transition-all duration-300 ${isSelected ? "z-10 scale-105" : ""}`}
                                                            >
                                                                <div
                                                                    className={`relative rounded-3xl overflow-hidden ${isSelected ? "ring-4 ring-pink-500/20 shadow-2xl" : "shadow-lg shadow-pink-200/20"}`}
                                                                >
                                                                    <div
                                                                        className={`relative ${ticketColor} p-4 h-20 flex flex-col items-center justify-center`}
                                                                    >
                                                                        {/* Shimmer for filled */}
                                                                        {hasValue && (
                                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                                                        )}

                                                                        {/* Dashed internal border */}
                                                                        <div
                                                                            className={`absolute inset-2 border-2 border-dashed rounded-xl pointer-events-none ${hasValue ? "border-white/70" : "border-pink-600/60"}`}
                                                                        />

                                                                        {/* Premium Notches - Matched to Body Color #f8fafc */}
                                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-10 bg-[#f8fafc] rounded-r-full shadow-inner" />
                                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-10 bg-[#f8fafc] rounded-l-full shadow-inner" />

                                                                        {hasValue ? (
                                                                            <motion.div
                                                                                initial={{ scale: 0.5 }}
                                                                                animate={{ scale: 1 }}
                                                                                className="relative z-10 flex flex-col items-center justify-center gap-0"
                                                                            >
                                                                                <p className="text-xl font-bold text-white drop-shadow-md">
                                                                                    {hasValue}
                                                                                </p>
                                                                                <div className="flex items-center gap-1 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                                                                                    <Check
                                                                                        className="w-3.5 h-3.5 text-white"
                                                                                        strokeWidth={3}
                                                                                    />
                                                                                    <span className="text-[10px] font-bold text-white tracking-[1px]">
                                                                                        {t.filled}
                                                                                    </span>
                                                                                </div>
                                                                            </motion.div>
                                                                        ) : (
                                                                            <div className="relative z-10 text-center">
                                                                                <p className="text-[11px] font-bold text-indigo-600  tracking-[2px] mb-1">
                                                                                    {t.ticket} {index + 1}
                                                                                </p>
                                                                                <p className="text-[12px] font-bold text-pink-500/90 ">
                                                                                    {t.tapToEnter}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.button>
                                                        );
                                                    })}
                                                </AnimatePresence>
                                            </div>

                                            {/* Good Luck Badge */}
                                            <div className="flex justify-center ">
                                                <div className="px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-xl border border-white/20">
                                                    <p className="text-xs font-bold text-white tracking-[3px] ">
                                                        ✨ {t.goodLuck}! ✨
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* MODERN 3x4 KEYPAD with Gradient Strip */}
                            <div className="relative rounded-xl p-[4px] gradient-home-section shadow-2xl">
                                <div className="border-2 border-dashed border-white/80 rounded-xl p-1">
                                    <div className="bg-white/95 backdrop-blur-xl rounded-lg p-4">
                                        {/* MODERN INPUT DISPLAY (Integrated) */}
                                        <AnimatePresence>
                                            {currentTicket !== null && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className=" overflow-hidden border-b border-indigo-50 pb-6"
                                                >
                                                    <div className="flex items-center justify-between mb-4 ">
                                                        <div className="flex items-center gap-3 w-3/4">
                                                            <div className="flex flex-col border-l-4 border-pink-500 pl-3 py-1">
                                                                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-widest leading-none">
                                                                    TICKET - {currentTicket + 1}
                                                                </h3>
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[3px] mt-1">
                                                                    Enter Unique Number
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button onClick={handleCancelInput} className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                                                            <X className="w-6 h-6 text-white" />
                                                        </button>
                                                    </div>

                                                    <div className="flex justify-center gap-2 mb-6">
                                                        {[0, 1, 2, 3].map((i) => {
                                                            const isFilled = !!inputValue[i];
                                                            const isNext = inputValue.length === i;
                                                            return (
                                                                <motion.div
                                                                    key={i}
                                                                    animate={isFilled ? { scale: [1, 1.1, 1] } : isNext ? { scale: [1, 1.05, 1] } : {}}
                                                                    transition={isNext ? { repeat: Infinity, duration: 1.5 } : {}}
                                                                    className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-300
                                                                        ${isFilled ? 'border-pink-500 text-pink-600 bg-pink-50/50 shadow-[0_0_10px_rgba(236,72,153,0.2)]' :
                                                                            isNext ? 'border-indigo-500 text-indigo-600 bg-indigo-50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' :
                                                                                'border-indigo-300 text-slate-200 bg-slate-50'}`}
                                                                >
                                                                    {inputValue[i] || "•"}
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={handleDelete}
                                                            disabled={inputValue.length === 0}
                                                            className="flex-1 bg-rose-50 border-2 border-rose-400 text-rose-600 rounded-xl py-3 font-bold text-[9px] tracking-widest uppercase active:scale-95 transition-all shadow-[0_2px_0_rgba(251,113,133,0.3)] disabled:opacity-50"
                                                        >
                                                            {t.delete}
                                                        </button>
                                                        <button
                                                            onClick={handleConfirm}
                                                            disabled={inputValue.length === 0}
                                                            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl py-3 font-bold text-[9px] tracking-widest uppercase shadow-lg shadow-emerald-500/10 active:scale-95 transition-transform"
                                                        >
                                                            {t.confirm}
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="grid grid-cols-5 gap-2 mb-6">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                                                <motion.button
                                                    key={num}
                                                    whileTap={{ scale: 0.9 }}
                                                    disabled={currentTicket === null || inputValue.length >= 4}
                                                    onClick={() => handleNumberClick(num.toString())}
                                                    className="h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-orange-500 border-2 border-white text-white text-xl font-bold flex items-center justify-center 
                                                        active:bg-pink-500/20 active:border-pink-500/50 transition-all shadow-lg"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={handleAutoPick}
                                                className="bg-indigo-600 text-white font-bold text-[10px] tracking-widest py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10"
                                            >
                                                <Shuffle className="w-4 h-4" />
                                                {t.autoPick}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleClearAll}
                                                className="bg-gradient-to-r from-orange-500 to-rose-600 text-white font-bold text-[10px] tracking-widest py-4 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                {t.clearAll}
                                            </button>
                                        </div>

                                        {/* Main Action Button - Dynamic Premium Style */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            disabled={Object.keys(selectedTickets).length !== 6}
                                            className={`w-full py-5 rounded-[1.75rem] font-bold text-sm tracking-[4px] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 mt-8
                                                ${Object.keys(selectedTickets).length === 6
                                                    ? "bg-gradient-to-r from-[#ff009c] via-[#bd10e0] to-[#7928ca] text-white shadow-[0_10px_30px_rgba(255,0,156,0.4)] border-t border-white/20"
                                                    : "bg-indigo-100 backdrop-blur-md text-indigo-600 border-2 border-indigo-400 shadow-xl shadow-indigo-100/30"
                                                }`}
                                            onClick={handleSubmit}
                                        >
                                            {Object.keys(selectedTickets).length === 6 ? (
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="w-5 h-5 animate-bounce" />
                                                    <span>{t.submitAllTickets}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span>{t.fillAllTickets}</span>
                                                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                                                        {Object.keys(selectedTickets).length}/6
                                                    </span>
                                                </div>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNavBar />

            <PopupBannerForBidPage
                isShow={bidData?.redirect === "RESULT"}
                data={{
                    title: "Result Awaiting",
                    description:
                        bidData?.redirect_to === "CYCLE_END"
                            ? "you have already added your uniqe bids of this round. Please wait for the next round."
                            : "you have already added your all uniqe bids. Please wait for the result.",
                }}
                onConfirm={() => navigate("/dashboard")}
            />
        </>
    );
}
