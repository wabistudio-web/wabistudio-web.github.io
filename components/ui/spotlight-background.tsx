"use client";

import React from "react";
import { motion } from "framer-motion";

const SpotlightBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#FAFAF8]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Blob haut-gauche — terracotta fort */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "80vw",
            height: "80vw",
            background: "radial-gradient(circle at center, rgba(184,92,44,0.45) 0%, rgba(184,92,44,0.18) 40%, transparent 68%)",
            filter: "blur(55px)",
            top: "-28%",
            left: "-20%",
          }}
          animate={{ x: ["0%", "8%", "-5%", "0%"], y: ["0%", "6%", "-4%", "0%"] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />

        {/* Blob centre-bas — ambre */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "65vw",
            height: "65vw",
            background: "radial-gradient(circle at center, rgba(215,148,85,0.38) 0%, rgba(215,148,85,0.12) 45%, transparent 68%)",
            filter: "blur(70px)",
            top: "28%",
            left: "15%",
          }}
          animate={{ x: ["0%", "13%", "-8%", "0%"], y: ["0%", "-10%", "8%", "0%"] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 4 }}
        />

        {/* Blob haut-droite — terre sombre */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "70vw",
            height: "70vw",
            background: "radial-gradient(circle at center, rgba(158,74,26,0.35) 0%, rgba(158,74,26,0.10) 45%, transparent 68%)",
            filter: "blur(65px)",
            top: "-22%",
            right: "-18%",
          }}
          animate={{ x: ["0%", "-10%", "6%", "0%"], y: ["0%", "13%", "-6%", "0%"] }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 7 }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightBackground;
