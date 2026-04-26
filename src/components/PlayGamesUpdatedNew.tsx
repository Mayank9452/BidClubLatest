// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { TopBar } from "@/components/TopBar";
// import { BottomNavBar } from "@/components/BottomNavBar";
// import {
//   RotateCcw,
//   Gamepad,
//   Dices,
//   LoaderPinwheelIcon,
//   Gamepad2,
//   Coins,
//   Timer,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { fetchCategoryWiseGamesData } from "@/features/categoryWiseGames/categoryWiseGamesSlice";
// import { logout } from "@/features/auth/authSlice";
// import { fetchPlayGamesData } from "@/features/playGames/playGamesSlice";
// import socket from "@/utils/socket";
// import Swal from "sweetalert2";
// import { fetchDashboardData } from "@/features/dashboard/dashboardSlice";
// import {
//   fetchStartOtherGames,
//   fetchStopOtherGames,
// } from "@/features/otherGames/otherGamesSlice";
// import { Button } from "@/components/ui/button";

// const PlayGamesUpdatedNew = () => {
//   const navigate = useNavigate();
//   const { language } = useAppSelector((state) => state?.config);
//   const dispatch = useAppDispatch();
//   const { game, category } = useParams();
//   // console.log(game);
//   // console.log(category);
//   const rawGames = useAppSelector((state) => state?.playGames);
//   const rawDashboard = useAppSelector((state) => state?.dashboard);
//   const games = rawGames?.data?.data ?? [];
//   const [isOpen, setIsOpen] = useState(true);
//   const dashboard = rawDashboard?.data?.data;
//   const otherGamesRef = useRef<any>(null);
//   const [defaultValue, setDefaultValue] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const [popupShown, setPopupShown] = useState(false);
//   const auth = useAppSelector((state) => state?.auth);
//   const [showTimeLimitPopup, setShowTimeLimitPopup] = useState(false);
//   const [timeLimitMessage, setTimeLimitMessage] = useState("");

//   useEffect(() => {
//     if (game) {
//       fetchData();
//     } else {
//       navigate(`/`);
//     }
//     return () => {
//       // console.log("::Page leaves::");
//       stopPlaying(); // 👈 when navigating away
//     };
//   }, [game]);

//   useEffect(() => {
//     if (defaultValue) {
//       startCountdown();
//     }
//   }, [defaultValue]);

//   const fetchData = async () => {
//     await dispatch(fetchPlayGamesData(game) as any).then((res: any) => {
//       if (res?.payload?.code === 401) {
//         dispatch(logout());
//       }
//       if (res?.payload?.code === 500) {
//         navigate(`/`);
//       }
//     });
//     // await fetchDashboardAPI();
//     // await dispatch(fetchStartOtherGames({})).then((res: any) => {
//     //   if (res?.payload?.session) {
//     //     otherGamesRef.current = res?.payload?.session;
//     //   }
//     //   setIsPlaying(true);
//     // });
//   };

// //   const fetchDashboardAPI = async () => {
// //     await dispatch(fetchDashboardData() as any).then((res: any) => {
// //       if (res?.payload?.code === 401) {
// //         dispatch(logout());
// //       }
// //       // ⭐ NEW: unlimited user logic
// //       if (res?.payload?.data?.otherGames?.unlimited) {
// //         setDefaultValue(null); // remove timer
// //         stopCountdown(); // ensure no leftover interval
// //         return; // skip the timer checks
// //       }
// //       if (res?.payload?.data?.otherGames?.remaining == 0) {
// //         callBackGame({ message: "Time limit reached. Come back after 24h." });
// //       }
// //       if (res?.payload?.data?.otherGames) {
// //         setDefaultValue(res?.payload?.data?.otherGames?.remaining);
// //       }
// //     });
// //   };


// //   const callBackGame = ({ message = "" }) => {
// //     if (popupShown) return;
// //     console.log(showTimeLimitPopup);
// //     console.log(popupShown);
// //     setPopupShown(true);
// //     setTimeLimitMessage(message);
// //     setShowTimeLimitPopup(true);

// //     stopPlaying(); // stop game session immediately
// //   };

// //   useEffect(() => {
// //     const handler = async (data: any) => {
// //       // console.log("🔥 RECEIVED SOCKET EVENT:", data);
// //       await fetchDashboardAPI();
// //     };

// //     socket.on("otherGames:timerOver", handler);

// //     return () => {
// //       socket.off("otherGames:timerOver", handler); // cleanup
// //     };
// //   }, []);

//   const stopPlaying = async () => {
//     if (otherGamesRef.current?.id && dashboard?.otherGames?.remaining !== 0) {
//       await dispatch(
//         fetchStopOtherGames({ sessionId: otherGamesRef.current.id }) as any,
//       ).then((res: any) => {
//         if (res?.payload?.code === 401) {
//           dispatch(logout());
//         }
//       });
//       // await fetchDashboardAPI();
//       stopCountdown();
//       setIsPlaying(false);
//     }
//   };

