"use client";

import { Target, Building2, Home, Briefcase, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Instant Soft Estimate — No Impact on Credit",
    desc: "Receive a customized lending range in minutes with minimal input. Understand potential interest ranges, leverage, and options without risking your credit score.",
    color: "#3b82f6" // blue
  },
  {
    icon: Building2,
    title: "Built for Real Estate Investors & Commercial Operators",
    desc: "From office buildings and mixed-use assets to retail, industrial, multi-family and special-use properties — we structure financing around your deal, not a generic template.",
    color: "#10b981" // emerald
  },
  {
    icon: Home,
    title: "Residential Investment Loans That Scale with You",
    desc: "Fix-and-flip, rental acquisitions, DSCR programs, landlord portfolio loans, bank statement options, and no-doc/lite-doc solutions — even for complex income scenarios.",
    color: "#f59e0b" // amber
  },
  {
    icon: Briefcase,
    title: "Flexible Underwriting — Traditional & Alternative Capital",
    desc: "Bridge loans, construction financing, hard money, SBA, USDA B&I, FHA commercial, Fannie Mae programs, stated income options, and expanded investor placements through our nationwide network if needed.",
    color: "#8b5cf6" // violet
  },
  {
    icon: Zap,
    title: "Smart Technology + Experienced Loan Experts",
    desc: "AI speed combined with 30+ years of underwriting insight. Our experienced team is ready to step in, refine strategy, and guide your deal forward.",
    color: "#ec4899" // pink
  }
];

export default function WhySection() {
  return (
    <section id="why" className="relative py-24 px-6 overflow-hidden bg-[#020814]" style={{ zIndex: 1 }}>
      {/* Abstract Tech Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-blue-500/20 bg-white/5">
            <span className="text-sm font-bold tracking-widest text-blue-300 uppercase">
              The EZ Advantage
            </span>
          </div>
          <h2 className="font-black mb-6 tracking-tight leading-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Why This Is More Than <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-300">
              “Just Another Loan Quote?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className={`relative glass-panel overflow-hidden border-white/5 bg-white/3 p-8 flex flex-col gap-6 rounded-3xl group hover:bg-white/5 transition-colors duration-500 ${i === 3 || i === 4 ? "lg:col-span-1.5" : ""
                }`}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl border bg-white/5 backdrop-blur-md transition-transform duration-500 group-hover:scale-110"
                style={{ borderColor: `${feat.color}40` }}>
                <feat.icon className="w-7 h-7" style={{ color: feat.color }} />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-white tracking-tight">{feat.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-base">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
