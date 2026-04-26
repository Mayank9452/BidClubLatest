// import { CheckCircle } from "lucide-react";
// import { useLocation } from "react-router-dom";
// import { TopBar } from "./TopBar";
// import { BottomNavBar } from "./BottomNavBar";

// export default function DetailsPage() {
//     const { state } = useLocation();
//     const videoUrl = state?.videoUrl;
//     return (
//         <>
//             <div className="min-h-screen bg-gray-50 text-gray-900">
//                 <TopBar />

//                 <div className="max-w-6xl mx-auto px-6 py-2 space-y-10">

//                     {/* Video Section */}
//                     {/* <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
//                         <video
//                             src={videoUrl}
//                             controls
//                             autoPlay
//                             muted
//                             className="w-full h-[450px] object-contain bg-black"
//                         />
//                     </div> */}
//                     {/* <div className="mx-auto w-full max-w-[460px] rounded-2xl overflow-hidden bg-black shadow-md">
//                         <video
//                             src={videoUrl}
//                             controls
//                             playsInline
//                             preload="metadata"
//                             className="
//   w-full
//   aspect-[9/16]
//   object-contain
//   max-w-[90vw]
//   max-h-[60vh]
// "
//                         />
//                     </div> */}

//                     <div className="w-full max-w-[100%] mx-auto rounded-2xl overflow-hidden bg-black shadow-md">
//   <div className="relative w-full aspect-video flex items-center justify-center">
//     <video
//       src={videoUrl}
//       controls
//       playsInline
//       preload="metadata"
//       className="h-full max-h-full object-contain"
//     />
//   </div>
// </div>

//                     {/* BidBlast Info Section */}
//                     {/* BidBlast Mobile Info Section */}
//                     <div className="space-y-6">

//                         {/* Intro Card */}
//                         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                             <h3 className="text-xl font-bold mb-2">
//                                 Welcome to BidBlast 🚀
//                             </h3>
//                             <p className="text-gray-600 text-sm">
//                                 An exciting daily bidding game where every cycle gives you a fresh
//                                 chance to win.
//                             </p>
//                         </div>

//                         {/* Bid Types */}
//                         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                             <h4 className="text-lg font-semibold mb-4">
//                                 Choose Your Bid Type
//                             </h4>

//                             <div className="space-y-4">
//                                 <div className="p-4 rounded-xl bg-gray-50 border">
//                                     <p className="font-semibold">Daily Bid</p>
//                                     <p className="text-sm text-gray-600">
//                                         4 cycles per day • Each cycle lasts 6 hours
//                                     </p>
//                                 </div>

//                                 <div className="p-4 rounded-xl bg-gray-50 border">
//                                     <p className="font-semibold">Weekly Bid</p>
//                                     <p className="text-sm text-gray-600">
//                                         7 cycles • Each cycle runs for 24 hours
//                                     </p>
//                                 </div>

//                                 <div className="p-4 rounded-xl bg-gray-50 border">
//                                     <p className="font-semibold">Monthly Bid</p>
//                                     <p className="text-sm text-gray-600">
//                                         30 cycles • 30 days of bidding excitement
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Cycles Explanation */}
//                         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                             <h4 className="text-lg font-semibold mb-2">
//                                 What are Cycles?
//                             </h4>
//                             <p className="text-sm text-gray-600">
//                                 Cycles are individual rounds inside a bid. Each cycle is a fresh
//                                 contest, giving you multiple chances to win.
//                             </p>
//                         </div>

//                         {/* Benefits */}
//                         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//                             <h4 className="text-lg font-semibold mb-4">
//                                 Why You’ll Love Cycles
//                             </h4>

//                             <ul className="space-y-3 text-sm text-gray-700">
//                                 <li>✅ More chances to win every day</li>
//                                 <li>✅ Join any cycle — anytime</li>
//                                 <li>✅ Play at your own pace</li>
//                                 <li>✅ Each cycle is independent</li>
//                             </ul>
//                         </div>

//                         {/* Finale */}
//                         <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
//                             <h4 className="text-lg font-semibold mb-2">
//                                 The Finale 🎉
//                             </h4>
//                             <p className="text-sm text-gray-700">
//                                 Winners are announced at the end of each cycle, and prizes are awarded
//                                 based on rank.
//                                 <br /><br />
//                                 <span className="font-semibold">
//                                     The more you play, the higher your chances!
//                                 </span>
//                             </p>
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             <BottomNavBar />
//         </>
//     );
// }


// import { useLocation } from "react-router-dom";
// import { TopBar } from "./TopBar";
// import { BottomNavBar } from "./BottomNavBar";

// export default function DetailsPage() {
//   const { state } = useLocation();
//   const videoUrl = state?.videoUrl;

//   return (
//     <>
//       {/* Page Wrapper */}
//       <TopBar />
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-4">
        

