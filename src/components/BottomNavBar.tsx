// "use client"

// import { Home, Gamepad2, Gift, User, LoaderPinwheelIcon, ChevronUp, ChevronLeft, Cat } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { useLocation, useNavigate, useParams } from "react-router-dom"
// // import { useAppSelector } from "@/app/hooks"
// import { motion } from "framer-motion"
// import { AnimatePresence } from "framer-motion"

// type BottomNavBarProps = {
//   isOpen?: boolean;
//   isToggle?: boolean;
//   setIsOpen?: (open: boolean) => void;
// };

// export function BottomNavBar({isOpen= false, isToggle=false, setIsOpen}: BottomNavBarProps) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   // const dashboard = useAppSelector((state) => state?.dashboard);
//   // const dashGames = dashboard?.data?.data?.games;
//   // const { language } = useAppSelector((state)=>state?.config);
//   const { language } = {language: "en"};

//   const navItems = [
//     { id: "home", label: language == "my" ? "ပင်မ" : "Home", icon: Home, path: ["/","/dashboard"] },
//     { id: "games", label: language == "my" ? "ဂိမ်း" : "Games", icon: Gamepad2, path: ["/games"] },
//     // { 
//     //   id: "spin", 
//     //   label: language == "my" ? "လှည့်မယ်" : "Spin", 
//     //   icon: LoaderPinwheelIcon, 
//     //   path: dashGames?.spinners?.length > 0 ? dashGames.spinners.map((item:any)=>`/spinner/${item?.handle}`) : ["/"], 
//     //   className: "gradient-casino-dark text-white animate-shadow-spin rounded-full h-[75px] w-[75px] sm:h-[82px] sm:w-[82px] m-0 px-0 py-0" 
//     // },
//     { id: "rewards", label: language == "my" ? "လက်ဆောင်" : "Rewards", icon: Cat, path: ["/rewards"] },
//     { id: "profile", label: language == "my" ? "ပရိုဖိုင်" : "Profile", icon: User, path: ["/profile"] },
//   ]

//   return (
//     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] z-50 grid">

//       {
//         isToggle &&
//         <div className="flex justify-between">
//           <button className="glass-card-light w-16 text-xs px-2 py-1 gap-1 pt-2 shadow shadow-white flex justify-center items-center rounded-t-md" style={{border: "none"}} onClick={()=>{navigate(`/dashboard`)}}>
//             <ChevronLeft className="h-4 w-4" />
//             Back
//           </button>
//           <button className="glass-card-light w-12 shadow shadow-white flex justify-center items-center rounded-t-md" style={{border: "none"}} onClick={()=>{setIsOpen(!isOpen)}}>
//             {<ChevronUp className={`transform duration-400 transition-all ${isOpen?"":"rotate-180"}`}/>}
//           </button>
//         </div>
//       }

//       <AnimatePresence>
//         {
//         !isOpen &&
//           <motion.div 
//             initial={{ opacity: 0, height: "0px", paddingTop: "0px", paddingBottom: "0px" }}
//             animate={{ opacity: 1, height: "auto", paddingTop: "8px", paddingBottom: "8px" }}
//             exit={{ opacity: 0, height: "0px", paddingTop: "0px", paddingBottom: "0px"  }}
//             transition={{ duration: isToggle?0.5:0 }}
//             className={`relative px-2 sm:px-5 ${isToggle?"":"rounded-t-md pb-1 sm:pb-2 pt-2 sm:pt-3"}`} 
//             // style={{border: "none", borderTop: `${isToggle? "0px" : "1px"} solid hsl(240 6% 20%)`}}
//           >
//             <div 
//               className={`absolute w-full start-0 bottom-0 h-[calc(100%-15px)] sm:h-[calc(100%-20px)] bg-white -z-[99] glass-card-light px-4 ${isToggle?"":"rounded-t-md border-primary/20 pb-1 sm:pb-2 pt-2 sm:pt-3"}`}
//               style={{border: "none", borderTop: `${isToggle? "0px" : "1px"} solid hsl(240 6% 20%)`}}
//              />
//             <div className="flex justify-around items-end">
//               {navItems.map((item) => {
//                 const Icon = item.icon
//                 const isActive = item.path.find((state: any)=>state == location.pathname);

