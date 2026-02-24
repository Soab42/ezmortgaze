"use client";

import { useState, FormEvent, useRef } from "react";
import { Loader2, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const propertyTypes = [
  "Select Property Type", "Multifamily (5+ units)", "Retail / Shopping Center",
  "Office Building", "Industrial / Warehouse", "Hospitality / Hotel",
  "Mixed-Use Property", "Assisted Living / Healthcare", "Self-Storage",
  "Single Family Investment", "2-4 Unit Residential", "Fix & Flip",
  "Ground-Up Construction", "Special Use / Other",
];

const loanPurposes = [
  "Select Loan Purpose", "Purchase / Acquisition", "Refinance (Cash-Out)",
  "Refinance (Rate & Term)", "Bridge / Short-Term", "Construction",
  "Renovation / Rehab",
];

const creditRanges = [
  "Select Credit Score", "750+", "700–749", "660–699", "620–659",
  "580–619", "Below 580", "Unknown / Not Checked",
];

const loanAmounts = [
  "Select Loan Amount", "Under $150k", "$150k–$500k", "$500k–$1M",
  "$1M–$2.5M", "$2.5M–$5M", "$5M–$10M", "$10M–$25M", "$25M+",
];

const states = [
  "Select State", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
  "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

type FormState = "idle" | "loading" | "success";

export default function SoftOfferForm() {
  const container = useRef < HTMLDivElement > (null);
  const [formState, setFormState] = useState < FormState > ("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    propertyType: "", loanPurpose: "",
    loanAmount: "", estimatedValue: "",
    creditRange: "", state: "",
  });

  useGSAP(() => {
    gsap.from(".sof-hdr", {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%" }
    });
    gsap.from(".sof-card", {
      scale: 0.95, y: 30, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2,
      scrollTrigger: { trigger: ".sof-card", start: "top 85%" }
    });
  }, { scope: container });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setTimeout(() => setFormState("success"), 3000);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="soft-offer" ref={container} className="relative py-32 px-6" style={{ zIndex: 1 }}>

      {/* Intense Ambient Glow behind form */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-30 blur-[150px] mix-blend-screen"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.6) 0%, rgba(59,130,246,0.3) 50%, transparent 100%)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <div className="sof-hdr text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-amber-500/20">
            <span className="text-sm font-medium tracking-wide text-amber-300 uppercase">
              Free & Confidential
            </span>
          </div>
          <h2 className="font-black tracking-tight leading-[1.1] mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Your 5-Minute <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              AI Soft Pre-Qual
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-lg leading-relaxed">
            Discover your true borrowing power before committing. No hard credit pull.
          </p>
        </div>

        {/* Ultra-Glassy Form Container */}
        <div className="sof-card relative p-[1px] rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/10 to-white/0 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-3xl" />

          <div className="relative z-10 p-8 md:p-14">
            {formState === "success" ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                </div>
                <h3 className="font-black text-3xl text-white mb-4 tracking-tight">
                  Your File Is Under Review!
                </h3>
                <p className="text-zinc-400 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                  Our algorithm and underwriting team are analyzing your structure. We will reach out shortly with your custom soft offer.
                </p>
                <div className="px-5 py-2 rounded-full glass-panel border-emerald-500/20 text-emerald-300 font-medium text-sm inline-flex items-center gap-2">
                  <Lock className="w-4 h-4" /> No Impact To Credit Score
                </div>
              </div>
            ) : formState === "loading" ? (
              <div className="text-center py-20 flex flex-col items-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-amber-500/20 blur-[2px] scale-150 animate-ping" />
                  <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/40 relative z-10">
                    <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
                  </div>
                </div>
                <h3 className="font-black text-2xl text-white mb-3 tracking-wide">
                  AI Analyzing Structure...
                </h3>
                <p className="text-zinc-500 text-lg">
                  Evaluating leverage, property type, and optimal capital paths.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">

                {/* Visual Section Break */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-amber-500/80 mb-5 border-b border-white/5 pb-2">
                    1. Borrower Info
                  </h4>
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="text" required placeholder="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all" />
                    <input type="email" required placeholder="Email Address" value={form.email} onChange={(e) => update("email", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all" />
                  </div>
                </div>

                {/* Visual Section Break */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-blue-500/80 mb-5 border-b border-white/5 pb-2 mt-2">
                    2. Loan Parameters
                  </h4>
                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <select required value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-blue-500/50 transition-all">
                      {propertyTypes.map((t) => <option key={t} value={t === "Select Property Type" ? "" : t}>{t}</option>)}
                    </select>
                    <select required value={form.loanPurpose} onChange={(e) => update("loanPurpose", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-blue-500/50 transition-all">
                      {loanPurposes.map((p) => <option key={p} value={p === "Select Loan Purpose" ? "" : p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <select required value={form.loanAmount} onChange={(e) => update("loanAmount", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-blue-500/50 transition-all">
                      {loanAmounts.map((a) => <option key={a} value={a === "Select Loan Amount" ? "" : a}>{a}</option>)}
                    </select>
                    <input type="text" placeholder="Est. Property Value (e.g. $1,250,000)" value={form.estimatedValue} onChange={(e) => update("estimatedValue", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-all" />
                  </div>
                </div>

                {/* Final Row */}
                <div className="grid md:grid-cols-2 gap-5 mt-2">
                  <select required value={form.creditRange} onChange={(e) => update("creditRange", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-white/20 transition-all">
                    {creditRanges.map((c) => <option key={c} value={c === "Select Credit Score" ? "" : c}>{c}</option>)}
                  </select>
                  <select required value={form.state} onChange={(e) => update("state", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-white/20 transition-all">
                    {states.map((s) => <option key={s} value={s === "Select State" ? "" : s}>{s}</option>)}
                  </select>
                </div>

                {/* Submit button */}
                <div className="mt-8 relative">
                  <button type="submit" className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black text-xl py-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300 shadow-[0_10px_40px_rgba(245,158,11,0.3)]">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Generate Soft Offer <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                </div>

                <p className="text-center text-zinc-500 text-xs mt-2 leading-relaxed">
                  By submitting, you agree to be contacted by an EZMortgageLender.com® specialist. <br className="hidden sm:block" />
                  This is a soft pre-qualification only. No hard credit inquiry will be made.
                </p>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
