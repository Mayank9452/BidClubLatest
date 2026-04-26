// import { X } from "lucide-react";
// import { useState } from "react";

// interface LowBalancePopupProps {
//   visible: boolean;
//   onClose: () => void;
// }

// export default function LowBalancePopup({ visible, onClose }: LowBalancePopupProps) {
//   if (!visible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="relative bg-white rounded-2xl shadow-xl w-80 max-w-[90%] p-6 flex flex-col items-center">
        
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
//         >
//           <X size={20} />
//         </button>

//         {/* Avatar */}
//         <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
//           <img
//             src="https://i.pravatar.cc/150?img=3"
//             alt="User Avatar"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Message */}
//         <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
//           Low Balance Available
//         </h2>

//         {/* OK Button */}
//         <button
//           onClick={onClose}
//           className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-2 px-6 rounded-xl shadow-md hover:from-pink-600 hover:to-rose-600 transition"
//         >
//           OK
//         </button>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';

interface LowBalancePopupProps {
  visible: boolean;
  onClose: () => void;
  avatarUrl?: string;
}

export default function LowBalancePopup({ visible, onClose, avatarUrl }: LowBalancePopupProps) {
  const { t } = useLanguage();
  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with a soft blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
            className="relative w-full max-w-[340px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
          >
            {/* Top accent gradient bar */}
            <div className="h-2 w-full bg-[#0a0f7a]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:scale-110 transition-transform"
            >
              <X size={18} />
            </button>

            <div className="p-8 flex flex-col items-center">
              {/* Avatar with Colorful Ring */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-[2rem] p-1 bg-[#0a0f7a]">
                  <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-white">
                    <img
                      src={avatarUrl || "https://i.pravatar.cc/150?img=5"}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Warning Badge */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-1 rounded-full shadow-md">
                  <div className="bg-orange-500 rounded-full p-1">
                    <AlertCircle size={14} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="text-center space-y-2 mb-4">
                <h2 className="text-2xl font-extrabold tracking-tight bg-[#0a0f7a] bg-clip-text text-transparent">
                  {t.lowBalance}
                </h2>
                <p className="text-[12px] text-black dark:text-slate-400 font-semibold">
                  {t.lowBalanceMessage}
                </p>
              </div>

              {/* OK Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full py-4 bg-[#0a0f7a] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/40 hover:shadow-cyan-500/60 transition-all"
              >
                {t.okayGotIt}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}