"use client";

import { useRef } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MarketingSection() {
  const containerRef = useRef < HTMLDivElement > (null);
  const cardRef = useRef < HTMLDivElement > (null);


  return (
    <section ref={containerRef} className="">
      <style dangerouslySetInnerHTML={{
        __html: `
        .border-container {
          position: relative;
          padding: 1px;
          border-radius: 2.5rem;
          background: rgba(255, 255, 255, .1);
          overflow: hidden;
        }

        .border-animation {
          position: absolute;
          inset: -120%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 45deg,
            #10b981 90deg,
            #6d28d9 180deg,
            #f59e0b 270deg,
            transparent 315deg,
            transparent 360deg
          );
          animation: rotate-bg 8s linear infinite;
        }

        .inner-content {
          position: relative;
          z-index: 10;
          border-radius: 2rem;
          margin: 6px;
          background: #02061780;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        @keyframes rotate-bg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
      <div className="max-w-5xl mx-auto">
        <div ref={cardRef} className="border-container shadow-2xl">
          <div className="border-animation" />
          <div className="inner-content">
            <div className="glass-panel border-2.5 relative p-3 md:p-5 backdrop-blur-3xl"
              style={{
                borderRadius: "2rem",
              }}
            >
              {/* Decorative background glows */}
              {/* <div className="absolute top-0 right-0 w-96 h-80 bg-blue-600/40 blur-3xl -mr-40 -mt-40" /> */}
              {/* <div className="absolute bottom-0 left-0 w-96 h-80 bg-emerald-500/40 blur-3xl -ml-40 -mb-40" /> */}

              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p className="text-zinc-200 text-lg md:text-lg text-center leading-relaxed">
                    <strong className="text-white">EZMortgageLender.com®</strong> delivers a powerful AI-generated soft offer that shows your estimated lending range upfront —
                    <span className="text-emerald-400 font-bold"> without a hard credit pull or complete application.</span>
                    Know where you stand before you structure your deal. Before committing to hard money, bridge loans, no-doc, lite-doc, construction, or long-term financing — get clarity first.
                  </p>

                  <p className="text-amber-200 text-lg text-center leading-relaxed font-medium">
                    Built for Mortgage Brokers, Realtors, and Direct Borrowers, this tool helps you evaluate scenarios instantly, set realistic expectations, and position every transaction for success.
                  </p>

                  <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 group/item">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center transition-colors group-hover/item:bg-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white font-black tracking-tight text-lg">Negotiate stronger.</span>
                    </div>
                    <div className="flex items-center gap-3 group/item">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center transition-colors group-hover/item:bg-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white font-black tracking-tight text-lg">Move faster.</span>
                    </div>
                    <div className="flex items-center gap-3 group/item">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center transition-colors group-hover/item:bg-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-white font-black tracking-tight text-lg">Compete with confidence.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
