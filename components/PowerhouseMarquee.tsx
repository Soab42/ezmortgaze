"use client";

import React from "react";

const LINE_1 = [
    "200+ CAPITAL SOURCES",
    "•",
    "$5B+ FUNDED VOLUME",
    "•",
    "PRIVATE EQUITY",
    "•",
    "FAMILY OFFICES",
    "•",
    "INSTITUTIONAL FUNDS",
    "•",
    "DIRECT LENDERS",
    "•"
];

const LINE_2 = [
    "NATIONWIDE LENDING",
    "•",
    "FIX & FLIP",
    "•",
    "DSCR PROGRAMS",
    "•",
    "BRIDGE LOANS",
    "•",
    "MULTIFAMILY",
    "•",
    "COMMERCIAL",
    "•",
    "NON-QM",
    "•"
];

export default function PowerhouseMarquee() {
    return (
        <section className="relative pt-16 lg:pt-24 pb-4 lg:pb-8 overflow-hidden bg-transparent flex flex-col justify-center z-10">

            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left-text {
            animation: marqueeLeft 35s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee-right-text {
            animation: marqueeRight 40s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee-left-text:hover, .animate-marquee-right-text:hover {
            animation-play-state: paused;
          }
        `
            }} />

            {/* Abstract background glow */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-blue-600/10 blur-[100px] pointer-events-none z-0" /> */}

            {/* Text Container with Edge Fade Mask */}
            <div className="flex flex-col gap-4 lg:gap-8 relative z-10 opacity-90 -rotate-2 scale-105 mask-[linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]">

                {/* Row 1: Right to Left (Solid) */}
                <div className="animate-marquee-left-text cursor-default">
                    {[...LINE_1, ...LINE_1].map((text, i) => (
                        <span key={`l1-${i}`} className={`text-5xl lg:text-7xl xl:text-8xl font-black shrink-0 px-4 uppercase tracking-tighter ${text === "•" ? "text-amber-500/40" : "text-white/90"}`}>
                            {text}
                        </span>
                    ))}
                </div>

                {/* Row 2: Left to Right (Hollow / Outline) */}
                <div className="animate-marquee-right-text cursor-default">
                    {[...LINE_2, ...LINE_2].map((text, i) => (
                        <span key={`l2-${i}`}
                            className={`text-5xl lg:text-7xl xl:text-8xl font-black shrink-0 px-4 uppercase tracking-tighter ${text === "•"
                                ? "text-blue-500/40"
                                : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] lg:[-webkit-text-stroke:2px_rgba(255,255,255,0.2)]"
                                }`}>
                            {text}
                        </span>
                    ))}
                </div>

            </div>
        </section>
    );
}