//   // 👇 stop game if tab is closed/refreshed
//   useEffect(() => {
//     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//       stopPlaying();
//       e.preventDefault();
//       e.returnValue = "";
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   // 👉 start countdown
//   const startCountdown = () => {
//     console.log(defaultValue);
//     if (defaultValue === null) return; // ⭐ unlimited → no countdown
//     if (intervalRef.current) return; // already running

//     intervalRef.current = setInterval(() => {
//       setDefaultValue((prev) => {
//         if (prev <= 1) {
//           clearInterval(intervalRef.current!);
//           intervalRef.current = null;
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   // 👉 stop countdown
//   const stopCountdown = () => {
//     if (defaultValue === null) return; // ⭐ unlimited → no countdown
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div>
//       {/* <TopBar /> */}

//       <main className="min-h-screen relative">
//         {rawDashboard?.status == "succeeded" && defaultValue !== null && (
//           <motion.div
//             initial={{ opacity: 0, scaleY: 0 }}
//             animate={{ opacity: 1, scaleY: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//           >
//             <Button
//               variant="outline"
//               size="sm"
//               className={`absolute top-5 end-5 border-primary/20 bg-card/50 dark:bg-card/10 backdrop-blur-sm hover:bg-card/10 hover:dark:bg-card/20 transition-smooth gap-0 ${defaultValue < 11 ? "border-red-500/20 " : ""}`}
//             >
//               <Timer
//                 className={`h-4 w-4 mr-2 text-primary duration-1000 ${defaultValue < 11 ? "text-red-500 animate-pulse" : ""}`}
//               />
//               <span
//                 className={`font-bold text-primary duration-1000 ${defaultValue < 11 ? "text-red-500 animate-pulse" : ""}`}
//               >
//                 {defaultValue ?? 0}
//               </span>
//             </Button>
//           </motion.div>
//         )}

//         <div>
//           {/* <div className="space-y-6"> */}
//           {/* Games Grid */}
//           <main className="min-h-[100dvh] relative">
//             <div className="flex items-center justify-center">
//               {games?.game_play_link &&
//                 dashboard?.otherGames?.remaining !== 0 && (
//                   <div
//                     className={`w-full transition-all duration-300 ${
//                       isOpen ? "h-[100dvh]" : "h-[calc(100dvh-80px)]"
//                     }`}
//                   >
//                     <iframe
//                       src={games.game_play_link ?? ""}
//                       className="w-full h-full border-0"
//                       allowFullScreen
//                     />
//                   </div>
//                 )}
//             </div>
//           </main>
//         </div>
//       </main>

//       {showTimeLimitPopup && (
//         <PopupBannerTimeLimit
//           isShow={showTimeLimitPopup}
//           onClose={() => {
//             setShowTimeLimitPopup(false);
//             navigate("/dashboard");
//           }}
//           data={{
//             title:
//               language === "my"
//                 ? "ကန့်သတ်ချိန်ရောက်ပြီ။"
//                 : "Time limit reached",
//             description:
//               language === "my"
//                 ? "ကန့်သတ်ချိန်ရောက်ပြီ။ ၂၄ နာရီနောက်မှ ပြန်လာပါ။"
//                 : "Time limit reached. Come back after 24h.",
//             image: true,
//             autoCloseTimer: 0, // no auto-close, user must acknowledge
//           }}
//         />
//       )}

//       <BottomNavBar isToggle={true} isOpen={isOpen} setIsOpen={setIsOpen} />
//     </div>
//   );
// };

// export default PlayGamesUpdatedNew;


"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchPlayGamesData } from "@/features/playGames/playGamesSlice";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { BottomNavBar } from "./BottomNavBar";

const PlayGamesUpdatedNew = () => {
  const navigate = useNavigate();
  const { game_id } = useParams();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const rawGames = useAppSelector((state) => state?.playGames);
  const [loading, setLoading] = useState(true);

  // ✅ correct path
  const gameLink = rawGames?.data?.data?.gameLink;

  // ================= FETCH GAME =================
  useEffect(() => {
    if (!game_id) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res: any = await dispatch(fetchPlayGamesData(game_id) as any);

        if (res?.payload?.code === 401) {
          dispatch(logout());
          return;
        }
      } catch (err) {
        console.error("Game fetch error:", err);
      } finally {
        setLoading(false); // ✅ always runs
      }
    };

    fetchData();
  }, [game_id, dispatch, navigate]);

  // ================= FALLBACK =================
  const openInNewTab = () => {
    if (gameLink) {
      window.open(gameLink, "_blank");
    }
  };

  // ================= UI =================
  return (
    <>
      <div className="w-full h-[100dvh] bg-black flex items-center justify-center">
        {loading ? (
          <div className="text-white text-lg">Loading game...</div>
        ) : gameLink ? (
          <iframe
            src={gameLink}
            className="w-full h-full border-0"
            allowFullScreen
          />
        ) : (
          <div className="text-center text-white space-y-4">
            <p>Game cannot be loaded</p>
            <Button onClick={openInNewTab}>Open Game</Button>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <BottomNavBar isToggle={true} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default PlayGamesUpdatedNew;