"use client";

import { useState, useEffect } from "react";
import { Menu, X, TrendingUp, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        .nav-slanted-btn {
          position: relative;
          padding: 0.6rem 1.8rem;
          background: transparent;
          transform: skewX(-20deg);
          box-shadow: 0 4px 15px -3px rgba(0, 0, 0, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 1;
        }

        .nav-slanted-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.2);
          backdrop-blur: 12px;
          z-index: -1;
        }

        /* The sliding hover part of the button background */
        .nav-slanted-btn .hover-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .nav-slanted-btn:hover .hover-bg {
          transform: translateX(0);
        }

        .nav-slanted-btn:hover {
          border-bottom-color: #fbbf24;
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);
          transform: skewX(-20deg) translateY(-2px);
        }

        .nav-slanted-btn .btn-content {
          transform: skewX(20deg);
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .nav-link-slanted {
          position: relative;
          padding: 0.5rem 1.25rem;
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }

        .nav-link-slanted:hover {
          color: #f8fafc;
        }

        .nav-link-slanted::after {
          content: "";
          position: absolute;
          z-index: 10;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: linear-gradient(135deg,#f59e0b,#d97706);
          transition: width 0.3s ease;
          transform: skewX(-20deg);
        }

        .nav-link-slanted:hover::after {
          width: 100%;
        }

        .btn-running-border {
          overflow: hidden;
          z-index: 10;
          padding: 1px; /* border thickness */
        }

        .btn-running-border::after {
          content: "";
          position: absolute;
          z-index: -1;
          left: -100%;
          top: -100%;
          width: 300%;
          height: 300%;
          background: conic-gradient(
            from 180deg,
            transparent 0deg,
            transparent 340deg,
            #fbbf24 350deg,
            #fff 360deg
          );
          animation: rotate 2.5s linear infinite;
        }

        .btn-running-border::before {
          content: "";
          position: absolute;
          inset: 1px;
          background: #f59e0b;
          backdrop-filter: blur(10px);
          z-index: 0;
        }

        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 w-full p-2">
        {/* Base Background: Small blur */}
        <div className="absolute inset-0 bg-transparent backdrop-blur-sm border-b border-transparent z-[-1]" />

        {/* Scrolled Background: Gradient and large blur fading in */}
        <div className={`absolute inset-0 bg-linear-to-br from-[#6d28d9]/40 via-[#020814]/20 to-transparent backdrop-blur-xl border-b border-white/5 z-[-1] transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline group relative h-20 w-24 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="EZ Mortgage Lender Logo"
              fill
              // sizes="(max-width: 768px) 192px, 192px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="tel:8555989900"
              className="group flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl transition-colors no-underline"
            >
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#fbbf24]/30 transition-colors">
                <Phone className="w-4 h-4 text-[#fbbf24]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#fbbf24] font-bold uppercase tracking-widest leading-none mb-1">Toll Free</span>
                <span className="text-sm font-bold text-white group-hover:text-[#fbbf24] transition-colors">(855) 598-9900</span>
              </div>
            </a>
            <Link
              href="/blog"
              className="nav-slanted-btn no-underline"
            >
              <div className="hover-bg" />
              <div className="btn-content">
                <span className="text-sm font-black text-white group-hover:text-zinc-950 uppercase tracking-tight transition-colors">
                  Blogs
                </span>
              </div>
            </Link>
            <Link
              href="https://softoffer.commerciallendingusa.com/login"
              className="nav-slanted-btn btn-running-border no-underline"
            >
              <div className="hover-bg" />
              <div className="btn-content p-2">
                <span className="text-sm font-black text-white group-hover:text-zinc-950 uppercase tracking-tight transition-colors">
                  Get AI Soft Offer
                </span>
              </div>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
            className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#020814]/fb backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            <Link
              href="/blog"
              className="nav-slanted-btn no-underline w-full py-5"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-base font-black text-white uppercase tracking-tight">
                Blogs
              </span>
            </Link>
          <Link
            href="https://softoffer.commerciallendingusa.com/login"
              className="nav-slanted-btn no-underline w-full py-5"
            onClick={() => setMenuOpen(false)}
          >
              <span className="text-base font-black text-white uppercase tracking-tight">
                Get AI Soft Offer
              </span>
          </Link>

            <a
              href="tel:8555989900"
              className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 no-underline"
            >
              <Phone className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-bold text-white">(855) 598-9900</span>
            </a>
        </div>
      )}
      </nav >
    </>
  );
}
