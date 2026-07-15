"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increment progress smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#12213F] text-white"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Glowing Logo Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
              className="relative size-24 rounded-full bg-white flex items-center justify-center p-4 shadow-[0_0_50px_rgba(127,199,0,0.15)] border border-[#7FC700]/20"
            >
              <motion.img
                src="/logo.webp"
                alt="MSL Biotech Logo"
                className="size-16 object-contain"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Rotating molecular outline */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#7FC700]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Text & Progress */}
            <div className="text-center flex flex-col gap-2 mt-4">
              <h2 className="font-heading text-lg font-black tracking-widest uppercase text-white">
                MSL BIOTECH
              </h2>
              <p className="text-xs text-[#7FC700] uppercase font-bold tracking-widest">
                Medicine Save Life
              </p>
            </div>

            {/* Progress bar container */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2 relative">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#184EA4] to-[#7FC700]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Progress Count */}
            <span className="text-xs text-white/50 font-bold font-mono">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
