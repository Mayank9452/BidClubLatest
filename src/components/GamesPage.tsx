"use client";
import React, { useEffect, useCallback } from "react";
import { Zap, Gamepad2 } from "lucide-react";
import { TopBar } from "./TopBar";
import { BottomNavBar } from "./BottomNavBar";
import { useLanguage } from "./context/LanguageContext";
import { useAppDispatch } from "@/app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { fetchGamesData } from "@/features/games/gamesSlice";
import { useNavigate } from "react-router-dom";
import CanvasGame from "./CanvasGame";
import GameCard from "./GameCard";

const gradients = [
  "gradient-casino",
  "gradient-dark",
  "gradient-purple",
  "gradient-green-dark",
  "gradient-pink-dark",
  "gradient-blue",
];

export default function GamesPage() {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.games);
  const games = data?.data?.freeGames || [];
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!data) {
      dispatch(fetchGamesData());
    }
  }, [dispatch, data]);

  const handleGamePlay = useCallback((url: string) => {
    navigate(url);
  }, [navigate]);

  return (
    <>
      <TopBar />

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-2 px-2 pb-20">
        <div className="max-w-md mx-auto">
          {/* HEADER + AUTO GAME */}
          <div className="rounded-xl relative bg-gradient-to-r from-[#0a0f7ac4] to-pink-700 pt-3 pb-16 px-3 overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-black text-white">
                  {t.gamesTitle}
                </h1>
              </div>

              {/* AUTO PLAY GAME (VIDEO STYLE) */}
              <div className="rounded-xl bg-black/20 backdrop-blur-sm p-2 shadow-lg">
                <div className="relative w-full h-28 bg-black/10 rounded-xl overflow-hidden border border-white/20">
                  <CanvasGame />
                </div>
              </div>
            </div>
          </div>

          {/* TRENDING SECTION */}
          <div className="relative -mt-12 space-y-4 mx-1">
            <div className="w-[90%] mx-auto relative overflow-hidden rounded-2xl bg-white p-4 border-2 border-pink-200 shadow-xl flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-pink-500">
                  {t.trendingGames}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-2 px-2 ">
              {games.map((game: any, index: number) => (
                <GameCard
                  key={game.game_id}
                  game={game}
                  index={index}
                  bgClass={gradients[index % gradients.length]}
                  onPlay={handleGamePlay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar />
    </>
  );
}
