"use client";

import React from "react";
import {
  Gamepad2,
  Zap,
  Target,
  Puzzle,
  Car,
  Trophy,
  Star,
  Heart,
} from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import { useNavigate } from "react-router-dom";

const GAME_CATEGORIES = [
  { id: 1, name: "Action", icon: Zap, color: "from-red-500 to-orange-500" },
  { id: 2, name: "Adventure", icon: Target, color: "from-green-500 to-emerald-500" },
  { id: 3, name: "Arcade", icon: Gamepad2, color: "from-purple-500 to-fuchsia-500" },
  { id: 4, name: "Puzzle", icon: Puzzle, color: "from-blue-500 to-cyan-500" },
  { id: 5, name: "Racing", icon: Car, color: "from-pink-500 to-rose-500" },
  { id: 6, name: "Sports", icon: Trophy, color: "from-amber-500 to-yellow-500" },
  { id: 7, name: "Strategy", icon: Star, color: "from-indigo-500 to-violet-500" },
  { id: 8, name: "Casual", icon: Heart, color: "from-teal-500 to-cyan-500" },
];

export default function TrendingGamesSlider() {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-50">
      <div className="max-w-md mx-auto px-2">
        {/* 🔹 HEADER + SLIDER (SAME GRADIENT CONTAINER) */}
        <div className="rounded-xl relative bg-gradient-to-r from-[#0a0f7ac4] to-pink-700 pt-4 pb-2 px-3 overflow-hidden">
          {/* Header */}
          <div className="relative z-10 mb-2">
            <div className="flex items-center justify-center gap-2">
              <div className=" backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white ">
                {t.trendingGames}
              </h1>

            </div>
            <p className="mt-1 text-center text-white/90 text-sm font-semibold ">{t.popularGamesDescription}</p>
          </div>

          {/* 🔹 SLIDER INSIDE GRADIENT */}
          <div className="relative overflow-hidden py-2">
            <div className="flex gap-4 w-max px-2 animate-slide-right hover:[animation-play-state:paused]">
              {[...GAME_CATEGORIES, ...GAME_CATEGORIES].map((category, index) => (
                <CategoryCard
                  key={`${category.id}-${index}`}
                  category={category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CategoryCard = React.memo(({
  category,
}: {
  category: typeof GAME_CATEGORIES[0];
}) => {
  const Icon = category.icon;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games`);
  };

  return (
    <button
      className="
        relative flex-shrink-0 w-16 h-16 rounded-2xl
        bg-white shadow-lg border border-black/5
        active:scale-95 transition-transform
      "
      onClick={handleClick}
    >
      {/* Decorative faded icon */}
      <Icon className="absolute -right-2 -bottom-2 w-16 h-16 text-black/5 rotate-12" />

      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Icon with CATEGORY COLOR */}
        <div
          className={`
            w-12 h-12 rounded-xl
            flex items-center justify-center
            bg-gradient-to-br ${category.color}
          `}
        >
          <Icon
            className="w-7 h-7 text-white"
            strokeWidth={2.5}
          />
        </div>
      </div>
    </button>
  );
});
