import BiddingPageLatest from "@/components/BiddingPageLatest";
import { lazy } from "react";
import { useAppSelector } from "@/app/hooks";

const BiddingPage = lazy(() => import("@/components/BiddingPage"));
const DetailsPage = lazy(() => import("@/components/DetailsPage"));
const GamesPage = lazy(() => import("@/components/GamesPage"));
const LeaderboardPageNew = lazy(() => import("@/components/LeaderboardPageNew"));
const NotificationPage = lazy(() => import("@/components/NotificationPage"));
const PlayGamesUpdatedNew = lazy(() => import("@/components/PlayGamesUpdatedNew"));
const ProfilePage = lazy(() => import("@/components/ProfilePage"));
const TermsOfUsePage = lazy(() => import("@/components/TermsOfUsePage"));
const HomePage = lazy(() => import("@/pages/HomePage"));

const SPECIFIC_USER_PHONE = "959729081679";

const UserSpecificRoute = ({
  latest: LatestComponent,
  original: OriginalComponent,
}: {
  latest: React.ComponentType;
  original: React.ComponentType;
}) => {
  const { data: homeData } = useAppSelector((state) => state.home);
  const userPhone = homeData?.data?.userInfo?.user_phone;

  if (userPhone === SPECIFIC_USER_PHONE) {
    return <LatestComponent />;
  }
  return <OriginalComponent />;
};

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
  // {
  //   path: "/biddingPage",
  //   element: <UserSpecificRoute latest={BiddingPageLatest} original={BiddingPage} />,
  // },
  {
    path: "/biddingPage",
    element: <BiddingPageLatest />,
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

