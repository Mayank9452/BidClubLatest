// "use client";

// import React from "react";
// import { Gamepad2, Zap, Target, Puzzle, Car, Trophy, Star, Heart } from "lucide-react";

// const GAME_CATEGORIES = [
//   { id: 1, name: "Action", icon: Zap, color: "from-red-500 to-orange-500" },
//   { id: 2, name: "Adventure", icon: Target, color: "from-green-500 to-emerald-500" },
//   { id: 3, name: "Arcade", icon: Gamepad2, color: "from-purple-500 to-fuchsia-500" },
//   { id: 4, name: "Puzzle", icon: Puzzle, color: "from-blue-500 to-cyan-500" },
//   { id: 5, name: "Racing", icon: Car, color: "from-pink-500 to-rose-500" },
//   { id: 6, name: "Sports", icon: Trophy, color: "from-amber-500 to-yellow-500" },
//   { id: 7, name: "Strategy", icon: Star, color: "from-indigo-500 to-violet-500" },
//   { id: 8, name: "Casual", icon: Heart, color: "from-teal-500 to-cyan-500" },
// ];

// export default function TrendingGamesSlider() {
//   return (
//     <div className="bg-gray-50 overflow-hidden">
//       <div className="max-w-md mx-auto px-4">

//         {/* Header Section: Clean Gradient with Glassmorphism Icon */}
//         <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-700 pt-6 pb-20 px-4 shadow-lg">
//           <div className="flex items-center justify-center gap-2">
//             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
//               <Gamepad2 className="w-7 h-7 text-white" />
//             </div>
//             <div className="text-center">
//               <h1 className="text-xl font-extrabold text-white tracking-tight">Trending Games</h1>
//               {/* <p className="text-indigo-100 text-xs font-medium opacity-90">Instant play • No download</p> */}
//             </div>
//           </div>
//         </div>

