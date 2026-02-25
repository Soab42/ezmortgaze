"use client";

import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Dynamic Glow Orbs */}
      <div className="glow-orb opacity-60 w-[800px] h-[800px] bg-blue-600/30 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen z-0 blur-[120px]" />
      <div className="glow-orb opacity-40 w-[600px] h-[600px] bg-amber-500/20 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 mix-blend-screen z-0 blur-[100px]" />

      <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center relative z-10">
        {/* Top Badge */}
        <div className="flex items-center gap-3 px-6 py-2 rounded-full glass-panel mb-10 border-amber-500/20 bg-white/5 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-bold tracking-[0.2em] text-amber-100 uppercase">
            Fast. Flexible. Intelligent.
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-black leading-[1.1] tracking-tight mb-10 text-white"
          style={{ fontSize: "clamp(2.5rem, 6vw, 3.5rem)" }}>
          Get Your AI-Driven Commercial & Residential Investment Loan Soft Offer in Just{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-200 via-amber-400 to-amber-600">
            5 Minutes!
          </span>
        </h1>

        {/* Content Body */}
        <div className="space-y-8 max-w-3xl">
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed">
            Acquiring or refinancing your next residential investment, fix-and-flip, multifamily property, retail center, office, mixed use, or other commercial properties? Before committing to hard money, bridge loans, no-doc, lite-doc, construction, or long-term financing — <strong>get clarity first.</strong>
          </p>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
            <span className="text-amber-400/90 font-medium">EZMortgageLender.com®</span> delivers a powerful AI-generated soft offer that shows your estimated lending range upfront — without a hard credit pull or complete application. Know where you stand before you structure your deal.
          </p>

          <div className="py-6 border-y border-white/5">
            <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500 tracking-tight italic">
              "Negotiate stronger. Move faster. Compete with confidence."
            </div>
          </div>

          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
            Built for Mortgage Brokers, Realtors, and Direct Borrowers, this tool helps you evaluate scenarios instantly, set realistic expectations, and position every transaction for success.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-14 w-full flex flex-col items-center gap-6">
          <Link
            href="https://softoffer.commerciallendingusa.com/login"
            className="group relative px-10 py-5 rounded-full bg-white text-zinc-950 font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Get My AI Soft Offer
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link href="#how-it-works" className="text-zinc-500 hover:text-white transition-colors font-medium border-b border-transparent hover:border-white/20 pb-1">
            Learn more about the AI engine
          </Link>
        </div>
      </div>
    </section>
  );
}