//                 return (
//                   <Button
//                     key={item.id}
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {navigate(item.path[0]);}}
//                     className={cn(
//                       `flex flex-col items-center gap-1 h-auto py-2 px-3 transition-smooth hover:bg-black/30 ${language == "my" ? "min-w-[3.75rem] sm:min-w-[4.75rem]" : ""}`,
//                       isActive && item?.className
//                       // ? "text-purple-500 bg-black/10 hover:text-purple-600"
//                       ? ""
//                         : isActive 
//                           ? "text-primary bg-black/10 hover:text-primary" 
//                           : "text-muted-foreground dark:text-gray-200 hover:text-foreground pb-3",
//                         item?.className
//                     )}
//                   >
//                     <Icon 
//                       size={item.id === "spin" ? 36 : 24} 
//                       className={` transition-smooth ${isActive ? "animate-bounce-in" : ""} ${item.id === "spin" ? "!h-6 !w-6" : "!h-4 !w-4"}`} 
//                     />
//                     <span className={`font-medium ${item?.className ? "text-md custom-sm-text-12" : "text-xs custom-sm-text-10"}`}>{item.label}</span>
//                     {(isActive && !item?.className) && (
//                       <div className="w-1 h-1 rounded-full bg-primary animate-glow-pulse" />
//                     )}
//                   </Button>
//                 )
//               })}
//             </div>
//           </motion.div>
//         }
//       </AnimatePresence>
//     </div>
//   )
// }

// "use client"

// import {
//   Home,
//   Gamepad2,
//   User,
//   ChevronUp,
//   ChevronLeft,
//   Cat,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { useLocation, useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"

// type BottomNavBarProps = {
//   isOpen?: boolean
//   isToggle?: boolean
//   setIsOpen?: (open: boolean) => void
// }

// const NAVBAR_HEIGHT = 90 // px (safe for toggle + animation)

// export function BottomNavBar({
//   isOpen = false,
//   isToggle = false,
//   setIsOpen,
// }: BottomNavBarProps) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { language } = { language: "en" }

//   const navItems = [
//     { id: "home", label: language === "my" ? "ပင်မ" : "Home", icon: Home, path: ["/", "/dashboard"] },
//     { id: "games", label: language === "my" ? "ဂိမ်း" : "Games", icon: Gamepad2, path: ["/games"] },
//     { id: "rewards", label: language === "my" ? "လက်ဆောင်" : "Rewards", icon: Cat, path: ["/rewards"] },
//     { id: "profile", label: language === "my" ? "ပရိုဖိုင်" : "Profile", icon: User, path: ["/profile"] },
//   ]

//   return (
//     <>
//       {/* 🔹 Spacer to prevent Homepage content overlap */}
//       <div style={{ height: NAVBAR_HEIGHT }} />

//       {/* 🔹 Fixed Navbar */}
//       <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] z-50 grid">
//         {isToggle && (
//           <div className="flex justify-between">
//             <button
//               className="glass-card-light w-16 text-xs px-2 py-1 gap-1 pt-2 shadow shadow-white flex justify-center items-center rounded-t-md"
//               style={{ border: "none" }}
//               onClick={() => navigate(`/dashboard`)}
//             >
//               <ChevronLeft className="h-4 w-4" />
//               Back
//             </button>

//             <button
//               className="glass-card-light w-12 shadow shadow-white flex justify-center items-center rounded-t-md"
//               style={{ border: "none" }}
//               onClick={() => setIsOpen?.(!isOpen)}
//             >
//               <ChevronUp
//                 className={`transform transition-all duration-300 ${isOpen ? "" : "rotate-180"
//                   }`}
//               />
//             </button>
//           </div>
//         )}

//         <AnimatePresence>
//           {!isOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
//               animate={{ opacity: 1, height: "auto", paddingTop: 20, paddingBottom: 5 }}
//               exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
//               transition={{ duration: isToggle ? 0.5 : 0 }}
//               className={`relative px-2 sm:px-5 ${isToggle ? "" : "rounded-t-md pb-1 sm:pb-2 pt-2 sm:pt-3"
//                 }`}
//             >
//               <div
//                 className={`absolute w-full start-0 bottom-0 h-[calc(100%-15px)] sm:h-[calc(100%-20px)] bg-white -z-[99] glass-card-light px-4 ${isToggle ? "" : "rounded-t-md border-primary/20"
//                   }`}
//                 style={{
//                   border: "none",
//                   borderTop: `${isToggle ? "0px" : "1px"} solid hsl(240 6% 20%)`,
//                 }}
//               />

//               <div className="flex justify-around items-end">
//                 {navItems.map((item) => {
//                   const Icon = item.icon
//                   const isActive = item.path.includes(location.pathname)

//                   return (
//                     <Button
//                       key={item.id}
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => navigate(item.path[0])}
//                       className={cn(
//                         "flex flex-col items-center gap-1 h-auto py-2 px-3 transition-smooth hover:gradient-light/30 font-ex",
//                         isActive
//                           ? "gradient-light text-black [&_*]:text-black"
//                           : "text-white-foreground hover:text-foreground pb-3 font-extrabold"
//                       )}
//                     >
//                       <Icon
//                         size={24}
//                         className={`transition-smooth ${isActive ? "animate-bounce-in" : ""
//                           }`}
//                       />
//                       <span className="text-xs ">{item.label}</span>
//                       {isActive && <div className="w-1 h-1 rounded-full bg-primary animate-glow-pulse" />}
//                     </Button>
//                   )
//                 })}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </>
//   )
// }


