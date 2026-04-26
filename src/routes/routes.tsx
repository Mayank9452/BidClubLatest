import ModernBiddingPage from "@/components/BiddingPage";
import BiddingPageLatest from "@/components/BiddingPageLatest";
import BiddingPageNew from "@/components/BiddingPageNew";
import DetailsPage from "@/components/DetailsPage";
import GamesPage from "@/components/GamesPage";
import LeaderboardPageNew from "@/components/LeaderboardPageNew";
import NotificationPage from "@/components/NotificationPage";
import PlayGamesUpdatedNew from "@/components/PlayGamesUpdatedNew";
import ProfilePage from "@/components/ProfilePage";
import TermsOfUsePage from "@/components/TermsOfUsePage";
import HomePage from "@/pages/HomePage";


const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <HomePage /> },
  {
    path: "/games/:game_id",
    element: <PlayGamesUpdatedNew />,
  },

  {
    path: "/details",
    element: <DetailsPage />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPageNew />,
  },
  {
    path: "/notification",
    element: <NotificationPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/biddingPage",
    element: <ModernBiddingPage />,
  },
  {
    path: "/games",
    element: <GamesPage />,
  },
  {
    path: "/terms",
    element: <TermsOfUsePage />
  }
  // { path: "/dashboard", element: <Index /> },
  // { path: "/games", element: <Games /> },
  // { path: "/games/:category", element: <CategoryWiseGames /> },
  // { path: "/games/:category/:game", element: <PlayGamesUpdated /> },
  // { path: "/rewards", element: <Rewards /> },
  // { path: "/profile", element: <Profile /> },
  // { path: "/update-profile", element: <UpdateProfile /> },

  // { path: "/spin", element: <SpinWheel /> },
  // { path: "/spinner", element: <SpinWheel /> },
  // { path: "/spinner/:handle", element: <SpinWheelUpdated /> },
  // { path: "/prospinner/:handle", element: <JackpotSpinWheel /> },

  // { path: "/triple777", element: <Triple777 /> },
  // { path: "/slot", element: <Triple777 /> },
  // { path: "/slot/:handle", element: <Triple777 /> },

  // { path: "/dice", element: <RollDice /> },
  // { path: "/dice/:handle", element: <RollDice /> },

  // { path: "/jackpot", element: <SpinJackpot /> },

];

export { routes };
