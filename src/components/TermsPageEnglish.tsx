"use client";

import { TopBar } from "@/components/TopBar";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function TermsPageEnglish() {
  const navigate = useNavigate();

  return (
    <>
      <TopBar />

      <div className="mobile-container py-4 pt-3 px-2">
        {/* Header */}
        <div className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-[#0a0f7ac4] to-pink-700 text-white rounded-xl px-2 pb-12 pt-3 shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-3 top-3 p-1 bg-white/95 hover:bg-white rounded-xl backdrop-blur-md transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-600" />
          </button>

          <h1 className="text-xl font-bold leading-relaxed text-center">
            Terms & Conditions
          </h1>
        </div>

        {/* Content Card */}
        <div className="min-h-screen relative z-10 bg-white rounded-2xl shadow-xl py-6 pb-5 px-5 text-[14px] text-gray-800 -mt-6 mx-3 border border-gray-100 space-y-4 leading-relaxed">
          <p>
            BidBlast is an interactive mobile bid-and-win game for ATOM Myanmar subscribers, operated by Tej Studios with its registered office at 19 Topkhana Bazar, Ambala Cantt, Haryana – India 133001 (“BidBlast,” “BB,” “We,” “Us,” or “Our”). Players bid daily for a chance to win rewards such as ATOM mobile data (MB), and the 1 Day and 3 Day subscription packs unlock additional bonus reward opportunities. BidBlast is accessible at <a href="https://bidblast.club/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">https://bidblast.club/</a>.
          </p>

          <p>
            By accessing or using the Platform (defined below) you agree to these Terms of Use (“Terms”), together with our Privacy and Cookie Policies (the “Agreement”).
          </p>

          <p className="font-bold text-red-600">
            IF YOU DO NOT AGREE WITH THESE TERMS, PLEASE DO NOT USE THE PLATFORM. BY ACCESSING OR USING IT, YOU IRREVOCABLY ACCEPT THE AGREEMENT (AS UPDATED FROM TIME TO TIME).
          </p>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">Definitions</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Subscription:</strong> an access model where subscribers gain access to the Platform and its service, based on the subscription rules (fee and number of days) or “free to play” as defined by us.</li>
              <li><strong>Subscriber:</strong> a User who has paid the applicable subscription fee for the Territory and can access our content.</li>
              <li><strong>Player:</strong> a Subscriber who meets the eligibility criteria and takes part in the games and activities on the Platform.</li>
              <li><strong>Currencies:</strong> ATOM mobile data (MB), winnings, or any ad-hoc give-away (collectively).</li>
              <li><strong>Platform:</strong> the BidBlast website (<a href="https://bidblast.club/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">https://bidblast.club/</a>) and its sub-domains.</li>
              <li><strong>Personal Information:</strong> any information that, directly or indirectly, alone or with other available information, can identify a natural person.</li>
              <li><strong>Territory:</strong> Myanmar.</li>
              <li><strong>Billing Provider:</strong> ATOM Myanmar.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">1. Subscription, Billing and Use</h2>
            <div className="space-y-2 pl-2">
              <p>
                <strong>1.1</strong> BidBlast is offered through the following recurring packages — choose carefully; prices may change in future, so please check this page for updates:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>1 Day Pack:</strong> 200 Kyats (inclusive of applicable taxes) — one (1) day of access.</li>
                <li><strong>3 Day Pack:</strong> 750 Kyats (inclusive of applicable taxes) — three (3) days of access.</li>
              </ul>
              <p>
                <strong>1.2</strong> Recurring packages renew automatically on expiry unless you unsubscribe beforehand. Charges are deducted from your ATOM Myanmar mobile balance through Direct Carrier Billing (DCB).
              </p>
              <p>
                <strong>1.3</strong> Free trial: 1 day for the 1 Day Pack and 7 days for the 3 Day Pack. Unless you unsubscribe before the trial ends, the subscription begins automatically and standard charges apply.
              </p>
              <p>
                <strong>1.4</strong> You may unsubscribe at any time via USSD *1414# or by dialling 09755853473. After unsubscribing, no further charges are collected; amounts already deducted are non-refundable.
              </p>
              <p>
                <strong>1.5</strong> Your subscription remains active until an unsubscribe callback is received from the billing provider, or until you voluntarily unsubscribe. No inactivity-based automatic cancellation applies.
              </p>
              <p>
                <strong>1.6</strong> By confirming a subscription you accept these charge terms; from activation you are deemed to accept all related rules and policies.
              </p>
              <p>
                <strong>1.7</strong> ATOM Myanmar acts only as a payment intermediary and is not responsible for service quality or the intellectual property of services provided by partner companies. Any personal information you provide is given voluntarily, and ATOM Myanmar bears no responsibility for it.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">2. Access and Eligibility</h2>
            <div className="space-y-2 pl-2">
              <p>
                <strong>2.1</strong> These Terms are a contract between you (the User) and BidBlast. We may refuse or limit access at our discretion, including where you violate our policies or act in a way that harms other Users.
              </p>
              <p>
                <strong>2.2</strong> You must be at least 16 years of age (as defined under Myanmar law). Minors may use the Platform only with the consent and supervision of a parent or legal guardian. By using the Platform, you (or your guardian) agree to these Terms and confirm you are competent to do so.
              </p>
              <p>
                <strong>2.3</strong> Only registered ATOM users connected via the ATOM mobile network may access and play. Users outside the ATOM network, using a VPN, or on any other network cannot access these features. Where a user shares a mobile hotspot, only the person providing the hotspot may play; others connected through it are not eligible, regardless of their ATOM account status.
              </p>
              <p>
                <strong>2.4</strong> Access the Platform only through the interfaces we provide; do not copy, monitor, reproduce, or circumvent any part of it. We may change these Terms at any time without prior notice, so please review this page periodically.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">3. Rewards</h2>
            <div className="space-y-2 pl-2">
              <p>
                <strong>3.1</strong> Rewards, including ATOM mobile data (MB), may be granted based on gameplay activity, subscription status, campaign participation, or other eligibility criteria we determine. ATOM data rewards remain subject to the validity periods, network policies, and usage conditions set by ATOM Myanmar.
              </p>
              <p>
                <strong>3.2</strong> Rewards hold no monetary or cash value outside the Platform, may be used only within the service ecosystem for eligible in-game activities, and cannot be transferred, withdrawn, exchanged for cash, resold, or converted into any external currency or benefit.
              </p>
              <p>
                <strong>3.3</strong> Winners must claim their winnings within fifteen (15) days from the date of winning. Winnings not claimed within this period are forfeited and will not be reissued.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">4. Player Obligations and Platform Rights</h2>
            <div className="space-y-2 pl-2">
              <p>
                <strong>4.1</strong> You must comply with the terms of any third-party providers facilitating payments, and must not cheat, manipulate the system, violate platform rules or these Terms, or use criminal or fraudulent means (“Cheating”).
              </p>
              <p>
                <strong>4.2</strong> We may verify reward eligibility and withhold rewards where misconduct is suspected; restrict participation or withhold rewards while a Player is under investigation for Cheating; and void any participation submitted in error, used to circumvent these Terms, or that influenced an outcome by dishonest means. We decline liability for any delay or failure in redemptions, whether direct or indirect.
              </p>
              <p>
                <strong>4.3</strong> On finding any bug or error, log out immediately and notify <a href="mailto:tech@tejstudio.net" className="text-indigo-600 hover:underline">tech@tejstudio.net</a>; exploiting bugs for gain is prohibited. All account actions and payments must be made by the account holder for their own benefit, and any tools giving an unfair advantage are strictly prohibited.
              </p>
              <p>
                <strong>4.4</strong> You may close or suspend your account by emailing <a href="mailto:tech@tejstudio.net" className="text-indigo-600 hover:underline">tech@tejstudio.net</a>; on termination, Currencies are forfeited unless redeemed in compliance with these Terms. Rewards and activity are recorded automatically in your account; verify their accuracy and report any discrepancy to <a href="mailto:tech@tejstudio.net" className="text-indigo-600 hover:underline">tech@tejstudio.net</a>.
              </p>
              <p>
                <strong>4.5</strong> No refunds: deposits made from your billing-provider account and subscription charges are non-refundable, regardless of your ability to participate, including for technical issues such as network failure.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">5. Disclaimers and Liability</h2>
            <div className="space-y-2 pl-2">
              <p>
                <strong>5.1</strong> Participation is at your sole risk and the Platform is provided “as is” without warranties of any kind; delays may occur in our network or systems. We do not guarantee that the Platform will meet your expectations, that access will be uninterrupted, timely, reliable, or fault-free, or that results will meet your expectations. Service, rewards, subscriptions, and campaigns may be suspended, modified, withdrawn, or discontinued for maintenance, upgrades, technical issues, operational requirements, or force-majeure events.
              </p>
              <p>
                <strong>5.2</strong> To the maximum extent permitted by law, we are not liable for any direct or indirect damages — including loss of profits, goodwill, data, or opportunity — arising from use of or inability to use the Platform, the cost of replacement services, third-party claims, unauthorised access to or modification of transmissions, or any other circumstances relating to the Platform. Keep your credentials confidential; you are responsible for activity under your account and must report any suspected unauthorised use immediately.
              </p>
              <p>
                <strong>5.3</strong> You shall indemnify and hold harmless ATOM, Tej Studios, and their respective affiliates, officers, directors, and employees from all losses, liabilities, claims, penalties, damages, costs, and expenses (including legal fees) arising from your breach of these Terms, any third-party claim arising from your use of the Platform, your violation of another’s rights (including intellectual property rights), or your violation of any applicable law. In no event are we or our affiliates liable for any special, incidental, indirect, consequential, exemplary, or punitive damages.
              </p>
              <p>
                <strong>5.4</strong> We are not liable for damages arising from force majeure or similar events affecting us — including labour disputes, government action, war, sabotage, civil unrest, fire, storm, flood, explosion, earthquake, resource limitations, accidents, or power or telecommunication failures — and such events entitle us to suspend or limit the Platform until further notice.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">6. Intellectual Property, Term and Termination</h2>
            <div className="space-y-2 pl-2">
              <p>
                <strong>6.1</strong> The Platform’s content is protected by international copyright laws and treaties. Reproduction or distribution of any material (text, images, video, music, software) is prohibited unless expressly permitted. Our trade name, logo, and trademarks may not be used without our prior written approval, and use of the Platform grants no licence to any marks or names on it. Where games are licensed from third parties, those licensors are not associated with the outcomes, are not sponsors or prize providers, and are not liable for reward fulfilment; you release and indemnify them and their affiliates against any claim arising from participation.
              </p>
              <p>
                <strong>6.2</strong> This Agreement is valid until further notice, and suspended, frozen, or terminated accounts may not access the Platform. We may suspend, freeze, or terminate access without prior notice where you breach security (for example, accessing unauthorised data or accounts, probing system vulnerabilities, or bypassing authentication); breach these Terms; where crime, misuse, or fraud is suspected; where Cheating is observed; where no transactions occur until an unsubscribe callback is received or you unsubscribe; where necessary for safety or reputation; or where required by law. Security violations may carry civil or criminal liability, and we may cooperate with law enforcement.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-indigo-900 border-b pb-1 mb-2">7. Legal and General</h2>
            <div className="space-y-2 pl-2">
              <p>
                <strong>7.1</strong> Governing law: these Terms are governed by the laws of Myanmar.
              </p>
              <p>
                <strong>7.2</strong> Severability and waiver: if any provision is found unenforceable, it is enforced to the maximum extent permissible and the remainder continues in full force. No provision is waived and no breach excused unless in writing and signed by us; any waiver does not waive any other or subsequent breach.
              </p>
              <p>
                <strong>7.3</strong> Changes, disputes and contact: continued use constitutes acceptance of these Terms and any updates, which we may amend or replace at any time (the current version is available on the Platform). In the event of any dispute, our decision is final and binding, subject to the Governing Law section above. For any questions, contact <a href="mailto:tech@tejstudio.net" className="text-indigo-600 hover:underline">tech@tejstudio.net</a> or call 09755853473.
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-gray-500 pt-4 border-t">
            Effective date: 2nd June 2026
          </div>
        </div>
      </div>

      <BottomNavBar />
    </>
  );
}