"use client"

import {
  Home,
  Trophy,
  Bell,
  FileText,
  User,
  Gamepad2,
  ChevronUp,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./context/LanguageContext"

type BottomNavBarProps = {
  isOpen?: boolean
  isToggle?: boolean
  setIsOpen?: (open: boolean) => void
}

const NAVBAR_HEIGHT = 75 // px (safe for toggle + animation)

export function BottomNavBar({
  isOpen = false,
  isToggle = false,
  setIsOpen,
}: BottomNavBarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  // const { language } = { language: "en" }
  const { t } = useLanguage()

  // const navItems = [
  //   { id: "home", label: "Home", icon: Home, path: ["/", "/dashboard"] },
  //   //  { id: "games", label: "Games", icon: Gamepad2, path: ["/games"] },
  //   { id: "leaderboard", label: "Leaderboard", icon: Trophy, path: ["/leaderboard"] },
  //   { id: "notification", label: "Notification", icon: Bell, path: ["/notification"] },
  //   { id: "games", label: "Games", icon: Gamepad2, path: ["/games"] },
  //   // { id: "profile", label: "Profile", icon: User, path: ["/profile"] },
  // ]

  const navItems = [
    { id: "home", label: t.navbarHome, icon: Home, path: ["/dashboard", "/"] },
    { id: "leaderboard", label: t.navbarLeaderboard, icon: Trophy, path: ["/leaderboard"] },
    { id: "notification", label: t.navbarNotification, icon: Bell, path: ["/notification"] },
    { id: "games", label: t.navbarGames, icon: Gamepad2, path: ["/games"] },
  ]

  return (
    <>
      {/* 🔹 Spacer to prevent Homepage content overlap */}
      <div
        className="transition-all duration-300"
        style={{ height: isToggle ? (isOpen ? 45 : 125) : NAVBAR_HEIGHT }}
      />

      {/* 🔹 Fixed Navbar */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] z-50 grid">
        {isToggle && (
          <div className="flex justify-between">
            <button
              className="glass-card-light w-16 text-xs px-2 py-1 gap-1 pt-2 shadow shadow-white flex justify-center items-center rounded-t-md"
              style={{ border: "none" }}
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
              {t.navbarBack}
            </button>

            <button
              className="glass-card-light w-12 shadow shadow-white flex justify-center items-center rounded-t-md"
              style={{ border: "none" }}
              onClick={() => setIsOpen?.(!isOpen)}
            >
              <ChevronUp
                className={`transform transition-all duration-300 ${isOpen ? "" : "rotate-180"
                  }`}
              />
            </button>
          </div>
        )}

        <AnimatePresence>
          {!isOpen && (
            <div
              style={{ paddingTop: 20, paddingBottom: 5 }}
              className={`relative px-2 sm:px-5 ${isToggle ? "" : "rounded-t-md pb-1 sm:pb-2 pt-2 sm:pt-3"
                }`}
            >
              {/* <div
                className={`absolute w-full start-0 bottom-0 h-[calc(100%-15px)] sm:h-[calc(100%-20px)] bg-white -z-[99] bg-gradient-to-r from-pink-600 to-rose-600 px-4 ${isToggle ? "" : "rounded-t-md border-primary/20"
                  }`}
                style={{
                  border: "none",
                  borderTop: `${isToggle ? "0px" : "1px"} solid hsl(240 6% 20%)`,
                }}
              /> */}

              <div
                className={`absolute w-full start-0 bottom-0 h-[calc(100%-15px)] sm:h-[calc(100%-20px)] -z-[99] bg-deep-navy px-4 ${isToggle ? "" : "rounded-t-md border-primary/20"
                  }`}
                style={{
                  border: "none",
                  borderTop: `${isToggle ? "0px" : "1px"} solid hsl(240 6% 20%)`,
                }}
              />

              <div className="flex justify-around items-end">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = item.path.includes(location.pathname)

                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(item.path[0])}
                      className={cn(
                        "flex flex-col items-center gap-1 h-auto py-2 px-3 transition-smooth hover:gradient-light/30 font-ex",
                        isActive
                          ? "gradient-light text-black [&_*]:text-black"
                          : "text-white-foreground hover:text-foreground pb-3 font-semibold"
                      )}
                    >
                      <Icon
                        size={24}
                        className={`transition-smooth ${isActive ? "animate-bounce-in" : ""
                          }`}
                      />
                      <span className="text-xs ">{item.label}</span>
                      {isActive && <div className="w-1 h-1 rounded-full bg-primary animate-glow-pulse" />}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}