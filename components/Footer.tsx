"use client";

import Image from "next/image";
import { useState } from "react";
import LegalModal from "./LegalModal";

export default function Footer() {
  const [activeModal, setActiveModal] = useState < string | null > (null);

  const footerModalContent: Record<string, React.ReactNode> = {
    "Legal & Terms, Privacy": (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold mb-2">Disclosure</h4>
          <p className="text-zinc-400 text-sm">
            EZMortgageLender.com® is a mortgage brokerage and loan advisory platform. We connect borrowers with a network of over 200+ lenders and private investors. Soft offers and pre-qualifications are estimates only and do not constitute a commitment to lend or guarantee of financing. All loans are subject to underwriting approval, credit qualification, and property appraisal.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Privacy Policy</h4>
          <p className="text-zinc-400 text-sm">
            Your privacy is important to us. We collect information you provide directly to us through our AI tools and contact forms. We implement industry-standard security measures to protect your information and do not sell your personal data to third parties.
          </p>
        </div>
      </div>
    ),
  };

  return (
    <>
      <footer className="relative w-full overflow-hidden">
        {/* Upper Background Section with CTA */}
        <div className="relative py-24 px-6 min-h-[300px] flex items-center overflow-hidden">
          {/* Background Image with Blended Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/footer-cta-bg.png"
              alt="Commercial Building Background"
              fill
              className="object-cover opacity-20"
              priority
            />
            {/* Vibrant Gradient Overlay to blend with precise global background */}
            <div className="absolute inset-0 bg-linear-to-r from-[#6d28d9]/90 via-[#c026d3]/80 to-[#f6a47a]/50 mix-blend-color" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content */}
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                <span className="text-white">EZMortgageLender®</span>
              </h2>
              <p className="text-white/90 font-medium">Negotiate stronger. Move faster. Compete with confidence.</p>
            </div>

            {/* Right Column: Trust Logos */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-12 md:gap-16">
              <div className="flex flex-col items-center gap-4">
                <span className="text-white/90 font-bold uppercase tracking-widest text-sm">We're A Member Of</span>
                <div className="w-36 h-24 relative hover:scale-105 transition-transform duration-500 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/10 group overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none group-hover:from-white/10 transition-colors" />
                  <div className="relative w-full h-full">
                    <Image src="/aapl-logo.webp" alt="AAPL Member" fill className="object-contain" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <span className="text-white/90 font-bold uppercase tracking-widest text-sm">BBB Member</span>
                <div className="w-36 h-24 relative hover:scale-105 transition-transform duration-500 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/10 group overflow-hidden">
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
        <div className="bg-black/30 py-6 px-6 border-t border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-[11px] md:text-sm font-bold tracking-wide">
            <span className="text-white/80">Powered by: <a href="https://commerciallendingusa.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">Commercial Lending USA</a></span>
            <span className="hidden md:inline text-white/30">|</span>
            <button 
              onClick={() => setActiveModal("Legal & Terms, Privacy")}
              className="text-white hover:text-white/80 transition-colors"
            >
              Legal & Terms, Privacy
            </button>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="text-white/80">Copyrights ©2016-{new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <LegalModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={activeModal || ""}
        content={activeModal ? footerModalContent[activeModal] : null}
      />
    </>
  );
}
