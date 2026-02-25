"use client";

import { ShieldCheck, Network, MapPin, Compass, ArrowRight } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "30+ Years of Underwriting & Capital Placement Expertise",
    desc: "Backed by a network of 200+ lenders and private investors.",
    color: "#f59e0b",
  },
  {
    icon: Network,
    title: "We Structure What Others Decline",
    desc: "Unique properties, non-traditional income, complex scenarios — we specialize in solutions.",
    color: "#3b82f6",
  },
  {
    icon: Compass,
    title: "Flexible Capital with Transparent Guidance",
    desc: "We walk you through structure, leverage, risk, and exit strategy so you move with confidence.",
    color: "#8b5cf6",
  },
  {
    icon: MapPin,
    title: "Nationwide Lending Reach",
    desc: "Wherever your project is located, we connect you with capital that fits.",
    color: "#10b981",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose" className="relative py-24 px-6 overflow-hidden bg-[#020814]" style={{ zIndex: 1 }}>

      {/* Abstract Glowing Lines & Beams Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-violet-600/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-indigo-500/20 bg-white/5">
            <span className="text-sm font-semibold tracking-wider text-indigo-300 uppercase">
              Proven Track Record
            </span>
          </div>

          <h2 className="font-black mb-6 tracking-tight leading-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Why Investors Choose Us?
          </h2>
          <p className="max-w-2xl text-zinc-400 text-lg leading-relaxed">
            Relationships forged over decades. Capital deployed across every property type. We bring absolute certainty to complex deals.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="relative glass-panel overflow-hidden border-white/5 bg-white/2 p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 lg:gap-8 rounded-4xl shadow-2xl transition-all duration-500 hover:bg-white/5 hover:-translate-y-2 hover:shadow-indigo-500/10 hover:border-white/10"
            >
              <div className="relative z-10 w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center border backdrop-blur-md shadow-inner transition-transform duration-500"
                style={{ background: `linear-gradient(135deg, ${r.color}20, transparent)`, borderColor: `${r.color}30` }}>
                <r.icon className="w-10 h-10" style={{ color: r.color }} />
              </div>

              <div className="relative z-10 flex-1 flex flex-col justify-center h-full pt-1">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{r.title}</h3>
                <p className="text-zinc-400 text-base leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Broker / Realtor Banner */}
        <div className="mt-20 p-px bg-linear-to-r from-indigo-500/20 via-blue-500/20 to-emerald-500/20 rounded-4xl shadow-2xl">
          <div className="glass-panel p-10 lg:p-12 rounded-[inherit] bg-zinc-950/80 backdrop-blur-2xl border-none flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Are you a Mortgage Broker or Realtor?
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                We actively partner with industry professionals to provide immediate and reliable capital access. Stop losing deals because traditional lenders can't perform.
              </p>
            </div>
            <div className="shrink-0">
              <span className="px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-xl">
                Partner With Us
                <ArrowRight className="w-5 h-5 stroke-[3px]" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
