"use client";

import { useRef } from "react";
import { Zap, ArrowRight, ShieldCheck, Banknote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const trustStats = [
  { value: "30+", label: "Years Expertise" },
  { value: "200+", label: "Capital Sources" },
  { value: "$5B+", label: "Funded Volume" },
];

const LIVE_OFFERS = [
  { type: "Multifamily Refi", location: "Texas • DSCR", amount: "$2,450,000", ltv: "75%", rate: "6.5%", status: "Approved", colorClasses: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" },
  { type: "Fix & Flip Bridge", location: "Florida • High Leverage", amount: "$850,000", ltv: "85% LTC", rate: "9.5%", status: "Structuring", colorClasses: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
  { type: "Commercial Ground-Up", location: "Arizona • Development", amount: "$12,000,000", ltv: "65% LTC", rate: "8.2%", status: "Processing", colorClasses: "bg-violet-500/10 text-violet-400 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
  { type: "Short Term Rental", location: "Colorado • Cash Flow", amount: "$1,100,000", ltv: "80%", rate: "7.1%", status: "Funded", colorClasses: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]" },
  { type: "Mixed Use Acq", location: "New York • Value Add", amount: "$5,500,000", ltv: "70%", rate: "7.8%", status: "Underwriting", colorClasses: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.2)]" },
  { type: "Portfolio Refinance", location: "Ohio • 12 Doors", amount: "$3,200,000", ltv: "75%", rate: "6.8%", status: "Approved", colorClasses: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" },
  { type: "Multifamily Refi", location: "Texas • DSCR", amount: "$2,450,000", ltv: "75%", rate: "6.5%", status: "Approved", colorClasses: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" },
  { type: "Fix & Flip Bridge", location: "Florida • High Leverage", amount: "$850,000", ltv: "85% LTC", rate: "9.5%", status: "Structuring", colorClasses: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
  { type: "Commercial Ground-Up", location: "Arizona • Development", amount: "$12,000,000", ltv: "65% LTC", rate: "8.2%", status: "Processing", colorClasses: "bg-violet-500/10 text-violet-400 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
  { type: "Short Term Rental", location: "Colorado • Cash Flow", amount: "$1,100,000", ltv: "80%", rate: "7.1%", status: "Funded", colorClasses: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]" },
  { type: "Mixed Use Acq", location: "New York • Value Add", amount: "$5,500,000", ltv: "70%", rate: "7.8%", status: "Underwriting", colorClasses: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.2)]" },
  { type: "Portfolio Refinance", location: "Ohio • 12 Doors", amount: "$3,200,000", ltv: "75%", rate: "6.8%", status: "Approved", colorClasses: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" }
];

export default function HeroSection() {
  const container = useRef < HTMLDivElement > (null);
  const rightColumn = useRef < HTMLDivElement > (null);

  return (
    <section
      id="hero"
      ref={container}
      className="relative min-h-screen flex items-start pt-10 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Dynamic Glow Orbs */}
      <div className="glow-orb opacity-80 w-[600px] h-[600px] bg-blue-600/50 top-0 left-0 -translate-x-1/4 -translate-y-1/4 mix-blend-screen z-0" />
      <div className="glow-orb opacity-80 w-[500px] h-[500px] bg-amber-500/40 bottom-0 right-0 translate-x-1/4 translate-y-1/4 mix-blend-screen z-0" />

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center relative z-10">

        {/* Left Column: Typography & CTAs */}
        <div className="flex flex-col items-start text-left lg:mt-0">
          <div className="hero-text flex items-center gap-3 px-4 py-2 rounded-full glass-panel mb-8 border-amber-500/20">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium tracking-wide text-amber-100 uppercase">
              Fast. Flexible. Intelligent.
            </span>
          </div>

          <h1 className="hero-text font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(3.8rem, 7vw, 1.5rem)" }}>
            Get Your AI-Driven Commercial & Residential Investment Loan Soft Offer {" "}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              in Just 5 Minutes!
            </span>
          </h1>

          <p className="hero-text text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Acquiring or refinancing your next residential investment, fix-and-flip, multifamily property, retail center, office, mixed use, or other commercial properties? Click and review our AI Generated Soft offer.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-5 w-full sm:w-auto mb-16">
            <a href="https://softoffer.commerciallendingusa.com/login" className="group relative px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-lg overflow-hidden transition-transform hover:scale-105 inline-flex items-center justify-center gap-2">
              <span className="relative z-10">Get Soft Offer Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* <a href="#how-it-works" className="px-8 py-4 rounded-full border border-white/10 text-white font-medium text-lg flex items-center justify-center hover:bg-white/5 transition-colors">
              How it works
            </a> */}
          </div>
        </div>

        {/* Right Column: Infinite Live Offers Feed */}
        <div ref={rightColumn} className="relative w-full h-[800px] lg:h-[700px] hidden lg:flex items-center justify-center overflow-hidden perspective-midrange">

          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes marqueeUp {
              0% { transform: translateY(0); }
              100% { transform: translateY(-50%); }
            }
            .animate-marquee-up {
              animation: marqueeUp 80s linear infinite;
            }
            .animate-marquee-up-fast {
              animation: marqueeUp 60s linear infinite;
            }
            .animate-marquee-up:hover, .animate-marquee-up-fast:hover {
              animation-play-state: paused;
            }
            .fade-mask {
              mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
              -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
            }
          `}} />

          {/* 3D Container to strongly tilt the feed for massive depth */}
          <div className="absolute inset-0 fade-mask flex gap-6 justify-center items-center rotate-6 -rotate-y-35 rotate-x-10 scale-[1.4] origin-right">

            {/* Column 1 (Slower) */}
            <div className="w-[260px] flex flex-col animate-marquee-up">
              {[...LIVE_OFFERS, ...LIVE_OFFERS].map((offer, i) => (
                <div key={`col1-${i}`} className="w-full glass-panel p-5 rounded-3xl mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/5 bg-zinc-900/60 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/80 hover:border-white/20 cursor-default">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">{offer.location}</span>
                    <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full border ${offer.colorClasses}`}>
                      {offer.status}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-[15px] mb-1">{offer.type}</h4>
                  <div className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-400 mb-4 tracking-tight">
                    {offer.amount}
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase">LTV/LTC</span>
                      <span className="text-xs font-bold text-zinc-300">{offer.ltv}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase">Est. Rate</span>
                      <span className="text-xs font-bold text-white">{offer.rate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 (Faster, staggered start) */}
            <div className="w-[260px] flex flex-col animate-marquee-up-fast">
              {[...LIVE_OFFERS.slice(3).concat(LIVE_OFFERS.slice(0, 3)), ...LIVE_OFFERS.slice(3).concat(LIVE_OFFERS.slice(0, 3))].map((offer, i) => (
                <div key={`col2-${i}`} className="w-full glass-panel p-5 rounded-3xl mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/5 bg-zinc-950/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-900/80 hover:border-white/20 cursor-default">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">{offer.location}</span>
                    <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full border ${offer.colorClasses}`}>
                      {offer.status}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-[15px] mb-1">{offer.type}</h4>
                  <div className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-400 mb-4 tracking-tight">
                    {offer.amount}
                  </div>
                  <div className="flex justify-between items-center border-t border-white/5 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase">LTV/LTC</span>
                      <span className="text-xs font-bold text-zinc-300">{offer.ltv}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-zinc-500 font-semibold uppercase">Est. Rate</span>
                      <span className="text-xs font-bold text-white">{offer.rate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
