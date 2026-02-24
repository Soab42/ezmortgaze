"use client";

import { ShieldCheck, Network, MapPin, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, MouseEvent } from "react";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: ShieldCheck,
    title: "30+ Years Underwriting Expertise",
    desc: "Backed by an extensive network of 200+ lenders and private investors to secure the very best terms for your specific scenario.",
    color: "#f59e0b",
  },
  {
    icon: Network,
    title: "We Structure What Others Decline",
    desc: "Unique properties, non-traditional income, and complex scenarios — we specialize in solutions where traditional banks simply say no.",
    color: "#3b82f6",
  },
  {
    icon: Compass,
    title: "Transparent & Flexible Guidance",
    desc: "We walk you through structure, leverage, risk, and exit strategy so you move with absolute confidence and zero last-minute surprises.",
    color: "#8b5cf6",
  },
  {
    icon: MapPin,
    title: "Nationwide Lending Reach",
    desc: "Wherever your project is located, we connect you with capital that fits your specific market, asset class, and investment goals.",
    color: "#10b981",
  },
];

export default function WhyChooseUs() {
  const container = useRef < HTMLDivElement > (null);

  useGSAP(() => {
    gsap.fromTo(".wcu-badge",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: container.current, start: "top 80%", once: true }
      }
    );

    gsap.fromTo(".wcu-hdr",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: container.current, start: "top 80%", once: true }
      }
    );

    gsap.fromTo(".wcu-card",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.4,
        scrollTrigger: { trigger: ".wcu-cards", start: "top 85%", once: true }
      }
    );

    gsap.fromTo(".wcu-broker",
      { scale: 0.95, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.6,
        scrollTrigger: { trigger: ".wcu-broker", start: "top 85%", once: true }
      }
    );
  }, { scope: container });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll(".wcu-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <section id="why-choose" ref={container} className="relative py-32 px-6 overflow-hidden" style={{ zIndex: 1 }}>

      {/* Abstract Glowing Lines & Beams Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-violet-600/15 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] mix-blend-screen" />

        {/* Diagonal Light Rays */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 40px)' }}>
          <div className="absolute inset-0 bg-zinc-950 mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="wcu-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-indigo-500/20">
            <span className="text-sm font-semibold tracking-wider text-indigo-300 uppercase">
              Proven Track Record
            </span>
          </div>

          <h2
            className="wcu-hdr font-black mb-6 tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Trust</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Results</span>
          </h2>
          <p className="wcu-hdr max-w-2xl text-zinc-400 text-lg leading-relaxed">
            Relationships forged over decades. Capital deployed across every property type. We bring absolute certainty to complex deals.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          className="wcu-cards grid sm:grid-cols-1 md:grid-cols-2 gap-8 group"
          onMouseMove={handleMouseMove}
        >
          {reasons.map((r) => (
            <div
              key={r.title}
              className="wcu-card relative glass-panel overflow-hidden border-white/5 bg-zinc-900/40 transition-all duration-500 hover:border-white/20 hover:bg-zinc-800/60 p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 lg:gap-8 rounded-[32px] shadow-xl"
            >
              {/* Spotlight Follower */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`
                }}
              />

              <div className="relative z-10 w-20 h-20 shrink-0 rounded-2xl flex items-center justify-center border backdrop-blur-md shadow-2xl"
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
        <div className="wcu-broker mt-20 p-1 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-emerald-500/20 rounded-[36px] shadow-2xl">
          <div className="glass-panel p-10 lg:p-12 rounded-[32px] bg-zinc-950/80 backdrop-blur-2xl border-none flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                Are you a Mortgage Broker or Realtor?
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                We actively partner with industry professionals to provide immediate and reliable capital access. Stop losing deals because traditional lenders can't perform.
              </p>
            </div>
            <div className="shrink-0">
              <span className="px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer shadow-xl">
                Partner With Us
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
