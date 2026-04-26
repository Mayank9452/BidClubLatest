import BidCard from "@/components/BidCard";
import VideoSection from "@/components/VideoSection";
import ActivitySlider from "@/components/ActivitySlider";
import Leaderboard from "@/components/Leaderboard";
import { BIDS_DATA, ACTIVITY_FEED, LEADERBOARD_DATA } from "@/utils/mockData";
import { TopBar } from "@/components/TopBar";
import { Flame, PlayCircle, Activity, Trophy, Gavel } from "lucide-react";
import { BottomNavBar } from "@/components/BottomNavBar";
import LeaderboardNew from "@/components/LeaderboardNew";
import BidCardDemo from "@/components/BidCardDemo";
import WinnerList from "@/components/WinnerList";
import TrendingGamesSlider from "@/components/TrendingGamesSlider";
import { useEffect, useState } from "react";
import LowBalancePopup from "@/components/LowBalancePopup";
import { useLanguage } from "@/components/context/LanguageContext";
import { fetchHomeData } from "@/features/home/homeSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import BidCardDemoNew from "@/components/BidCardDemoNew";
import { motion } from "framer-motion";
import BidCardDemoNewTest from "@/components/BidCardNewTest";
import BiddingHammer from "@/components/BiddingHammer";
const gradientBackground = [
  "gradient-casino",
  "gradient-dark",
  "gradient-purple",
  "gradient-green-dark",
  "gradient-pink-dark",
  "gradient-blue",
];
export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const { data: response, status } = useAppSelector((state) => state.home);

  // useEffect(() => {
  //   dispatch(fetchHomeData(1));
  // }, [dispatch]);

  // if (status === "loading") {
  //   return <div className="text-center py-10">Loading...</div>;
  // }
  console.log(response);

  return (
    <>
      <TopBar />
      <div className="mobile-container py-1  space-y-2">

        <section>
          <WinnerList lastWeeklyWinners={response?.data?.lastWeeklyWinners} />
        </section>

        {/* LIVE AUCTIONS */}
        <section
          className="
  rounded-3xl
  p-2 pt-0
  "
          style={{ opacity: 1, transform: "none" }}
        >
          {/* <h2 className="text-xl text-center font-extrabold text-gradient-casino mb-4">
            🔥 Live Auctions
          </h2> */}

          <div className="rounded-xl relative gradient-home-section pt-4 pb-16 px-3 overflow-hidden mb-4 ">
            {/* <h2 className="flex items-center justify-center gap-2 text-xl font-extrabold text-white">
              <Flame className="h-5 w-5 text-white" />
              
              Live Bidding
            </h2> */}
            <h2 className="flex items-center justify-center gap-4 text-xl font-extrabold text-white mb-2">
              <div className="flex-shrink-0 -mt-2">
                <BiddingHammer className="w-12 h-12" />
              </div>
              <span className="text-xl tracking-[1px]">{t.liveBidding || "Live Bidding"}</span>
            </h2>
            <p className="text-center text-white/90 text-xs font-semibold tracking-[1px]">
              {t.liveBidDescription || "Play now and win Atom Rewards"}
            </p>
          </div>

          {/* Glass Container */}
          <div className="-mt-[4.5rem]">
            <div className="border border-white/20 rounded-2xl shadow-2xl">
              <BidCardDemoNew />
            </div>
          </div>
        </section>

        {/* HERO VIDEO */}
        <section
          className="
  rounded-3xl
  p-2 pt-0
"
          style={{ opacity: 1, transform: "none" }}
        >
          {/* <h2 className="text-xl text-center font-extrabold text-gradient-casino mb-4">
            <PlayCircle className="h-5 w-5 text-primary" />
            ⚡ How to Play
          </h2> */}
          <div className="rounded-xl relative gradient-home-section pt-4 pb-16 px-3 overflow-hidden mb-4 ">
            <h2 className="flex items-center justify-center gap-2 text-xl font-extrabold text-white">
              <PlayCircle className="h-5 w-5 text-white" />
              {t.howToPlay}
            </h2>
            <p className="mt-1 text-center text-white/90 text-xs font-semibold tracking-[1px]">
              {t.howToPlayDescription || "Get started with our easy-to-follow guide!"}
            </p>
          </div>

          <VideoSection />
        </section>

        {/* ACTIVITY */}
        <section
          className="
  rounded-3xl
  p-2
  "
          style={{ opacity: 1, transform: "none" }}
        >
          {/* <h2 className="text-lg font-bold text-gradient-gold mb-3">
          ⚡ Live Activity
        </h2> */}

          {/* <h2 className="text-xl text-center font-extrabold text-gradient-casino mb-4">
            ⚡ Live Activity
          </h2> */}
          <div className="rounded-xl relative gradient-home-section pt-4 pb-16 px-3 overflow-hidden mb-4 ">
            <h2 className="flex items-center justify-center gap-2 text-xl font-extrabold text-white">
              <Activity className="h-5 w-5 text-white" />
              {t.liveActivity}
            </h2>
            <p className="mt-1 text-center text-white/90 text-xs font-semibold tracking-[1px]">
              {t.liveActivityDescription || "See what other players are up to in real-time!"}
            </p>
          </div>

          <ActivitySlider
            activities={ACTIVITY_FEED}
            updatedData={response?.data?.latest_joined_users}
          />
        </section>

        {/* LEADERBOARD */}
        <section
          className="
  rounded-3xl
  p-2
  "
          style={{ opacity: 1, transform: "none" }}
        >
          {/* <h2 className="text-xl text-center font-extrabold text-gradient-casino mb-4">
            ⚡ Leaderboard
          </h2> */}
          <div className="rounded-xl relative gradient-home-section pt-4 pb-16 px-3 overflow-hidden mb-4 ">
            <h2 className="flex items-center justify-center gap-2 text-xl font-extrabold text-white tracking-[1px]">
              <Trophy className="h-5 w-5 text-white" />
              {t.leaderboard}
            </h2>
            <p className="mt-1 text-center text-white/90 text-xs font-semibold tracking-[1px]">
              {t.top5Rankings || "Top 5 Players and their rankings"}
            </p>
          </div>

          <LeaderboardNew
            weeklyUsers={response?.data?.weeklyLeaderBoardUsers}
            monthlyUsers={response?.data?.monthlyLeaderBoardUsers}
          />
        </section>

        <section>
          <TrendingGamesSlider />
        </section>
      </div>
      {/* The Popup Component */}
      {/* <LowBalancePopup
        visible={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=winner4" // Optional
      /> */}
      <BottomNavBar />
    </>
  );
}
