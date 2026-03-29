"use client";

import { Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    <section id="how-it-works" className="relative py-24 px-6 overflow-hidden bg-[#020610]" style={{ zIndex: 1 }}>
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Atmospheric Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-amber-500/80 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-500/80 blur-[150px] rounded-full animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/10 blur-[180px] rounded-full" />

        {/* Strategic Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.1; }
          50% { transform: scale(1.1) translate(10px, -10px); opacity: 0.15; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-4 shadow-sm">
            <span className="text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
              🧠 How It Works
            </span>
          </div>
          <h2 className="font-black mb-4 tracking-tighter leading-none text-white text-5xl" >
            Simple. Strategic.{" "}
            <br className="md:hidden" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-200 via-amber-400 to-amber-600">
              Powerful.
            </span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium">
            A precision-engineered approach to securing high-leverage financing.
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Central Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-linear-to-b from-transparent via-white/10 to-transparent" 
          />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Center Node */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-950 border border-white/10 z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: step.color, boxShadow: `0 0 10px ${step.color}60` }} />
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className="relative p-4 rounded-3xl border border-white/5  backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-500 overflow-hidden group/card"
                    style={{ borderLeft: i % 2 !== 0 ? `2px solid ${step.color}40` : "1px solid rgba(255,255,255,0.05)", borderRight: i % 2 === 0 ? `2px solid ${step.color}40` : "1px solid rgba(255,255,255,0.05)", backgroundColor: step.color + 30 }}
                  >
                    {/* Glow on hover */}
                    <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,transparent_100%) group-hover/card:from-white/5 transition-colors duration-700" />

                    {/* Large Background Number */}
                    <span className={`absolute -bottom-6 text-[10rem] font-black select-none pointer-events-none transition-all duration-1000 group-hover/card:scale-110 blur-md opacity-50 ${i % 2 === 0 ? "-right-2 text-white" : "-left-2 text-white"
                      }`}
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </span>

                    <h4 className="relative z-10 text-lg font-bold text-white mb-3 tracking-tight">
                      {step.title}
                    </h4>
                    <div className="relative z-10 text-zinc-400 text-sm leading-relaxed font-medium" >
                      {step.desc}
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Execution Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 group"
        >
          <div className="relative overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10 rounded-[3rem] transition-all duration-700 hover:border-amber-500/40 hover:shadow-[0_0_50px_rgba(245,158,11,0.1)]">
            {/* Internal Glow Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] -mr-64 -mt-64 rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-all duration-1000" />

            <div className="relative z-10 flex flex-col items-center text-center gap-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-inner">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20 animate-pulse" />
                <span className="text-[11px] font-black tracking-[0.2em] text-amber-200 uppercase">
                  Our Commitment to Execution
                </span>
              </div>

              <h3 className="text-3xl font-black tracking-tighter italic bg-clip-text text-transparent bg-linear-to-r from-white via-amber-100 to-zinc-600 max-w-3xl leading-none">
                Speed matters. Certainty wins deals. <br className="hidden md:block" />
                And we’re built to deliver both.
              </h3>

              <div className="w-24 h-1.5 bg-linear-to-r from-transparent via-amber-500 to-transparent rounded-full opacity-40 shadow-[0_0_20px_rgba(245,158,11,0.4)]" />

              <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl font-medium">
                Upon signing the LOI, our team immediately pulls credit, confirms documentation, and activates full processing — accelerating your file into underwriting with a clear path toward funding.
                <span className="text-white font-bold mx-2">We move decisively</span> to keep your timeline intact. If one structure doesn’t fit, we reposition your file into alternative programs to secure the strongest possible financing solution.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
