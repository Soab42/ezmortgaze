"use client";

import { CheckCircle2, Building, Home } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const commercial = [
  "Multifamily (5+ units), retail, office, industrial, hospitality",
  "Assisted living, self-storage, healthcare & special-use properties",
  "Mixed-use acquisition and refinance",
  "Bridge financing for time-sensitive or transitional deals",
  "Ground-up construction & major renovation loans",
  "Long-term commercial mortgages with structured amortization",
  "SBA, USDA B&I, FHA commercial programs",
];

const residential = [
  "Fix & Flip / Bridge / Blanket / Hard Money loans",
  "Landlord & rental portfolio expansion financing",
  "DSCR qualification programs",
  "Bank statement qualification programs",
  "No-Doc / Lite-Doc financing for complex borrower profiles",
  "Fannie Mae investor programs",
  "Stated income options for self-employed borrowers",
];

export default function LoanPrograms() {
  const container = useRef < HTMLDivElement > (null);
  const [activeTab, setActiveTab] = useState < "commercial" | "residential" > ("commercial");

  useGSAP(() => {
    // Header
    gsap.from(".prog-hdr", {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%" }
    });

    // Content container slide up
    gsap.from(".prog-content", {
      y: 60, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2,
      scrollTrigger: { trigger: ".prog-content", start: "top 85%" }
    });

  }, { scope: container });

  // Re-run animation when tab changes
  useGSAP(() => {
    gsap.fromTo(".prog-item",
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );
  }, { dependencies: [activeTab], scope: container });

  const currentList = activeTab === "commercial" ? commercial : residential;
  const isComm = activeTab === "commercial";

  return (
    <section id="programs" ref={container} className="relative py-24 px-6 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto relative z-10 w-full">

        {/* Header */}
        <div className="prog-hdr text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-emerald-500/20">
            <span className="text-sm font-medium tracking-wide text-emerald-300 uppercase">
              Capital Placement
            </span>
          </div>
          <h2 className="font-black mb-6 tracking-tight leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Programs Designed for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Real Results
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg leading-relaxed">
            Every solution is structured around your financial profile, property type, and exit strategy — not the other way around.
          </p>
        </div>

        {/* Tab System container */}
        <div className="prog-content glass-panel p-2 md:p-12 rounded-[2rem] border-white/5 bg-zinc-950/40 relative">

          {/* Ambient Glow behind tabs */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] blur-[80px] opacity-20 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: isComm ? "#3b82f6" : "#f59e0b" }}
          />

          {/* Toggle Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 relative z-10 p-4 md:p-0">
            <button
              onClick={() => setActiveTab("commercial")}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl md:rounded-full font-bold text-lg transition-all duration-300 w-full sm:w-auto ${isComm
                  ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-500"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-transparent"
                }`}
            >
              <Building className="w-5 h-5" />
              Commercial Financing
            </button>
            <button
              onClick={() => setActiveTab("residential")}
              className={`flex items-center justify-center gap-3 px-8 py-4 rounded-xl md:rounded-full font-bold text-lg transition-all duration-300 w-full sm:w-auto ${!isComm
                  ? "bg-amber-500 text-zinc-950 shadow-[0_0_30px_rgba(245,158,11,0.4)] border border-amber-400"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-transparent"
                }`}
            >
              <Home className="w-5 h-5" />
              Residential Investment
            </button>
          </div>

          {/* List Display */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 pb-8 md:pb-0">
            <ul className="grid gap-4">
              {currentList.map((item, i) => (
                <li
                  key={i}
                  className="prog-item flex items-center gap-4 p-4 md:p-5 rounded-2xl glass-panel bg-white/5 hover:bg-white/10 transition-colors border-white/5 border-l-[3px]"
                  style={{ borderLeftColor: isComm ? "#3b82f6" : "#f59e0b" }}
                >
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 border border-white/10 shadow-inner">
                    <CheckCircle2 className="w-4 h-4" style={{ color: isComm ? "#60a5fa" : "#fbbf24" }} />
                  </div>
                  <span className="text-zinc-300 text-base md:text-lg font-medium leading-relaxed tracking-wide">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
