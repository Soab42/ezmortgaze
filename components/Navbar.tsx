"use client";

import { useState } from "react";
import { Menu, X, TrendingUp, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Why Us", href: "#why" },
  { label: "Loan Programs", href: "#programs" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Choose Us", href: "#why-choose" },
  { label: "Get Offer", href: "#soft-offer" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 w-full bg-[#020814]/90 backdrop-blur-md border-b border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}
          >
            <TrendingUp className="w-5 h-5" style={{ color: "#020814" }} />
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "Outfit, sans-serif", color: "#f8fafc" }}
          >
            EZ<span className="gradient-text-gold">Mortgage</span>Lender
            <span className="text-xs align-super" style={{ color: "#f59e0b" }}>®</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {/* {navLinks.slice(0, 4).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 no-underline hover:text-[#fbbf24] text-[#94a3b8]"
              >
                {link.label}
              </Link>
            </li>
          ))} */}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:18005550199"
            className="flex items-center gap-2 text-sm font-semibold text-[#f8fafc] hover:text-[#fbbf24] transition-colors no-underline group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#fbbf24]/30">
              <Phone className="w-4 h-4 text-[#fbbf24]" />
            </div>
            <span>800-555-0199</span>
          </a>
          <Link
            href="https://softoffer.commerciallendingusa.com/login"
            className="btn-gold px-6 py-2.5 text-sm no-underline"
          >
            Get AI Soft Offer →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#020814]/95 backdrop-blur-xl border-b border-white/5 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium no-underline hover:text-[#fbbf24] transition-colors text-[#94a3b8]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:18005550199"
            className="flex items-center justify-center gap-2 text-lg font-bold text-[#f8fafc] py-4 bg-white/5 rounded-xl border border-white/10 no-underline mb-2"
          >
            <Phone className="w-5 h-5 text-[#fbbf24]" />
            <span>800-555-0199</span>
          </a>
          <Link
            href="https://softoffer.commerciallendingusa.com/login"
            className="btn-gold px-6 py-3 text-center text-sm mt-2 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Get AI Soft Offer →
          </Link>
        </div>
      )}
    </nav>
  );
}
