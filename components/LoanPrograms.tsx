"use client";

import { Building2, Home, CheckCircle2 } from "lucide-react";

export default function LoanPrograms() {
  return (
    <section id="programs" className="relative py-24 px-6 overflow-hidden bg-[#020814]" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-black mb-10 tracking-tight leading-tight text-white text-4xl md:text-5xl" >
            Loan Programs Designed for <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-teal-400">
              Real Results
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Commercial Column */}
          <div className="glass-panel p-8 md:p-12 rounded-4xl border-white/5 bg-white/2 relative group hover:bg-white/4 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                <Building2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Commercial Financing Solutions</h3>
            </div>

            <ul className="space-y-6">
              {[
                "Acquisition and refinance financing for multifamily, retail, office, industrial, hospitality, mixed-use, assisted living, self-storage, healthcare, and special-use properties",
                "Bridge financing for time-sensitive acquisitions, repositioning strategies, or transitional assets", "Ground-up construction and major renovation loans for development and value-add projects", "Lite-Doc or Full-Doc commercial mortgages with flexible terms and structured amortization"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group/item">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500/60 shrink-0 mt-1 transition-colors group-hover/item:text-emerald-400" />
                  <span className="text-zinc-300 text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Residential Column */}
          <div className="glass-panel p-8 md:p-12 rounded-4xl border-white/5 bg-white/2 relative group hover:bg-white/4 transition-colors duration-500">
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-amber-500/20 bg-amber-500/10">
                <Home className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Residential Investment Solutions</h3>
            </div>

            <ul className="space-y-6">
              {[
                "Fix & Flip, bridge, blanket, ground-up construction, and hard money financing for investors and builders seeking short-term or long-term project capital",
                "Landlord and rental portfolio expansion financing for scaling investment portfolios", "DSCR and bank statement qualification programs designed for real estate entrepreneurs", "No-Doc and Lite-Doc financing for complex borrower profiles and non-traditional income"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group/item">
                  <CheckCircle2 className="w-6 h-6 text-amber-500/60 shrink-0 mt-1 transition-colors group-hover/item:text-amber-400" />
                  <span className="text-zinc-300 text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Tagline */}
        <div className="mt-20 text-center max-w-4xl mx-auto border-t border-white/5 pt-12">
          <p className="text-xl md:text-2xl italic font-medium leading-relaxed bg-clip-text text-transparent bg-linear-to-r from-zinc-300 via-white to-zinc-500">
            Every solution is structured around your financial profile, property type, and exit strategy — not the other way around.
          </p>
        </div>
      </div>
    </section>
  );
}
