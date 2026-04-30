import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Camera,
  Phone,
  FileText,
  LogOut,
  ChevronRight,
  Gavel,
  Trophy,
  Gem,
} from "lucide-react";
import { TopBar } from "./TopBar";
import { BottomNavBar } from "./BottomNavBar";
import { useLanguage } from "./context/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getProfileInfo } from "@/features/bidProfile/profileSlice";
import dayjs from "dayjs";
import PopupBannerUnsubscribe from "./PopupBannerUnsubscribe";
import PopupAvatarSelector from "./PopupAvatarSelector";
import { useNavigate } from "react-router-dom";
import { updateProfileImageThunk } from "@/features/profile/updateProfileSlice";

const formatDateTime = (dateTimeString) => {
  const d = dayjs(dateTimeString);

  return {
    date: d.format("D MMM YYYY").toUpperCase(),
    time: d.format("h:mm A"),
  };
};

const maskMSISDN = (phone: string) => {
  if (!phone || phone.length < 12) return phone;

  // Remove first 2 digits (country code like 95)
  const trimmed = phone.slice(2);

  // Ensure it's 10 digits after trimming
  if (trimmed.length !== 10) return phone;

  const start = trimmed.slice(0, 3);
  const end = trimmed.slice(-3);

  return `${start}xxxx${end}`;
};

