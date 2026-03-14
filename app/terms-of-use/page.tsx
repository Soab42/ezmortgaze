"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function TermsOfUse() {
  return (
    <main className="relative min-h-screen bg-[#020610]">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/legal-hero.png"
            alt="Legal Disclaimer"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#020610]/40 via-[#020610]/80 to-[#020610]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-md mb-4">
            <span className="text-xs font-bold tracking-[0.2em] text-amber-300 uppercase">
              Compliance & Transparency
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight mb-4">
            Terms of Use, Legal Disclaimer, <br className="hidden md:block" />
            & AI Pricing Tool Disclosure
          </h1>
          <p className="text-amber-200/60 font-medium tracking-wide uppercase text-xs md:text-sm">
            EZMortgageLender.com <br />
            Powered by Commercial Lending USA LLC <br />
            Effective Date: March 12, 2026
          </p>
        </div>
      </section>

      <div className="relative pb-24 px-6">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-950/20 backdrop-blur-xl">
            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed space-y-12">

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4">
                  <p>Welcome to EZMortgageLender.com (the “Platform”), an AI-powered loan pricing and deal evaluation tool operated by Commercial Lending USA LLC (“Company,” “we,” “our,” or “us”).</p>
                  <p>By accessing or using this website, you agree to comply with and be bound by these Terms of Use, Legal Disclaimer, and AI Pricing Tool Disclosure.</p>
                  <p>These Terms govern your use of the Platform, including all content, tools, forms, AI-generated outputs, and services available through the website.</p>
                  <p>If you do not agree with these Terms, you should discontinue use of the Platform immediately.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Nature of the Platform</h2>
                </div>
                <div className="space-y-4">
                  <p>EZMortgageLender.com provides an AI-assisted loan scenario evaluation and pricing platform designed to generate preliminary financing estimates based on information submitted by users.</p>
                  <p>The platform analyzes data such as property type, estimated property value, loan amount requested, borrower profile, investment strategy, and market assumptions.</p>
                  <p>Using algorithmic models and capital market guidelines, the Platform produces indicative financing scenarios and estimated loan structures to help evaluate potential financing opportunities.</p>
                </div>
              </section>

              <section className="bg-amber-500/3 p-8 rounded-3xl border border-amber-500/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">AI Pricing Tool and Soft Offer Disclosure</h2>
                </div>
                <div className="space-y-4">
                  <p>EZMortgageLender.com utilizes automated systems and artificial intelligence models to generate preliminary loan scenarios and pricing estimates.</p>
                  <p>These estimates may include loan amounts, loan‑to‑value ratios, interest rate ranges, potential financing structures, debt service assumptions, and possible loan programs.</p>
                  <p>These estimates are generated based on limited user-provided information and general lending assumptions and are intended only for early-stage deal evaluation.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Nature of AI‑Generated Soft Offers</h2>
                </div>
                <div className="space-y-4">
                  <p>The platform may generate preliminary financing scenarios or “soft offers.”</p>
                  <p>A soft offer represents a non‑binding estimate of potential loan terms based on limited information submitted through the Platform.</p>
                  <p>These estimates help users evaluate possible financing structures before entering a formal loan process.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Not a Loan Offer or Commitment</h2>
                </div>
                <div className="space-y-4">
                  <p>Results generated by the Platform are for informational purposes only and do not constitute a loan approval, loan commitment, binding financing offer, rate quote, rate lock, loan application, or credit decision.</p>
                  <p>Final financing terms may only be determined after formal underwriting review and lender approval.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Business‑Purpose Lending Only</h2>
                </div>
                <div className="space-y-4">
                  <p>The financing solutions referenced on the Platform are intended strictly for business‑purpose transactions such as commercial real estate, investment properties, multifamily properties, development projects, bridge financing, or construction lending.</p>
                  <p>These loans are not intended for personal, family, or household use.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">No Loan Application Created</h2>
                </div>
                <div className="space-y-4">
                  <p>Submitting information through the Platform does not constitute a formal loan application. Forms submitted are considered preliminary deal inquiries only.</p>
                  <p>A formal loan application may later be requested by Commercial Lending USA LLC, a capital partner, or a participating lender.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Roles of Commercial Lending USA</h2>
                </div>
                <div className="space-y-4">
                  <p>Commercial Lending USA LLC may act in various roles depending on the structure of a transaction, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Table Funding Lender</li>
                    <li>Correspondent Lender</li>
                    <li>Commercial Loan Broker</li>
                    <li>Capital Advisor or Consultant</li>
                    <li>Private Capital Source</li>
                    <li>Loan Originator</li>
                    <li>Capital Placement Advisor</li>
                  </ul>
                  <p>The Company may receive compensation related to financing transactions.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Third‑Party Capital Providers</h2>
                </div>
                <div className="space-y-4">
                  <p>Financing arranged through the Platform may involve third‑party lenders such as banks, credit unions, debt funds, private lenders, institutional lenders, mortgage companies, hard money lenders, and real estate investment funds.</p>
                  <p>Final loan approval is determined solely by the funding lender.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Compensation Disclosure</h2>
                </div>
                <div className="space-y-4">
                  <p>Commercial Lending USA LLC may receive compensation in connection with financing transactions, including loan origination fees, placement fees, advisory fees, participation interests, rebates, processing fees, or transaction service fees.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Accuracy of Information</h2>
                </div>
                <div className="space-y-4">
                  <p>Users are responsible for providing accurate and truthful information when submitting deal scenarios.</p>
                  <p>The Company reserves the right to decline inquiries or terminate communications if inaccurate or suspicious information is detected.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Platform Limitations</h2>
                </div>
                <div className="space-y-4">
                  <p>Although the Platform utilizes automated pricing systems and data models, the Company makes no guarantees regarding the accuracy of AI‑generated estimates.</p>
                  <p>Loan programs, rates, and underwriting standards may change at any time without notice.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Intellectual Property</h2>
                </div>
                <div className="space-y-4">
                  <p>All content on the Platform including software, algorithms, text, graphics, logos, and pricing models is the intellectual property of Commercial Lending USA LLC or its licensors.</p>
                  <p>Users may not reproduce or distribute Platform content without written permission.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Limitation of Liability</h2>
                </div>
                <div className="space-y-4">
                  <p>Commercial Lending USA LLC shall not be liable for damages arising from the use of the Platform, reliance on AI‑generated estimates, financing decisions made by users, lender approvals or denials, data input errors, or platform interruptions.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">External Links</h2>
                </div>
                <div className="space-y-4">
                  <p>The Platform may contain links to third-party websites for convenience. Commercial Lending USA LLC does not control or endorse external website content or policies.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Privacy</h2>
                </div>
                <div className="space-y-4">
                  <p>Information submitted through the Platform may be collected and used in accordance with the Company’s Privacy Policy.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Modifications to Terms</h2>
                </div>
                <div className="space-y-4">
                  <p>Commercial Lending USA LLC reserves the right to update or modify these Terms at any time. Continued use of the Platform after modifications constitutes acceptance of the updated Terms.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Governing Law</h2>
                </div>
                <div className="space-y-4">
                  <p>These Terms shall be governed by the laws of the United States and the Commonwealth of Virginia.</p>
                </div>
              </section>

              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  {/* <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2> */}
                  <p className="text-wh ite font-bold">Commercial Lending USA LLC</p>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:sales@commerciallendingusa.com" className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors">sales@commerciallendingusa.com</a>
                    {/* <p className="text-xs text-zinc-500 mt-2 font-medium">Powered by Commercial Lending USA LLC</p> */}
                  </div>
                </div>
                {/* <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                  © 2026 Commercial Lending USA LLC. All Rights Reserved.
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