//         {/* Categories Section: Manual Scroll with Negative Margin Overlay */}
//         <div className="relative -mt-16">
//           <div className="overflow-x-auto no-scrollbar scroll-smooth">
//             <div className="flex gap-4 px-2 pb-4 w-max animate-[slide-right_30s_linear_infinite] hover:[animation-play-state:paused]">
//               {GAME_CATEGORIES.map((category) => (
//                 <CategoryCard 
//                   key={category.id} 
//                   category={category} 
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CategoryCard({ category }: { category: typeof GAME_CATEGORIES[0] }) {
//   const Icon = category.icon;

//   return (
//     <button className={`
//       relative flex-shrink-0 w-28 h-28 rounded-2xl p-3 shadow-md 
//       bg-gradient-to-br ${category.color} 
//       border border-white/20 transition-all 
//       active:scale-95 hover:brightness-110 group
//     `}>

//       {/* Decorative Background Icon: Static and Subtle */}
//       <Icon className="absolute -right-2 -bottom-2 w-16 h-16 text-white/10 rotate-12" />

//       <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
//         {/* Icon Container with Glass Effect */}
//         <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-sm">
//           <Icon className="w-7 h-7 text-white drop-shadow-md" strokeWidth={2.5} />
//         </div>

//         {/* Category Label */}
//         <span className="text-xs font-bold text-white tracking-wide">
//           {category.name}
//         </span>
//       </div>
//     </button>
//   );
// }

// "use client";

// import React from "react";
// import { Gamepad2, Zap, Target, Puzzle, Car, Trophy, Star, Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const GAME_CATEGORIES = [
//   { id: 1, name: "Action", icon: Zap, color: "from-red-500 to-orange-500" },
//   { id: 2, name: "Adventure", icon: Target, color: "from-green-500 to-emerald-500" },
//   { id: 3, name: "Arcade", icon: Gamepad2, color: "from-purple-500 to-fuchsia-500" },
//   { id: 4, name: "Puzzle", icon: Puzzle, color: "from-blue-500 to-cyan-500" },
//   { id: 5, name: "Racing", icon: Car, color: "from-pink-500 to-rose-500" },
//   { id: 6, name: "Sports", icon: Trophy, color: "from-amber-500 to-yellow-500" },
//   { id: 7, name: "Strategy", icon: Star, color: "from-indigo-500 to-violet-500" },
//   { id: 8, name: "Casual", icon: Heart, color: "from-teal-500 to-cyan-500" },
// ];

// export default function TrendingGamesSlider() {
//   return (
//     <div className="bg-gray-50 overflow-hidden py-4">
//       <div className="max-w-md mx-auto relative">

//         {/* Gradient Container */}
//         <div className="mx-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-700 px-2 py-4 shadow-lg overflow-hidden">

//           {/* Header */}
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
//               <Gamepad2 className="w-7 h-7 text-white" />
//             </div>
//             <h1 className="text-xl font-extrabold text-white tracking-tight">
//               Trending Games
//             </h1>
//           </div>

//           {/* Sliding Categories (INSIDE gradient) */}
//           <div className="relative w-full overflow-hidden">
//             <div className="flex gap-4 w-max px-2 animate-slide-right hover:[animation-play-state:paused]">
//               {[...GAME_CATEGORIES, ...GAME_CATEGORIES].map((category, index) => (
//                 <CategoryCard
//                   key={`${category.id}-${index}`}
//                   category={category}
//                 />
//               ))}
//             </div>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// function CategoryCard({ category }: { category: typeof GAME_CATEGORIES[0] }) {
//   const Icon = category.icon;

//   return (
//     <button className={`
//       relative flex-shrink-0 w-28 h-28 rounded-2xl p-3 shadow-md 
//       bg-gradient-to-br ${category.color} 
//       border border-white/20 transition-all 
//       active:scale-95 hover:brightness-110 group
//     `}
//     >

//       {/* Background Decorative Icon */}
//       <Icon className="absolute -right-2 -bottom-2 w-16 h-16 text-white/10 rotate-12" />

//       <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2" >
//         {/* Icon Container with Glass Effect */}
//         <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-sm">
//           <Icon className="w-7 h-7 text-white drop-shadow-md" strokeWidth={2.5} />
//         </div>

//         {/* Category Label */}
//         <span className="text-xs font-bold text-white tracking-wide">
//           {category.name}
//         </span>
//       </div>
//     </button>
//   );
// }


// "use client";

// import React from "react";
// import {
//   Gamepad2,
//   Zap,
//   Target,
//   Puzzle,
//   Car,
//   Trophy,
//   Star,
//   Heart,
// } from "lucide-react";

// const GAME_CATEGORIES = [
//   { id: 1, name: "Action", icon: Zap, color: "from-red-500 to-orange-500" },
//   { id: 2, name: "Adventure", icon: Target, color: "from-green-500 to-emerald-500" },
//   { id: 3, name: "Arcade", icon: Gamepad2, color: "from-purple-500 to-fuchsia-500" },
//   { id: 4, name: "Puzzle", icon: Puzzle, color: "from-blue-500 to-cyan-500" },
//   { id: 5, name: "Racing", icon: Car, color: "from-pink-500 to-rose-500" },
//   { id: 6, name: "Sports", icon: Trophy, color: "from-amber-500 to-yellow-500" },
//   { id: 7, name: "Strategy", icon: Star, color: "from-indigo-500 to-violet-500" },
//   { id: 8, name: "Casual", icon: Heart, color: "from-teal-500 to-cyan-500" },
// ];

// export default function TrendingGamesSlider() {
//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-md mx-auto px-2">

//         {/* 🔹 HEADER / GRADIENT BOX */}
//         <div className="rounded-xl relative bg-gradient-to-r from-[#0a0f7ac4] to-pink-700 pt-6 pb-24 px-3 overflow-hidden">
//           <div className="relative z-10">
//             <div className="flex items-center justify-center gap-2 mb-1">
//               <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                 <Gamepad2 className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-black text-white tracking-tight">
//                 Trending Games
//               </h1>
//             </div>
//             {/* <p className="text-center text-white/90 text-xs font-medium">
//               Pick your favorite category
//             </p> */}
//           </div>
//         </div>

//         {/* 🔹 SLIDER (PULLED INTO HEADER) */}
//         <div className="relative -mt-24 mx-2">
//           <div className="relative overflow-hidden py-2">
//             <div className="flex gap-4 w-max px-4 animate-slide-right hover:[animation-play-state:paused]">
//               {[...GAME_CATEGORIES, ...GAME_CATEGORIES].map((category, index) => (
//                 <CategoryCard
//                   key={`${category.id}-${index}`}
//                   category={category}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// function CategoryCard({ category }: { category: typeof GAME_CATEGORIES[0] }) {
//   const Icon = category.icon;

//   return (
//     <button
//       className={`
//         relative flex-shrink-0 w-20 h-20 rounded-2xl p-3
//         shadow-lg border border-white/20
//         bg-gradient-to-br ${category.color}
//         active:scale-95 transition-transform
//       `}
//     >
//       {/* Decorative Icon */}
//       <Icon className="absolute -right-2 -bottom-2 w-16 h-16 text-white/10 rotate-12" />

//       <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
//         <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-sm">
//           <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
//         </div>

//         {/* <span className="text-xs font-bold text-white tracking-wide">
//           {category.name}
//         </span> */}
//       </div>
//     </button>
//   );
// }


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
              <h1 className="text-2xl font-black text-white tracking-[1px]">
                {t.trendingGames}
              </h1>

            </div>
            <p className="mt-1 text-center text-white/90 text-[13px] font-semibold tracking-[1px]">{t.popularGamesDescription}</p>
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

function CategoryCard({
  category,
}: {
  category: typeof GAME_CATEGORIES[0];
}) {
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
}
