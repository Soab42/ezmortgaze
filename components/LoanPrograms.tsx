"use client";

import { Building2, Home, CheckCircle2 } from "lucide-react";

export default function LoanPrograms() {
  return (
    <section id="programs" className="relative py-32 px-6 overflow-hidden bg-[#02050c]" style={{ zIndex: 1 }}>
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-emerald-500/15 blur-[160px] rounded-full animate-pulse direction-alternate duration-[8s]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[900px] bg-amber-500/10 blur-[160px] rounded-full animate-pulse direction-alternate duration-[10s] delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/5 blur-[180px] rounded-full animate-pulse direction-alternate duration-[12s] delay-500" />

        {/* Geometric Mesh Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.08)_0%,transparent_50%)]" />

        {/* Subtle Noise/Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl shadow-inner">
            <span className="flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-[0.2em] text-emerald-400 uppercase">
              Financial Architecture
            </span>
          </div>
          <h2 className="font-black mb-8 tracking-tighter leading-[0.95] text-white text-5xl" >
            Strategic <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-emerald-400 via-teal-400 to-blue-500">
              Loan Programs
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
            Tailored financing structures designed for high-performance <br className="hidden md:block" /> real estate professionals and entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
          {/* Commercial Column */}
          <div className="group relative p-px rounded-[3rem] bg-linear-to-b from-emerald-700 to-transparent backdrop-blur-3xl overflow-hidden transition-all duration-700 hover:scale-[1.015] hover:shadow-[0_0_80px_rgba(16,185,129,0.1)]">
            <div className="relative z-10 p-8 md:p-14 bg-[#02081490] rounded-[calc(3rem-1px)] h-full">
              {/* Internal Accent Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] -mr-40 -mt-40 transition-opacity opacity-40 group-hover:opacity-100" />

              <div className="flex items-center gap-8 mb-14">
                <div className="flex items-center justify-center w-24 h-24 rounded-[2rem] border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-700 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                  <Building2 className="w-12 h-12 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter leading-none">Commercial <br />Solutions</h3>
                </div>
              </div>

              <ul className="space-y-8">
                {[
                  "Acquisition and refinance financing for multifamily, retail, office, industrial, hospitality, mixed-use, assisted living, self-storage, healthcare, and special-use properties",
                  "Bridge financing for time-sensitive acquisitions, repositioning strategies, or transitional assets",
                  "Ground-up construction and major renovation loans for development and value-add projects",
                  "Lite-Doc or Full-Doc commercial mortgages with flexible terms and structured amortization"
                ].map((item, i) => (
                  <li key={i} className="flex gap-5 group/item">
                    <div className="mt-2 shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 transition-all duration-500 group-hover/item:border-emerald-400 group-hover/item:bg-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300 text-lg leading-snug font-medium transition-colors group-hover/item:text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Residential Column */}
          <div className="group relative p-px rounded-[3rem] bg-linear-to-b from-amber-700  to-transparent backdrop-blur-3xl overflow-hidden transition-all duration-700 hover:scale-[1.015] hover:shadow-[0_0_80px_rgba(245,158,11,0.1)]">
            <div className="relative z-10 p-8 md:p-14 bg-[#02081460] rounded-[calc(3rem-1px)] h-full">
              {/* Internal Accent Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] -mr-40 -mt-40 transition-opacity opacity-40 group-hover:opacity-100" />

              <div className="flex items-center gap-8 mb-14">
                <div className="flex items-center justify-center w-24 h-24 rounded-[2rem] border border-amber-500/30 bg-amber-500/10 shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-700 group-hover:bg-amber-500/20 group-hover:shadow-[0_0_60px_rgba(245,158,11,0.3)]">
                  <Home className="w-12 h-12 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter leading-none">Residential <br />Investment</h3>
                </div>
              </div>

              <ul className="space-y-8">
                {[
                  "Fix & Flip, bridge, blanket, ground-up construction, and hard money financing for investors and builders seeking short-term or long-term project capital",
                  "Landlord and rental portfolio expansion financing for scaling investment portfolios",
                  "DSCR and bank statement qualification programs designed for real estate entrepreneurs",
                  "No-Doc and Lite-Doc financing for complex borrower profiles and non-traditional income"
                ].map((item, i) => (
                  <li key={i} className="flex gap-5 group/item">
                    <div className="mt-2 shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 transition-all duration-500 group-hover/item:border-amber-400 group-hover/item:bg-amber-500/20">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-zinc-300 text-lg leading-snug font-medium transition-colors group-hover/item:text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="text-center max-w-5xl mx-auto pt-10">
          <p className="text-2xl italic font-bold leading-[1.2] bg-clip-text text-transparent bg-linear-to-r from-zinc-500 via-white to-zinc-500 tracking-tight">
            "Every solution is structured around your financial profile, property type, and exit strategy — not the other way around."
          </p>
        </div>
      </div>
    </section>
  );
}
