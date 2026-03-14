"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Upper Background Section with CTA */}
      <div className="relative py-10 px-6 min-h-[100px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/footer-cta-bg.png"
            alt="Commercial Building Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
              >
                <TrendingUp className="w-7 h-7 md:w-9 md:h-9" style={{ color: "#020814" }} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight" style={{ fontFamily: "Outfit, sans-serif", color: "#f8fafc" }}>
                EZ<span className="gradient-text-gold">Mortgage</span>Lender
                <span className="text-xl md:text-2xl align-super" style={{ color: "#f59e0b" }}>®</span>
              </h2>
            </div>
            <p className="text-zinc-300 text-lg md:text-xl">Negotiate stronger. Move faster. Compete with confidence.</p>
          </div>

          {/* Right Column: Trust Logos */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 md:gap-16">
            <div className="flex flex-col items-center gap-4">
              <span className="text-zinc-300 font-bold uppercase tracking-widest text-sm">We're A Member Of</span>
              <div className="w-40 h-24 md:w-52 md:h-36 relative hover:scale-105 transition-transform duration-500 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/10 group overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none group-hover:from-white/10 transition-colors" />
                <div className="relative w-full h-full">
                  <Image src="/aapl-logo.webp" alt="AAPL Member" fill className="object-contain" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="text-zinc-300 font-bold uppercase tracking-widest text-sm">BBB Member</span>
              <div className="w-40 h-24 md:w-52 md:h-36 relative hover:scale-105 transition-transform duration-500 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/10 group overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none group-hover:from-white/10 transition-colors" />
                <div className="relative w-full h-full">
                  <Image src="/bbb-logo.png" alt="BBB Accredited" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-[#020814] py-6 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-[11px] md:text-sm font-bold tracking-wide">
          <span className="text-zinc-400">Powered by: <a href="https://commerciallendingusa.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-amber-500 transition-colors">Commercial Lending USA</a></span>
          <span className="hidden md:inline text-zinc-800">|</span>
          <Link
            href="/privacy-policy"
            className="text-white hover:text-amber-500 transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="hidden md:inline text-zinc-800">|</span>
            <Link
              href="/blog"
              className="text-white hover:text-amber-500 transition-colors"
            >
              Blog & Insights
            </Link>
            <span className="hidden md:inline text-zinc-800">|</span>
          <Link
            href="/terms-of-use"
            className="text-white hover:text-amber-500 transition-colors"
          >
            Legal Disclaimer
          </Link>
          <span className="hidden md:inline text-zinc-800">|</span>
          <span className="text-zinc-400">Copyrights ©2016-{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
