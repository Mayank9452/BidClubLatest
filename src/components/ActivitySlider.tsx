import React, { useMemo } from "react";
import { Zap } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import { Activity } from "@/types";

const maskMSISDN = (phone: string) => {
  if (!phone || phone.length < 12) return phone;
  const trimmed = phone.slice(2);
  if (trimmed.length !== 10) return phone;
  const start = trimmed.slice(0, 3);
  const end = trimmed.slice(-3);
  return `${start}xxxx${end}`;
};

const ActivityItem = React.memo(({ activity, gradientClass, t }: { activity: any; gradientClass: string; t: any }) => (
  <div
    className={`relative w-[260px] flex-shrink-0 rounded-2xl p-3 shadow-lg border border-white/20 overflow-hidden bg-gradient-to-br ${gradientClass} active:scale-95 transition-transform`}
  >
    <Zap className="absolute -right-2 -bottom-2 w-16 h-16 text-white/10 -rotate-12" />
    <div className="relative z-10 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm p-0.5 border-2 border-white/30 shadow-lg">
              <div className="w-full h-full rounded-lg overflow-hidden bg-white">
                <img
                  src={`/assets/users/${activity.avatar}`}
                  alt="User avatar"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="w-[130px] flex flex-col items-start justify-center overflow-hidden">
            <h3 className="text-xs font-bold text-white leading-tight whitespace-normal break-words w-full">
              {activity.user_phone}
            </h3>
            <p className="text-xs font-semibold text-white/90  italic whitespace-normal break-words w-full mt-0.5">
              {activity.newMessage}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-bold text-white/70 tracking--[0.5px]">
            {t.live}
          </span>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
  </div>
));

interface ActivitySliderProps {
  activities: Activity[];
}


export default function ActivitySlider({ updatedData }) {
  const { t } = useLanguage();

  const activityList = useMemo(() => {
    if (!Array.isArray(updatedData)) return [];

    return updatedData.map((item: any, index: number) => {
      const avatarIndex = (Number(item.user_id || index) % 15) + 1;
      const isPlacedBid = (Number(item.user_id || index) % 2 === 0);

      return {
        id: index + 1,
        user_phone: maskMSISDN(item.user_phone),
        newMessage: isPlacedBid ? t.placedBid : t.playerWonBid,
        avatar: `${avatarIndex}.png`,
      };
    });
  }, [updatedData, t]);

  const gradientStyles = [
    "from-indigo-600 to-purple-600",
    "from-emerald-500 to-blue-600",
    "from-rose-500 to-orange-500",
    "from-violet-600 to-pink-500",
  ];

  const extendedList = useMemo(() => [...activityList, ...activityList], [activityList]);

  return (
    <div className="relative w-full overflow-hidden py-2 -mt-[4.5rem]">
      <div className="flex gap-4 animate-[slide-right_30s_linear_infinite] whitespace-nowrap px-4 w-max">
        {extendedList.map((activity, index) => (
          <ActivityItem
            key={`${activity.id}-${index}`}
            activity={activity}
            gradientClass={gradientStyles[index % gradientStyles.length]}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
