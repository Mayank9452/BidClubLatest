import React, { useEffect, useState, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

import ScrollToTop from "./components/ScrollToTop";
import { routes } from "./routes/routes";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchHomeData } from "./features/home/homeSlice";
import { checkAuthByIPThunk, checkAuthByUserIdThunk, logout, setAuthData } from "./features/auth/authSlice";
import PopupBannerUpdated from "./components/PopupBannerUpdated";
import PopupBannerWifiVPN from "./components/PopupBannerWifiVPN";
import AuctionLoader from "./components/Loader";

const queryClient = new QueryClient();

const AppUpdated: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [appReady, setAppReady] = useState(false);
  const [showWifiVPNPopup, setShowWifiVPNPopup] = useState(false);
  const [isWifiUser, setIsWifiUser] = useState(() => {
    const url = new URL(window.location.href);
    const hasWifiParam = url.pathname.includes("wifiUser") || url.searchParams.get("wifiUser") !== null || url.search.includes("wifiUser");
    if (hasWifiParam) {
      sessionStorage.setItem("wifi_user", "true");
      return true;
    }
    return sessionStorage.getItem("wifi_user") === "true";
  });

  // ✅ Capture testId ONLY once (same like your other portal)
  const [initialTestId] = useState(() => {
    const url = new URL(window.location.href);
    const urlTestId = url.searchParams.get("testId");
    if (urlTestId) {
      sessionStorage.setItem("testId", urlTestId);
      return urlTestId;
    }
    return sessionStorage.getItem("testId");
  });

  const fetchData = async () => {
    setAppReady(false);
    const res = await dispatch(fetchHomeData() as any);
    if (res?.payload?.code === 401) {
      dispatch(logout());
      return;
    }
    setAppReady(true);
  };

  // ✅ Auth Init (IP check & Direct testId Auth)
  useEffect(() => {
    const init = async () => {
      try {
        let authResult = null;
        if (isWifiUser) {
          authResult = await dispatch(checkAuthByUserIdThunk("1") as any);
          setShowWifiVPNPopup(true);
        } else if (initialTestId) {
          let decodedId = "1";
          try {
            decodedId = atob(initialTestId);
          } catch (e) {
            console.error("Failed to decode testId base64", e);
          }
          authResult = await dispatch(checkAuthByUserIdThunk(decodedId) as any);
        } else {
          authResult = await dispatch(checkAuthByIPThunk() as any);
        }

        if (authResult?.payload?.data?.authToken) {
          await fetchData();
        } else {
          dispatch(logout());
        }
      } catch (err) {
        console.error("❌ Auth init failed:", err);
        dispatch(logout());
      }
    };

    init();
  }, [isWifiUser, initialTestId]);

  // ✅ Global click listener for Wifi users to block interactions
  useEffect(() => {
    if (!isWifiUser) return;

    const handleGlobalClick = (e: MouseEvent) => {
      if (!showWifiVPNPopup) {
        e.stopPropagation();
        e.preventDefault();
        setShowWifiVPNPopup(true);
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, [isWifiUser, showWifiVPNPopup]);

  // ✅ Clean URL after success
  useEffect(() => {
    if (auth?.data?.token && initialTestId) {
      window.history.replaceState({}, "", "/");
    } else if (isWifiUser && (window.location.pathname.includes("wifiUser") || window.location.search.includes("wifiUser"))) {
      window.history.replaceState({}, "", "/");
    }
  }, [auth?.data?.token, initialTestId, isWifiUser]);

  // ✅ Popup logic
  useEffect(() => {
    if (auth?.data?.token) {
      const popupShown = sessionStorage.getItem("popupShown");
      if (!popupShown) {
        sessionStorage.setItem("popupShown", "true");
      }
    }
  }, [auth?.data?.token]);

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

          <div className="mobile-container overflow-hidden">
            <BrowserRouter>
              <ScrollToTop />

              {auth?.data?.token && <PopupBannerUpdated />}

              <PopupBannerWifiVPN
                isShow={showWifiVPNPopup}
                onClose={() => setShowWifiVPNPopup(false)}
              />

              <Suspense fallback={<AuctionLoader />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      auth?.data?.token ? (
                        appReady ? (
                          <Navigate to="/dashboard" replace />
                        ) : (
                          <AuctionLoader />
                        )
                      ) : (
                        <AuctionLoader />
                      )
                    }
                  />

                  <Route
                    path="/wifiUser"
                    element={
                      auth?.data?.token ? (
                        appReady ? (
                          <Navigate to="/dashboard" replace />
                        ) : (
                          <AuctionLoader />
                        )
                      ) : (
                        <AuctionLoader />
                      )
                    }
                  />

                  {auth?.data?.token &&
                    routes.map((item, index) => (
                      <Route
                        key={index}
                        path={item.path}
                        element={item.element}
                      />
                    ))}

                  <Route path="*" element={<AuctionLoader />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppUpdated;