//         <div className="max-w-md mx-auto px-4 pt-6 space-y-6">

//           {/* Video Card */}
//           <div className="relative rounded-2xl overflow-hidden bg-black shadow-lg">
//             <span className="absolute top-3 left-3 z-10 text-xs bg-black/70 text-white px-3 py-1 rounded-full">
//               ▶ Live Preview
//             </span>

//             <div className="aspect-video flex items-center justify-center">
//               <video
//                 src={videoUrl}
//                 controls
//                 playsInline
//                 preload="metadata"
//                 className="h-full object-contain"
//               />
//             </div>
//           </div>

//           {/* Welcome */}
//           <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_10px_11px_rgba(0,0,0,0.33)]">
//             <h3 className="text-lg font-bold flex items-center gap-2 text-red-800">
//               <span className="w-1 h-5 bg-indigo-600 rounded-full" />
//               Welcome to BidBlast 🚀
//             </h3>
//             <p className="text-sm text-gray-600 mt-2">
//               An exciting daily bidding game where every cycle gives you a
//               fresh chance to win.
//             </p>
//           </div>

//           {/* Bid Types */}
//           <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_10px_11px_rgba(0,0,0,0.33)]">
//             <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-red-800">
//               <span className="w-1 h-5 bg-indigo-600 rounded-full" />
//               Choose Your Bid Type
//             </h3>

//             <div className="space-y-3">
//               <div className="rounded-xl border p-4 bg-gray-50 active:scale-[0.98] transition">
//                 <div className="flex justify-between items-center">
//                   <p className="font-semibold text-gradient-gold">Daily Bid</p>
//                   <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
//                     Popular
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-600 mt-1">
//                   4 cycles per day • Each cycle lasts 6 hours
//                 </p>
//               </div>

//               <div className="rounded-xl border p-4 bg-gray-50 active:scale-[0.98] transition">
//                 <p className="font-semibold text-gradient-gold">Weekly Bid</p>
//                 <p className="text-xs text-gray-600 mt-1">
//                   7 cycles • Each cycle runs for 24 hours
//                 </p>
//               </div>

//               <div className="rounded-xl border p-4 bg-gray-50 active:scale-[0.98] transition">
//                 <p className="font-semibold text-gradient-gold">Monthly Bid</p>
//                 <p className="text-xs text-gray-600 mt-1">
//                   30 cycles • 30 days of bidding excitement
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* What are Cycles */}
//           <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_10px_11px_rgba(0,0,0,0.33)]">
//             <h3 className="text-lg font-bold flex items-center gap-2 mb-2 text-red-800">
//               <span className="w-1 h-5 bg-indigo-600 rounded-full" />
//               What are Cycles?
//             </h3>
//             <p className="text-sm text-gray-600">
//               Cycles are individual rounds inside a bid. Each cycle is a fresh
//               contest, giving you multiple chances to win.
//             </p>
//           </div>

//           {/* Why Love Cycles */}
//           <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-[0_10px_11px_rgba(0,0,0,0.33)]">
//             <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-red-800">
//               <span className="w-1 h-5 bg-indigo-600 rounded-full" />
//               Why You’ll Love Cycles
//             </h3>

//             <ul className="space-y-3">
//               {[
//                 "More chances to win every day",
//                 "Join any cycle — anytime",
//                 "Play at your own pace",
//                 "Each cycle is independent",
//               ].map((text, i) => (
//                 <li
//                   key={i}
//                   className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
//                 >
//                   <span className="text-green-500">✔</span>
//                   <span className="text-sm text-gray-700">{text}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Finale */}
//           <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
//             <h3 className="text-lg font-bold mb-2 text-red-800">
//               The Finale 🎉
//             </h3>
//             <p className="text-sm text-gray-700">
//               Winners are announced at the end of each cycle and prizes are
//               awarded based on rank.
//               <br /><br />
//               <span className="font-semibold">
//                 The more you play, the better your chances!
//               </span>
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* Sticky CTA */}
//       {/* <div className="fixed bottom-16 left-0 right-0 px-4 z-40">
//         <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg">
//           Start Bidding Now
//         </button>
//       </div> */}

//       <BottomNavBar />
//     </>
//   );
// }




import { useLocation } from "react-router-dom";
import { TopBar } from "./TopBar";
import { BottomNavBar } from "./BottomNavBar";
import { Sparkles, Zap, Clock, Trophy, CheckCircle2, TrendingUp } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

