"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Leadership • Experience • Opportunity");

  useEffect(() => {
    // Prevent background scrolling while loading
    document.body.style.overflow = "hidden";

    const totalDurationMs = 3000; // 3 seconds smooth timeline
    const intervalMs = 30;
    const totalSteps = totalDurationMs / intervalMs;
    let stepCount = 0;

    const messages = [
      { progress: 28, text: "Leadership • Experience • Opportunity" },
      { progress: 62, text: "Empowering Youth • Serving Humanity" },
      { progress: 88, text: "Leo District 306 D10 • Sri Lanka" },
      { progress: 100, text: "Welcome to UWU Leos" },
    ];

    const timer = setInterval(() => {
      stepCount++;
      // Easing curve (ease-out cubic progression for smooth natural motion)
      const t = Math.min(stepCount / totalSteps, 1);
      const eased = Math.round((1 - Math.pow(1 - t, 2.5)) * 100);
      
      const currentVal = Math.min(100, Math.max(0, eased));
      setProgress(currentVal);

      // Update dynamic status messages
      const activeMsg = messages.find((m) => currentVal <= m.progress);
      if (activeMsg) {
        setStatusMessage(activeMsg.text);
      }

      if (stepCount >= totalSteps) {
        clearInterval(timer);
        setProgress(100);
        setStatusMessage("Welcome to UWU Leos");

        // Small hold at 100% before smooth fade exit
        setTimeout(() => {
          setIsFading(true);
          document.body.style.overflow = "";

          setTimeout(() => {
            setIsLoading(false);
          }, 600);
        }, 300);
      }
    }, intervalMs);

    // Fallback safety cleanup
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      setIsFading(true);
      document.body.style.overflow = "";
      setTimeout(() => setIsLoading(false), 600);
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      id="site-preloader"
      aria-label="Loading Leo Club of Uva Wellassa University"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white select-none transition-all duration-700 ease-out ${
        isFading ? "opacity-0 pointer-events-none scale-98" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle, soft neutral ambient depth */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-slate-100/70 blur-[70px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        
        {/* Minimalist Emblem Lockup with sleek monochromatic rotating ring */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          
          {/* Outer Minimalist Track Ring */}
          <div className="absolute inset-0 rounded-full border border-slate-200/80" />

          {/* Minimalist Navy Rotating Arc */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-leo-dark border-r-leo-blue/40 animate-spin"
            style={{
              animationDuration: "1.6s",
              animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Leo Seal Icon with generous clearance */}
          <div className="relative z-10 w-20 h-20 flex items-center justify-center shrink-0">
            <img
              src="/logos/uwu-leo-seal.png"
              alt="Leo Club of UWU Seal"
              className="w-full h-full object-contain select-none"
            />
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-1 mb-6">
          <h2 className="text-base sm:text-lg font-bold tracking-wider uppercase text-leo-dark font-heading">
            Leo Club of UWU
          </h2>
          <p className="text-xs sm:text-[13px] font-medium text-slate-500 tracking-wide min-h-[22px] transition-all duration-300">
            {statusMessage}
          </p>
        </div>

        {/* Minimalist Progress Bar Container */}
        <div className="w-64 sm:w-72">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-leo-blue to-leo-dark transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Minimal light streak */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full animate-[shimmer_1.8s_infinite]" />
            </div>
          </div>

          {/* District Code & Live Percentage Indicator in subtle slate/navy tones */}
          <div className="flex items-center justify-between mt-2.5 px-0.5 text-xs font-semibold text-slate-400">
            <span className="inline-flex items-center gap-1.5 tracking-wider uppercase text-[10px] font-semibold text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-leo-dark opacity-60" />
              District 306 D10
            </span>
            <span className="tabular-nums font-mono text-slate-700 font-bold text-xs">{progress}%</span>
          </div>
        </div>

      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-6 sm:bottom-8 text-center px-4">
        <p className="text-[11px] text-slate-400 tracking-[0.2em] uppercase font-medium">
          Servite Vel Rejunquo • Serve &amp; Rejoin
        </p>
      </div>
    </div>
  );
}
