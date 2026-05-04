import React, { useEffect, useState, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

import ScrollToTop from "./components/ScrollToTop";
import { routes } from "./routes/routes";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchHomeData } from "./features/home/homeSlice";
import PopupBannerUpdated from "./components/PopupBannerUpdated";
import AuctionLoader from "./components/Loader";
import { storage } from "./config/config";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector((state) => state.home);
  const [authToken, setAuthToken] = useState<string | null>(() => sessionStorage.getItem(storage.auth));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const testId = params.get("testId");

    if (testId) {
      let id = 1;
      try {
        id = Number(atob(testId));
      } catch (e) {
        console.error("Failed to decode testId", e);
      }
      dispatch(fetchHomeData(id));
      navigate("/", { replace: true });
    } else if (!authToken && status === "idle") {
      dispatch(fetchHomeData(1));
    }
  }, [dispatch, location.search, navigate, authToken, status]);

  // Handle auth and initial popup logic
  useEffect(() => {
    if (status === "success" && data?.data?.authToken) {
      setAuthToken(data.data.authToken);

      const popupShown = sessionStorage.getItem("popupShown");
      if (!popupShown) {
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
            <ScrollToTop />
            {authToken && <PopupBannerUpdated />}
            <Suspense fallback={<AuctionLoader />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    authToken ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <AuctionLoader />
                    )
                  }
                />
                {authToken &&
                  routes.map((item, index) => (
                    <Route
                      path={item?.path}
                      key={index}
                      element={item?.element}
                    />
                  ))}
                <Route path="*" element={<AuctionLoader />} />
              </Routes>
            </Suspense>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