export default function DetailsPage() {
  const { state } = useLocation();
  const { t } = useLanguage();
  const videoUrl = state?.videoUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <TopBar />
      
      <div className="min-h-screen bg-premium-soft pb-20">
      {/* Top Bar Placeholder */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50 shadow-sm">
        <h1 className="text-lg font-bold text-gray-800 text-center">{t.howToPlay}</h1>
      </div>
      
      <div className="max-w-md mx-auto px-4 pt-2 pb-2 space-y-4">
        
        {/* Video Card - Premium Style */}
        <div className="relative aspect-video rounded-2xl bg-dark-gray shadow-xl shadow-purple-500/20 overflow-hidden border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
          
          <span className="absolute top-4 left-4 z-20 flex items-center gap-2 text-xs font-semibold bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {t.live}
          </span>

          <div className="aspect-video flex items-center justify-center">
            <video
              src={videoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Hero Welcome Card */}
        <div className="relative overflow-hidden rounded-3xl gradient-hero-vibrant p-5 shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <h2 className="text-2xl font-bold text-white">{t.welcomeToBidBlast}</h2>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed">
              {t.bidblastDescription} 🎁
            </p>
          </div>
        </div>

        {/* Bid Types - Ultra Modern Cards */}
        <div className="space-y-4">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
              <Zap className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-800">{t.chooseGameMode}</h3>
            </div>
          </div>

          {/* Daily Bid */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 p-[2px] shadow-2xl shadow-indigo-500/40 active:scale-[0.97] transition-all cursor-pointer">
            <div className="relative bg-white rounded-[22px] p-5 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-60" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {t.dailyBid}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">⚡ {t.fastPacedAction}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-50" />
                    <span className="relative text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full shadow-lg">
                      🔥 {t.popular}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 border border-indigo-100">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-400/10 rounded-full blur-xl" />
                    <p className="text-3xl font-black bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent relative">4</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">{t.totalCycles}</p>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-100">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-400/10 rounded-full blur-xl" />
                    <p className="text-3xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent relative">6h</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">{t.perCycle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Bid */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 p-[2px] shadow-2xl shadow-purple-500/40 active:scale-[0.97] transition-all cursor-pointer">
            <div className="relative bg-white rounded-[22px] p-5 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/20 to-rose-400/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl blur-lg opacity-60" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl">
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {t.weeklyBid}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">🎯 {t.strategicGameplay}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50" />
                    <span className="relative text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full shadow-lg">
                      ⭐ {t.trending}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 border border-purple-100">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-400/10 rounded-full blur-xl" />
                    <p className="text-3xl font-black bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent relative">7</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">{t.totalCycles}</p>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-4 border border-pink-100">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-pink-400/10 rounded-full blur-xl" />
                    <p className="text-3xl font-black bg-gradient-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent relative">24h</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">{t.perCycle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Bid */}
          {/* <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 p-[2px] shadow-2xl shadow-orange-500/40 active:scale-[0.97] transition-all cursor-pointer">
            <div className="relative bg-white rounded-[22px] p-5 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-400/20 to-orange-400/20 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl blur-lg opacity-60" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-xl">
                        <Trophy className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                        Monthly Bid
                      </h4>
                      <p className="text-xs text-gray-500 font-medium">👑 Ultimate challenge</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full blur-md opacity-50" />
                    <span className="relative text-xs font-bold bg-gradient-to-r from-rose-600 to-orange-600 text-white px-3 py-1.5 rounded-full shadow-lg">
                      💎 Premium
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 p-4 border border-rose-100">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-400/10 rounded-full blur-xl" />
                    <p className="text-3xl font-black bg-gradient-to-br from-rose-600 to-orange-600 bg-clip-text text-transparent relative">30</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Total Cycles</p>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-4 border border-orange-100">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-orange-400/10 rounded-full blur-xl" />
                    <p className="text-3xl font-black bg-gradient-to-br from-orange-600 to-amber-600 bg-clip-text text-transparent relative">30d</p>
                    <p className="text-xs text-gray-600 font-semibold mt-1">Duration</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mt-6">
          {/* What are Cycles */}
          <div className="rounded-2xl bg-white p-5 shadow-lg border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {t.whatAreCycles}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t.cyclesDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-5 shadow-lg border border-green-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">✨</span>
              {t.whyYouLoveIt}
            </h3>

            <div className="space-y-3">
              {[
                { text: t.multipleChances, icon: "🎯" },
                { text: t.joinAnyCycle, icon: "⏰" },
                { text: t.playYourPace, icon: "🎮" },
                { text: t.independentCycles, icon: "🔓" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Finale */}
          <div className="rounded-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6 shadow-lg border border-orange-100">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-bold text-gray-800">
                {t.winBigPrizes} 🎉
              </h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {t.prizeDescription}
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-orange-200">
              <p className="text-sm font-semibold text-orange-800 text-center">
                🔥 {t.morePlayMoreChance}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Nav Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around">
        <button className="text-gray-400">🏠</button>
        <button className="text-gray-400">🎮</button>
        <button className="text-indigo-600">📋</button>
        <button className="text-gray-400">👤</button>
      </div>
    </div>

      <BottomNavBar />
    </div>
  );
}
