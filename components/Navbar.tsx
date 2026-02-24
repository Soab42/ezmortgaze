"use client";

import { useState, useEffect } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Why Us", href: "#why" },
  { label: "Loan Programs", href: "#programs" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Choose Us", href: "#why-choose" },
  { label: "Get Offer", href: "#soft-offer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
      style={{
        background: scrolled
          ? "rgba(2,8,20,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(251,191,36,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
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
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.slice(0, 4).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 no-underline"
                style={{ color: "#94a3b8" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#fbbf24")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#94a3b8")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#soft-offer"
            className="btn-gold px-6 py-2.5 text-sm no-underline"
          >
            Get AI Soft Offer →
          </a>
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
        <div className="md:hidden mobile-menu px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium no-underline"
              style={{ color: "#94a3b8" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#soft-offer"
            className="btn-gold px-6 py-3 text-center text-sm mt-2 no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Get AI Soft Offer →
          </a>
        </div>
      )}
    </nav>
  );
}
