"use client";

import { Zap } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Complete the 5-Minute Soft Pre-Qual Form",
    desc: "Provide basic borrower and property details so our AI can evaluate your deal structure.",
    color: "#3b82f6",
  },
  {
    num: "02",
    title: "Receive Your AI-Generated Soft Offer",
    desc: "Instantly view your estimated qualification range and potential financing options — with no hard credit inquiry.",
    color: "#f59e0b",
  },
  {
    num: "03",
    title: "Strategic Review with a Loan Specialist",
    desc: "Our team refines the structure, evaluates capital sources, and optimizes terms based on your property type, leverage, and exit strategy.",
    color: "#8b5cf6",
  },
  {
    num: "04",
    title: "LOI Issuance & Processing",
    desc: (
      <>
        Once supporting documents are reviewed and the deal meets initial parameters, management may issue a formal Letter of Intent (LOI) to move your transaction forward.
      </>
    ),
    color: "#10b981",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-12 px-6 overflow-hidden bg-transparent" style={{ zIndex: 1 }}>
      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-4 border-amber-500/20 bg-white/5">
            <span className="text-xs font-bold tracking-widest text-amber-300 uppercase">
              🧠 How It Works
            </span>
          </div>
          <h2 className="font-black mb-2 tracking-tight leading-tight text-white text-4xl md:text-5xl" >
            Simple. Strategic.{" "}
            <span className="text-white">
              Powerful.
            </span>
          </h2>
        </div>

        {/* Timeline Layout - Static & Compact */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-white/5 whitespace-normal" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Center Node */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full glass-panel bg-zinc-950/80 border border-white/10 z-10">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: step.color }} />
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className="relative glass-panel p-5 md:p-6 rounded-2xl border-white/5 bg-white/2 hover:bg-white/4 transition-colors overflow-hidden group/card">
                    {/* Large Background Number */}
                    <span className={`absolute -bottom-6 text-[10rem] font-black text-white/4 select-none pointer-events-none transition-transform duration-700 group-hover/card:scale-110 group-hover/card:text-white/6 ${i % 2 === 0 ? "-right-2" : "-left-2"
                      }`}>
                      {step.num}
                    </span>

                    <h4 className="relative z-10 text-lg font-bold text-white mb-2 tracking-tight">
                      {step.title}
                    </h4>
                    <div className="relative z-10 text-white/90 text-sm leading-relaxed">
                      {step.desc}
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Closing Execution Card */}
        <div className="mt-16 group">
          <div className="relative glass-panel overflow-hidden border-white/10 bg-white/3 p-8 md:p-10 rounded-3xl transition-all duration-500 hover:bg-white/5 hover:border-amber-500/30">
            {/* Subtle Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -mr-32 -mt-32 rounded-full pointer-events-none group-hover:bg-white/10 transition-colors" />

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-2">
                <Zap className="w-4 h-4 text-white fill-white/20" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase">
                  Our Commitment to Execution
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black tracking-tight italic text-white max-w-2xl">
                Speed matters. Certainty wins deals. <br className="hidden md:block" />
                And we’re built to deliver both.
              </h3>

              <div className="w-16 h-1 bg-linear-to-r from-transparent via-white/40 to-transparent rounded-full" />

              <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-3xl font-medium">
                Upon signing the LOI, our team immediately pulls credit, confirms documentation, and activates full processing — accelerating your file into underwriting with a clear path toward funding.
                <span className="text-white font-bold mx-1">We move decisively</span> to keep your timeline intact and your closing on track. If one structure doesn’t fit, we don’t stall deals — we pivot. Leveraging our extensive capital network, we quickly reposition your file into alternative loan programs to secure the strongest possible financing solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
