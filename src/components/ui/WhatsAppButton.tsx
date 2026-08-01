"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.open("https://wa.me/919780506626", "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-40 flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="mr-3 px-3 py-1.5 bg-white dark:bg-zinc-800 text-gray-800 dark:text-white rounded-lg shadow-lg text-sm font-medium whitespace-nowrap"
              >
                Chat with us
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={handleClick}
            animate={{
              boxShadow: [
                "0px 0px 0px 0px rgba(37, 211, 102, 0.5)",
                "0px 0px 0px 15px rgba(37, 211, 102, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#20b858] transition-colors focus:outline-none"
            aria-label="WhatsApp Chat"
          >
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 21.059c-1.637 0-3.238-.43-4.654-1.242l-.334-.191-3.46.907.925-3.371-.211-.334c-.89-1.416-1.359-3.047-1.359-4.72 0-4.945 4.027-8.972 8.98-8.972 2.395 0 4.646.93 6.34 2.624a8.956 8.956 0 012.625 6.348c0 4.945-4.028 8.971-8.982 8.971h.13zM6.014 18.006c1.238.734 2.656 1.125 4.105 1.125 4.312 0 7.82-3.512 7.82-7.828 0-2.09-.813-4.055-2.29-5.535A7.807 7.807 0 0010.117 3.48c-4.316 0-7.82 3.508-7.82 7.824 0 1.543.402 3.031 1.164 4.348l-1.07 3.899 3.993-1.047a.066.066 0 01-.002-.002l.006.002-.374-.498zm8.175-4.57c-.226-.113-1.336-.66-1.543-.734-.207-.074-.355-.113-.504.113-.148.226-.582.734-.71.886-.13.152-.258.172-.485.06-.226-.113-.957-.351-1.824-1.124-.675-.602-1.13-1.344-1.258-1.57-.13-.226-.016-.348.098-.46.101-.1.226-.266.34-.399.113-.133.152-.226.226-.379.074-.152.039-.285-.016-.398-.059-.113-.504-1.215-.691-1.664-.184-.437-.367-.379-.504-.386h-.43a.82.82 0 00-.594.277c-.207.226-.789.773-.789 1.882 0 1.11.808 2.184.922 2.336.113.152 1.593 2.43 3.86 3.414.54.234.957.375 1.285.48.543.172 1.035.148 1.426.09.437-.066 1.336-.547 1.523-1.074.187-.527.187-.98.13-1.074-.055-.094-.203-.152-.43-.266z" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
