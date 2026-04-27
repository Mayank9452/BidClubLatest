import { Card } from "@/components/ui/card";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useLanguage } from "./context/LanguageContext";

export default function VideoSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex justify-center bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl shadow-lg -mt-[4.2rem] relative mx-1">
      <div className="w-full" style={{ width: '90%' }}>
        <video
          className="w-full h-full object-cover rounded-lg"
          src="https://bidblast.club/assets/frontend/img/introduction.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="w-full p-3 flex flex-col justify-center items-center gap-3">
        <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight pt-3 pb-3 px-1">
          {t.aboutBidBlast}
        </h3>

        <p className="text-xs text-gray-800 text-center leading-relaxed font-bold tracking-[1px]">
          {t.welcomeBidBlast}
        </p>

        <p className="text-xs text-center bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent font-semibold">
          {t.toKnowMore}
        </p>

        <div className="flex justify-center">
          <button
            className=" w-fit mt-2"
            onClick={() => {
              navigate("/details", {
                state: { videoUrl: "https://bidblast.club/assets/frontend/img/introduction.mp4" },
              });
            }}
          >
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 active:from-pink-600 active:to-rose-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors duration-150 shadow-md active:shadow-lg flex px-6 tracking-[1px]">
              {t.getDetails}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
