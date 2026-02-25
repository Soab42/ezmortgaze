"use client";

import { TrendingUp, ExternalLink } from "lucide-react";
import { useState } from "react";
import LegalModal from "./LegalModal";

const links = {
  Programs: ["Fix & Flip Loans", "DSCR Loans", "Bridge Loans", "Hard Money", "Commercial Mortgages", "Construction Loans"],
  Company:  ["About Us", "Contact", "Mortgage Brokers", "Realtors", "Direct Borrowers"],
  Legal:    ["Disclosure", "Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const footerModalContent: Record<string, React.ReactNode> = {
  "About Us": (
    <div className="space-y-6">
      <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-blue-500/20 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <TrendingUp className="w-16 h-16 text-amber-500 opacity-50" />
        </div>
      </div>
      <p className="text-lg text-white font-medium">Empowering Investors Through Intelligent Capital.</p>
      <p>EZMortgageLender.com® was founded on a simple principle: high-stakes real estate deals shouldn't be held back by slow, opaque lending processes. We've merged decades of underwriting expertise with cutting-edge AI to bring absolute certainty to the funding journey.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <h5 className="text-amber-400 font-bold mb-2">Our Mission</h5>
          <p className="text-sm">To provide instant, accurate pre-qualifications and connect investors with the most competitive capital in the market.</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <h5 className="text-blue-400 font-bold mb-2">Our Reach</h5>
          <p className="text-sm">With a network of 200+ lenders nationwide, we have the flexibility to fund scenarios that traditional banks won't touch.</p>
        </div>
      </div>
    </div>
  ),
  "Contact": (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
        <h4 className="text-xl font-bold text-white mb-2">Get in Touch</h4>
        <p className="text-amber-200/80">Our advisory team is ready to structure your next deal.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h5 className="text-white font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-amber-500">📍</span>
            Corporate Office
          </h5>
          <p className="text-sm pl-10 text-zinc-400">
            Headquartered in Innovation District<br />
            Representing deals across all 50 States.
          </p>
        </div>
        <div className="space-y-4">
          <h5 className="text-white font-bold flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-500">📧</span>
            Direct Inquiries
          </h5>
          <p className="text-sm pl-10 text-zinc-400">
            General: deals@ezmortgagelender.com<br />
            Brokers: partners@ezmortgagelender.com
          </p>
        </div>
      </div>
      <div className="pt-6 border-t border-white/5 text-center">
        <p className="text-xs text-zinc-500 italic">Expected response time: Under 120 minutes during market hours.</p>
      </div>
    </div>
  ),
  "Disclosure": (
    <div className="space-y-4">
      <p>EZMortgageLender.com® is a mortgage brokerage and loan advisory platform. We connect borrowers with a network of over 200+ lenders and private investors.</p>
      <p><strong>Note:</strong> Soft offers and pre-qualifications are estimates only and do not constitute a commitment to lend or guarantee of financing. All loans are subject to underwriting approval, credit qualification, and property appraisal.</p>
      <p>Programs, rates, and terms are subject to change without notice. Not all applicants will qualify. This is not an offer to extend credit as defined by the Equal Credit Opportunity Act.</p>
    </div>
  ),
  "Privacy Policy": (
    <div className="space-y-4">
      <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
      <h4 className="text-white font-bold">1. Information We Collect</h4>
      <p>We collect information you provide directly to us through our AI soft-offer tools, contact forms, and email communications.</p>
      <h4 className="text-white font-bold">2. How We Use Information</h4>
      <p>We use your information to provide loan estimates, connect you with lenders, and improve our services. We do not sell your personal data to third parties for marketing purposes.</p>
      <h4 className="text-white font-bold">3. Data Security</h4>
      <p>We implement industry-standard security measures to protect your information from unauthorized access or disclosure.</p>
    </div>
  ),
  "Terms of Service": (
    <div className="space-y-4">
      <p>By using EZMortgageLender.com®, you agree to complies with these Terms of Service.</p>
      <h4 className="text-white font-bold">1. Use of Services</h4>
      <p>Our platform is intended for real estate investors and professionals. You agree to provide accurate information when using our tools.</p>
      <h4 className="text-white font-bold">2. No Financial Advice</h4>
      <p>The information provided on this site is for educational/informational purposes and does not constitute financial, legal, or tax advice.</p>
      <h4 className="text-white font-bold">3. Limitation of Liability</h4>
      <p>EZMortgageLender.com® is not liable for any losses arising from the use of our platform or reliance on its estimates.</p>
    </div>
  ),
  "Cookie Policy": (
    <div className="space-y-4">
      <p>We use cookies to enhance your experience and analyze our traffic.</p>
      <h4 className="text-white font-bold">1. Essential Cookies</h4>
      <p>Necessary for the website to function properly, such as maintaining your session.</p>
      <h4 className="text-white font-bold">2. Analytical Cookies</h4>
      <p>Help us understand how visitors interact with our site so we can improve the user experience.</p>
      <h4 className="text-white font-bold">3. Managing Cookies</h4>
      <p>You can control or disable cookies through your browser settings, though some site features may be affected.</p>
    </div>
  ),
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState < string | null > (null);

  return (
    <>
      <footer
        className="relative pt-16 pb-8 px-6"
        style={{
          zIndex: 1,
          borderTop: "1px solid rgba(251,191,36,0.12)",
          background: "rgba(2,8,20,0.7)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top grid */}
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
                >
                  <TrendingUp className="w-5 h-5 transition-transform group-hover:rotate-12" style={{ color: "#020814" }} />
                </div>
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#f8fafc" }}
                >
                  EZ<span className="bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-amber-600">Mortgage</span>Lender
                  <span className="text-xs align-super" style={{ color: "#f59e0b" }}>®</span>
                </span>
              </div>
              <p style={{ color: "#475569", fontSize: "0.85rem", lineHeight: "1.7" }}>
                AI-driven commercial &amp; residential investment loan soft offers. Fast. Flexible.
                Intelligent.
              </p>

              {/* Trust badges */}
              <div className="flex flex-col gap-2 mt-5">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl w-fit transition-all hover:bg-white/5 active:scale-95 cursor-default"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600 }}>
                    🏅 BBB Accredited Business
                  </span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl w-fit transition-all hover:bg-white/5 active:scale-95 cursor-default"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600 }}>
                    🌐 Nationwide Lender Network
                  </span>
                </div>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <h4
                  className="font-bold mb-4 text-sm uppercase tracking-widest"
                  style={{ fontFamily: "Outfit, sans-serif", color: "#f59e0b" }}
                >
                  {heading}
                </h4>
                <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                  {items.map((item) => (
                    <li key={item}>
                      {(heading === "Legal" || (heading === "Company" && (item === "About Us" || item === "Contact"))) ? (
                        <button
                          type="button"
                          onClick={() => setActiveModal(item)}
                          className="text-sm no-underline bg-transparent border-none p-0 flex items-center gap-1.5 transition-all duration-300 hover:text-zinc-300 hover:translate-x-1 cursor-pointer"
                          style={{ color: "#475569" }}
                        >
                          {item}
                        </button>
                      ) : (
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            className="text-sm no-underline transition-all duration-300 flex items-center gap-1.5 hover:text-zinc-300 hover:translate-x-1"
                            style={{ color: "#475569" }}
                          >
                            {item}
                          </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-amber-500/20 to-transparent mb-8" />

          {/* Disclaimer */}
          <p style={{ color: "#334155", fontSize: "0.75rem", lineHeight: "1.7", marginBottom: "20px" }}>
            <strong style={{ color: "#475569" }}>Disclosure:</strong> EZMortgageLender.com® is a
            mortgage brokerage and loan advisory platform. Soft offers and pre-qualifications are
            estimates only and do not constitute a commitment to lend or guarantee of financing.
            All loans are subject to underwriting approval, credit qualification, and property
            appraisal. Programs, rates, and terms are subject to change without notice. Not all
            applicants will qualify. This is not an offer to extend credit as defined by Equal
            Credit Opportunity Act.
          </p>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={{ color: "#334155", fontSize: "0.78rem" }}>
              © {new Date().getFullYear()} EZMortgageLender.com® · All Rights Reserved.
            </p>
            <div className="flex items-center gap-1" style={{ color: "#334155", fontSize: "0.78rem" }}>
              <ExternalLink className="w-3 h-3" />
              <span>NMLS Consumer Access</span>
            </div>
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
