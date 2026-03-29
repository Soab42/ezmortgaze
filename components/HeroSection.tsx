"use client";

import { useRef } from "react";
import { Zap, ArrowRight, ShieldCheck, Banknote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LiveOffersFeed from "./LiveOffersFeed";

gsap.registerPlugin(ScrollTrigger);

const trustStats = [
  { value: "30+", label: "Years Expertise" },
  { value: "200+", label: "Capital Sources" },
  { value: "$5B+", label: "Funded Volume" },
];


export default function HeroSection() {
  const container = useRef < HTMLDivElement > (null);

  return (
    <section
      id="hero"
      ref={container}
      className="relative min-h-[70vh] md:min-h-screen flex items-start pt-16 md:pt-24 overflow-hidden"
      style={{
        zIndex: 1,
        // background: 'linear-gradient(135deg, #6d28d9 0%, #c026d3 50%, #f6a47a 100%)'
        background: 'linear-gradient(135deg, #D45CC1 0%, #c026d3 50%, #f6a47a 100%)'
      }}
    >
      {/* Dynamic Glow Orbs */}
      {/* <div className="glow-orb opacity-80 w-[600px] h-[600px] bg-blue-600/50 top-0 left-0 -translate-x-1/4 -translate-y-1/4 mix-blend-screen z-0" />
      <div className="glow-orb opacity-80 w-[500px] h-[500px] bg-amber-500/40 bottom-0 right-0 translate-x-1/4 translate-y-1/4 mix-blend-screen z-0" /> */}

      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center relative z-10">

        {/* Left Column: Typography & CTAs */}
        <div className="flex flex-col items-start text-left lg:mt-0">
          <div className="hero-text flex items-center gap-3 px-4 py-2 rounded-full glass-panel mb-6 md:mb-8 border-amber-500/20">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium tracking-wide text-amber-100 uppercase">
              Fast. Flexible. Intelligent.
            </span>
          </div>

          <h1 className="hero-text font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 10vw, 4rem)" }}>
            Get Your AI-Driven Commercial & Residential Investment Loan Soft Offer {" "}
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              in Just 5 Minutes!
            </span>
          </h1>

          <p className="hero-text text-white/90 text-base md:text-xl max-w-xl leading-relaxed mb-8 md:mb-10 font-medium">
            Acquiring or refinancing your next residential investment, fix-and-flip, multifamily property, retail center, office, mixed use, or other commercial properties? Click and review our AI Generated Soft offer.
          </p>

          <div className="hero-text flex flex-col sm:flex-row gap-5 w-full sm:w-auto mb-12 md:mb-16">
            <a href="https://softoffer.commerciallendingusa.com/login" className="group relative px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-zinc-950 font-bold text-base md:text-lg overflow-hidden transition-transform hover:scale-105 inline-flex items-center justify-center gap-2">
              <span className="relative z-10">Get Soft Offer Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {/* <a href="#how-it-works" className="px-8 py-4 rounded-full border border-white/10 text-white font-medium text-lg flex items-center justify-center hover:bg-white/5 transition-colors">
              How it works
            </a> */}
          </div>
        </div>

        <LiveOffersFeed />
      </div>

      {/* Seamless bottom fade into the dark theme */}

    </section>
  );
}
