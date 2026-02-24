"use client";

import { TrendingUp, ExternalLink } from "lucide-react";

const links = {
  Programs: ["Fix & Flip Loans", "DSCR Loans", "Bridge Loans", "Hard Money", "Commercial Mortgages", "Construction Loans"],
  Company:  ["About Us", "Contact", "Mortgage Brokers", "Realtors", "Direct Borrowers"],
  Legal:    ["Disclosure", "Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
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
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: "#020814" }} />
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "Outfit, sans-serif", color: "#f8fafc" }}
              >
                EZ<span className="gradient-text-gold">Mortgage</span>Lender
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl w-fit"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span style={{ color: "#94a3b8", fontSize: "0.78rem", fontWeight: 600 }}>
                  🏅 BBB Accredited Business
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl w-fit"
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
              <ul className="flex flex-col gap-2.5 list-none">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm no-underline transition-colors duration-200 flex items-center gap-1.5 group"
                      style={{ color: "#475569" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#94a3b8")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#475569")}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

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
  );
}
