import { lazy } from "react";

const ModernBiddingPage = lazy(() => import("@/components/BiddingPage"));
const DetailsPage = lazy(() => import("@/components/DetailsPage"));
const GamesPage = lazy(() => import("@/components/GamesPage"));
const LeaderboardPageNew = lazy(() => import("@/components/LeaderboardPageNew"));
const NotificationPage = lazy(() => import("@/components/NotificationPage"));
const PlayGamesUpdatedNew = lazy(() => import("@/components/PlayGamesUpdatedNew"));
const ProfilePage = lazy(() => import("@/components/ProfilePage"));
const TermsOfUsePage = lazy(() => import("@/components/TermsOfUsePage"));
const HomePage = lazy(() => import("@/pages/HomePage"));

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
    element: <TermsOfUsePage />,
  },
];

export { routes };
