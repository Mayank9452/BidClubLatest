"use client";

import { TopBar } from "@/components/TopBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsOfUsePage() {
  const navigate = useNavigate();


  return (
    <>
      <TopBar />

      <div className="mobile-container py-4  pt-3 px-3">
        {/* Header */}
        <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#0a0f7ac4] to-pink-700 text-white rounded-xl px-3 pb-16 pt-3 shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-3 top-3 p-1 bg-white/40 hover:bg-white/60 rounded-xl transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <h1 className="text-xl font-extrabold tracking-wide">
            Terms of Use
          </h1>
        </div>

        {/* Content Card */}
        <div className="min-h-screen relative z-10 bg-white rounded-2xl shadow-xl py-6 px-4 text-[14px] text-gray-900 -mt-10 mx-3 border border-gray-100">

          <p>
            Hola, Minglaba! and a very warm welcome to the Terms of Use ("Terms") of BidBlast, Tej Studios a firm incorporated,
            with its registered office at 19 Topkhana Bazar, Ambala Cantt, Haryana - India 133001 (<b>"BidBlast", "We", "Us", or "Our"</b>).
            BidBlast service is a bidding mobile gaming portal where user can participate in the bids on daily, weekly and on monthly
            basis and can win real-time prizes by adding lowest unique bids on portal.
          </p>

          <p>
            By confirming the subscription, users acknowledge and accept these service charge terms and conditions.
            From the moment the service is activated, users are deemed to have accepted all related rules and policies.
          </p>

          <p className="font-bold">
            IF YOU DO NOT AGREE WITH THESE TERMS, THEN PLEASE REFRAIN FROM USING THE PLATFORM. BY ACCESSING OR USING THE PLATFORM,
            YOU IRREVOCABLY ACCEPT THE AGREEMENT AND AGREE TO ABIDE BY THE SAME (AS UPDATED FROM TIME TO TIME).
          </p>

          <br />

          <ol className="list-decimal ml-4 space-y-2">
            <li>
              The service is available through different subscription packages such as daily, weekly, or monthly.
              Users must carefully select and understand the package they wish to purchase before using the service.
            </li>

            <li>
              The types of payment collection methods for service usage are as follows:
              <ul className="list-[lower-alpha] ml-4">
                <li>
                  One-time payment (e.g., a single payment with no auto-renewal)
                </li>
                <li>
                  Recurring payment (e.g., daily, weekly, or monthly)
                </li>
              </ul>
              Users are assumed to be aware of which type applies.
            </li>

            <li>
              If a free trial period is offered by ATOM’s partner companies, the user is allowed to use the service for
              free only during the specified trial period. After the trial ends, the relevant charges will be automatically
              deducted from the user's mobile balance based on the selected package rate (daily/weekly/monthly).
            </li>

            <li>
              Users may unsubscribe from the service at any time based on their own preference.
              Once unsubscribed, no further service charges will be collected.
            </li>

            <li>
              By confirming the subscription, users acknowledge and accept these service charge terms and conditions.
              From the moment the service is activated, users are deemed to have accepted all related rules and policies.
            </li>

            <li>
              ATOM is only acting as a payment intermediary. It does not take any responsibility for the service quality
              and intellectual property rights (e.g., copyrights) of the services provided by its partner companies.
            </li>

            <li>
              The user agrees and accepts that the provision of personal information in the use of this service is done voluntarily.
              ATOM Myanmar shall not bear any responsibility for the personal information voluntarily provided by the user.
            </li>
          </ol>

          <br />
          <br />
        </div>
      </div>

      <BottomNavBar />
    </>
  );
}