export default function ProfilePage() {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const { t, language, changeLanguage } = useLanguage();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.profile);
  const user = data?.data?.userInfo || [];
  const [selectedAvatar, setSelectedAvatar] = useState<string>("1.png");
  const [showUnsubscribePopup, setShowUnsubscribePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      dispatch(getProfileInfo() as any);
    }
  }, [dispatch, data]);





  const handleSaveAvatar = async () => {
    try {
      const imgName = selectedAvatar.split(".")[0];
      await dispatch(updateProfileImageThunk({ profileImg: imgName })).unwrap();
      setIsEditingImage(false);
      // Refresh profile info to reflect the new avatar
      dispatch(getProfileInfo() as any);
    } catch (error) {
      console.error("Failed to update profile image:", error);
    }
  };

  const handleTermsClick = () => {
    console.log("Navigate to Terms of Use");
    navigate("/terms")
    // navigate("/terms");
  };

  const handleUnsubscribe = () => {
    console.log("Unsubscribe clicked");
    // Show confirmation dialog
    setShowUnsubscribePopup(true);
  };

  const confirmUnsubscribe = async () => {
    // const res = await dispatch(unsubscribeUserThunk());

    // if (res.payload?.status === "success") {
    //   dispatch(logout());

    //   window.location.href =
    //     is_freemium === 1 || is_freemium === 2
    //       ? "https://billing.atomspinzone.com/?AdNetwork=freemium&ClickID=&Publisher="
    //       : "https://billing.atomspinzone.com/";
    // }
    console.log("Hi");
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen  p-2">
        {/* <div className="h-[100vh] fixed w-full top-0 left-0 z-[-1] overflow-hidden">
          <img
            src="/assets/images/biddingPage.png"
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div> */}
        {/* Header Section */}
        <div className="relative gradient-home-section active:from-purple-700 active:to-rose-700 pt-6 pb-32 px-3 overflow-hidden rounded-2xl">
          {/* Animated Background */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-2xl" />

          <div className="relative z-10 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-[1px]">
                {t.myProfile}
              </h1>
            </div>

            <p className="text-center text-white/80 text-sm font-semibold tracking-[1px]">
              {t.manageAccount}
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative z-10 -mt-[7rem] px-3 max-w-md mx-auto">
          <div className="bg-white  rounded-2xl shadow-xl border border-gray-100/40 overflow-hidden">
            {/* Profile Image Section */}
            <div className="relative pt-2">
              <div className="flex flex-col items-center mx-2 p-2 bg-white rounded-xl">
                {/* Avatar with Edit Button */}
                <div className="relative ">
                  <motion.div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full p-1 shadow-xl">
                      <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img
                          src={`/assets/users/${selectedAvatar}`}
                          alt="Profile"
                          className="w-full h-full"
                        />
                      </div>
                    </div>

                    {/* Edit Button */}
                    <button
                      onClick={() => setIsEditingImage(true)}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </motion.div>
                </div>

                {/* Phone Number */}
                <div className="mt-4 flex p-1 items-center gap-2  bg-gradient-to-r from-[#d40862bf] to-[#4c4496d4] rounded-2xl shadow-xl shadow-violet-200/50 ">
                  {/* <Phone className="w-3.5 h-3.5 text-white animate-pulse" /> */}
                  <span className="text-sm rounded-xl font-bold text-white tracking-[1.5px] border-2 border-dashed border-white px-4 py-1.5">
                    {maskMSISDN(user?.user_phone) || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-3 p-4">
              <StatCard
                label={t.bids}
                value={data?.data?.userBidsCount || "0"}
                icon={<Gavel className="w-5 h-5 text-blue-600" />}
                color="blue"
              />
              <StatCard
                label={t.wins}
                value={data?.data?.userBidsWinCount || "0"}
                icon={<Trophy className="w-5 h-5 text-amber-500" />}
                color="gold"
              />
              <StatCard
                label={t.points}
                value={data?.data?.userPoints || "0"}
                icon={<Gem className="w-5 h-5 text-rose-500" />}
                color="rose"
              />
            </div>

            {/* Action Buttons */}
            <div className="p-4 pt-0 space-y-2">
              {/* Terms of Use */}
              <button
                onClick={handleTermsClick}
                className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-pink-50 to-rose-50 active:from-pink-100 active:to-rose-200 rounded-xl border border-pink-400 transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-gray-800">
                      {t.terms}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold tracking-[1px]">
                      {t.readPolicies}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Unsubscribe */}
              <button
                onClick={handleUnsubscribe}
                className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-gray-50 to-slate-50 active:from-gray-100 active:to-slate-100 rounded-xl border border-gray-400 transition-all duration-150 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-gray-800">
                      {t.unsubscribe}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold">
                      {t.leaveService}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Language Selector */}
              <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    🌐
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">
                      {t.language}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold">
                      {language === "en" ? t.english : t.burmese}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-2 py-1 rounded text-xs font-bold ${language === "en"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    EN
                  </button>

                  <button
                    onClick={() => changeLanguage("my")}
                    className={`px-2 py-1 rounded text-xs font-bold ${language === "my"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    MM
                  </button>
                </div>
              </div>
            </div>

            {/* Account Info */}
            {/* <div className="p-4 bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                <Shield className="w-3.5 h-3.5" />
                                <span className="font-bold">Account ID: #USER12345</span>
                            </div>
                        </div> */}
          </div>

          {/* Additional Info Card */}
          <div className="mt-4 gradient-home-section active:from-purple-700 active:to-rose-700 rounded-2xl shadow-md border border-gray-100 p-4">
            <div className="text-sm font-bold mb-3 text-center">
              <h3 className="text-sm font-bold text-white mb-3">
                {t.accountInfo}
              </h3>
            </div>
            <div className="space-y-2.5">
              {/* <InfoRow label={t.memberSince} value="Dec 2024" />
              <InfoRow label={t.status} value="Active" badge />
              <InfoRow label={t.subscription} value={t.plan} /> */}

              <InfoRow
                label={t.memberSince}
                value={formatDateTime(user?.user_registered_on)?.date || "N/A"}
              />

              <InfoRow
                label={t.status}
                value={
                  user?.user_status === "1" ? "Subscribed" : "Unsubscribed"
                }
                badge
              />

              <InfoRow
                label={t.subscription}
                // value={user?.user_subscription_status || "Free"}
                value="Daily : 200 Ks"
              />
            </div>
          </div>
        </div>

        {/* Avatar Selector Component */}
        <PopupAvatarSelector
          isShow={isEditingImage}
          onClose={() => setIsEditingImage(false)}
          selectedAvatar={selectedAvatar}
          onSelect={setSelectedAvatar}
          onSave={handleSaveAvatar}
        />
      </div>

      <AnimatePresence>
        {showUnsubscribePopup && (
          <PopupBannerUnsubscribe
            isShow={showUnsubscribePopup}
            onClose={() => setShowUnsubscribePopup(false)}
            onConfirm={confirmUnsubscribe}
            confirmText={t.confirm}
            data={{
              title: t.areYouSure,
              description: t.confirmUnsubscribeMessage,
              image: true,
              autoCloseTimer: 0,
            }}
          />
        )}
      </AnimatePresence>
      <BottomNavBar />
    </>
  );
}

const StatCard = React.memo(({ label, value, icon, color }: any) => {
  const themes: any = {
    blue: "from-blue-600 to-indigo-700 border-blue-400 text-white shadow-blue-200",
    gold: "from-amber-500 to-orange-600 border-amber-300 text-white shadow-amber-200",
    rose: "from-rose-500 to-pink-600 border-rose-300 text-white shadow-rose-200",
  };

  const theme = themes[color] || themes.blue;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${theme} border rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-md transition-all active:scale-95`}
    >
      <div className="p-2 bg-white rounded-xl shadow-sm relative z-10 w-9 h-9 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center relative z-10">
        <p className="text-base font-black leading-none mb-0.5">{value}</p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
          {label}
        </p>
      </div>
      {/* Subtle Background Glow */}
      <div
        className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full blur-xl opacity-30 bg-white/20`}
      />
    </div>
  );
});

const InfoRow = React.memo(({ label, value, badge = false }: any) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 tracking-[1px]">
      <span className="text-xs font-bold text-white">{label}</span>
      {badge ? (
        <span className="p-2 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold">
          {value}
        </span>
      ) : (
        <span className="text-xs font-bold text-white">{value}</span>
      )}
    </div>
  );
});
