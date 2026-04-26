"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Gift, Sparkles } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

const PopupBannerForBidPage = ({
    data,
    isShow,
    onConfirm,
    confirmText,
}) => {
    const { t } = useLanguage();

    if (!isShow) return null;

    return (
        <motion.div
            key="popup-banner-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md"
            style={{ marginTop: "0px" }}
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
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-pink-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="w-full text-center relative z-10"
                >
                    {/* Mystery Box Visual */}
                    <div className="relative mb-8 flex justify-center">
                        <motion.div
                            animate={{
                                y: [-6, 6, -6],
                                rotate: [-2, 2, -2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative group"
                        >
                            {/* Outer Atmosphere Glow */}
                            <div className="absolute -inset-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />

                            <div className="relative w-24 h-24">
                                {/* The Box Container */}
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-600 rounded-[2rem] p-0.5 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                                    <div className="w-full h-full bg-[#13062d] rounded-[1.9rem] flex items-center justify-center overflow-hidden relative">
                                        {/* Golden internal light */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.15)_0%,_transparent_70%)]" />

                                        {/* Ribbon Vertical */}
                                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-b from-pink-500 via-rose-600 to-pink-500 shadow-lg shadow-pink-500/20" />

                                        <Gift className="w-12 h-12 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] relative z-10" />

                                        {/* Floating Sparkle Reward Particles */}
                                        <motion.div
                                            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                            className="absolute top-4 right-4"
                                        >
                                            <Sparkles className="w-4 h-4 text-emerald-400" />
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
                                            className="absolute bottom-4 left-4"
                                        >
                                            <Sparkles className="w-3 h-3 text-yellow-300" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Floating Gems/Coins around the box */}
                                <motion.div
                                    animate={{ y: [0, -15, 0], rotate: 360 }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="absolute -top-4 -left-4 w-7 h-7 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-lg blur-[1px] shadow-lg flex items-center justify-center"
                                >
                                    <div className="w-3 h-3 bg-white/40 rounded-full" />
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                    className="absolute -bottom-2 -right-4 w-6 h-6 bg-gradient-to-br from-amber-300 to-yellow-600 rounded-full blur-[1px] shadow-lg"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {data?.title && (
                        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-3 tracking-[1px]">
                            {data.title}
                        </h2>
                    )}
                    {data?.description && (
                        <p className="text-[11px] leading-relaxed text-blue-100 font-semibold tracking-[0.5px]">
                            {data.description}
                        </p>
                    )}

                    <div className="mt-8">
                        <Button
                            className="h-14 w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-900/20 border-t border-white/20 transition-all active:scale-95 tracking-[2px] text-sm"
                            onClick={onConfirm}
                        >
                            {confirmText || t.playMoreBids}
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default PopupBannerForBidPage;
