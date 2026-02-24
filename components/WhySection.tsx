"use client";

import { MouseEvent, useRef } from "react";
import { Zap, Target, Building2, Briefcase, Handshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Target,
    title: "Instant Soft Estimate",
    desc: "Receive a customized lending range in minutes with minimal input. Understand potential interest ranges, leverage, and options without risking your credit score.",
    colSpan: "lg:col-span-2",
    color: "#3b82f6" // blue
  },
  {
    icon: Building2,
    title: "Built for Operators",
    desc: "From office buildings to mixed-use and multi-family assets — we structure financing around your deal.",
    colSpan: "lg:col-span-1",
    color: "#10b981" // emerald
  },
  {
    icon: Briefcase,
    title: "Residential Scale",
    desc: "Fix-and-flip, rental acquisitions, DSCR programs, and no-doc/lite-doc solutions for complex income scenarios.",
    colSpan: "lg:col-span-1",
    color: "#f59e0b" // amber
  },
  {
    icon: Handshake,
    title: "Flexible Underwriting",
    desc: "Bridge, hard money, SBA, USDA B&I, stated income options, and expanded investor placements nationwide.",
    colSpan: "lg:col-span-2",
    color: "#8b5cf6" // violet
  },
  {
    icon: Zap,
    title: "Smart Tech + Experts",
    desc: "AI speed combined with 30+ years of underwriting insight to refine strategy and guide your deal forward.",
    colSpan: "lg:col-span-3",
    color: "#ec4899" // pink
  }
];

export default function WhySection() {
  const containerRef = useRef < HTMLDivElement > (null);

  useGSAP(() => {
    // Standard entrance animation, plays only once
    gsap.fromTo(".bento-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll(".bento-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    });
  };

  return (
    <section id="why" ref={containerRef} className="relative py-24 px-6 overflow-hidden" style={{ zIndex: 1 }}>

      {/* Abstract Tech Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
        <div className="absolute inset-0 bg-zinc-950 mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_20%,black_100%)]" />
      </div>

      {/* Ambient Light Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-y-1/3 -translate-x-1/3 z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 bento-card">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-blue-500/20">
            <span className="text-sm font-medium tracking-wide text-blue-300 uppercase">
              Strategic Advantage
            </span>
          </div>
          <h2 className="font-black mb-6 tracking-tight leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            More Than Just a <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-300">
              Loan Quote
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg leading-relaxed">
            We don&apos;t just crunch numbers — we deliver strategic clarity that helps you negotiate stronger and close faster.
          </p>
        </div>

        {/* Bento Grid layout with Mouse Spotlight */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group"
          onMouseMove={handleMouseMove}
        >
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className={`bento-card relative glass-panel overflow-hidden border-white/5 bg-white/5 transition duration-300 hover:border-white/20 p-8 flex flex-col gap-5 ${feat.colSpan}`}
            >
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.06), transparent 40%)`
                }}
              />

              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl border bg-white/5 backdrop-blur-md"
                style={{ borderColor: `${feat.color}40` }}>
                <feat.icon className="w-6 h-6" style={{ color: feat.color }} />
              </div>

              <div className="relative z-10 flex flex-col grow">
                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
