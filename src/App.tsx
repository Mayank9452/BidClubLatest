// ==================== src/App.tsx ====================
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MyBidsPage from "./pages/MyBidsPage";
import LeaderboardPage from "./pages/LeaderboardPage";

import ScrollToTop from "./components/ScrollToTop";
import { routes } from "./routes/routes";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchHomeData } from "./features/home/homeSlice";
import PopupBannerUpdated from "./components/PopupBannerUpdated";
import AuctionLoader from "./components/Loader";
import WaitLoader from "./components/Loader";
const queryClient = new QueryClient();
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((state) => state.home);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchHomeData(1));
  }, []);

  // ✅ When API succeeds → get token
  useEffect(() => {
    const token = sessionStorage.getItem("auth"); // or your storage.auth

    if (status === "success" && data?.data?.authToken) {
      setAuthToken(token);

      const popupShown = sessionStorage.getItem("popupShown");

      if (!popupShown) {
        setShowPopup(true);
        sessionStorage.setItem("popupShown", "true");
      }
    }
  }, [status, data]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange={false}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="mobile-container sm:border-r sm:border-l overflow-hidden">
            <BrowserRouter>
              <ScrollToTop />
              {authToken && <PopupBannerUpdated />}
              <Routes>
                {/* <Route path="/" element={authToken?.data?.token ? <Navigate to="/dashboard" replace /> : <AuctionLoader  />} />
                {
                  (authToken?.data?.token) && routes.map((item, index) => (
                    <Route path={item?.path} key={index} element={item?.element} />
                  ))
                }
                <Route path="*" element={authToken?.data?.token ? <AuctionLoader  /> : <AuctionLoader  />} /> */}
                {/* {routes.map((item, index) => (
                  <Route
                    path={item?.path}
                    key={index}
                    element={item?.element}
                  />
                ))} */}

                <Route path="/" element={authToken ? <Navigate to="/dashboard" replace /> : <AuctionLoader />} />
                {
                  (authToken) && routes.map((item, index) => (
                    <Route path={item?.path} key={index} element={item?.element} />
                  ))
                }
                <Route path="*" element={authToken ? <AuctionLoader /> : <AuctionLoader />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
