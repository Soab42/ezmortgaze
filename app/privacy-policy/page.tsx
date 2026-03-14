"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen bg-[#020610]">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/privacy-hero.png"
            alt="Privacy Protection"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#020610]/40 via-[#020610]/80 to-[#020610]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-4">
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase">
              Security & Trust
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
            Privacy Policy
          </h1>
          <p className="text-emerald-200/60 font-medium tracking-wide uppercase text-xs md:text-sm">
            EZMortgageLender.com <br />
            Powered by Commercial Lending USA LLC <br />
            Effective Date: March 12, 2026
          </p>
        </div>
      </section>

      <div className="relative pb-24 px-6">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-950/20 backdrop-blur-xl">
            <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed space-y-12">

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Introduction</h2>
                </div>
                <div className="space-y-4">
                  <p>EZMortgageLender.com (“Platform,” “Commercial Lending USA”, “company”, “we,” “our,” or “us”) is operated by Commercial Lending USA LLC.</p>
                  <p>This Privacy Policy describes how we collect, use, store, and share information obtained through the website www.ezmortgagelender.com and related services.</p>
                  <p>By accessing the Platform, submitting information, or interacting with our services, you agree to the practices described in this Privacy Policy.</p>
                  <p>This Privacy Policy applies to borrowers, mortgage brokers, real estate investors, developers, financial professionals, and website visitors.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Information We Collect</h2>
                </div>
                <div className="space-y-6">
                  <p>We may collect various types of information when users interact with the Platform.</p>

                  <div>
                    <h4 className="text-white font-bold mb-3">Personal Information may include:</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Full name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Company name</li>
                      <li>Business address</li>
                      <li>Professional role</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-3">Financial and Deal Information may include:</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Property type</li>
                      <li>Estimated property value</li>
                      <li>Loan amount requested</li>
                      <li>Investment strategy</li>
                      <li>Ownership structure</li>
                      <li>Borrower financial profile</li>
                      <li>Estimated credit profile</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-3">Technical Information may include:</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>IP address</li>
                      <li>Browser type</li>
                      <li>Device type</li>
                      <li>Operating system</li>
                      <li>Website activity and usage patterns</li>
                      <li>Referral sources</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">How We Use Your Information</h2>
                </div>
                <div className="space-y-4">
                  <p>We use collected information for purposes including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Operating the AI-powered pricing platform</li>
                    <li>Reviewing financing inquiries</li>
                    <li>Communicating with users about loan inquiries and services</li>
                    <li>Matching deals with potential capital providers</li>
                    <li>Improving platform functionality and security</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Information Sharing</h2>
                </div>
                <div className="space-y-4">
                  <p>We may share information with:</p>
                  <p><span className="text-white font-bold">Capital Providers</span> such as banks, institutional lenders, private lenders, debt funds, mortgage companies, and real estate investment funds to evaluate financing opportunities.</p>
                  <p><span className="text-white font-bold">Service Providers</span> including technology platforms, hosting services, CRM systems, and analytics providers that support our operations.</p>
                  <p><span className="text-white font-bold">Legal Authorities</span> when disclosure is required to comply with legal obligations or protect company rights and safety.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Data Security</h2>
                </div>
                <div className="space-y-4">
                  <p>We implement administrative, technical, and physical safeguards designed to protect user information from unauthorized access or disclosure.</p>
                  <p>However, no internet transmission method can be guaranteed to be completely secure. Users submit information at their own risk.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Cookies and Tracking Technologies</h2>
                </div>
                <div className="space-y-4">
                  <p>EZMortgageLender.com may use cookies and similar technologies to improve website functionality, analyze traffic, enhance the user experience, and support security and fraud prevention.</p>
                  <p>Users may disable cookies through their browser settings, although certain website features may not function properly.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Third-Party Links</h2>
                </div>
                <div className="space-y-4">
                  <p>The Platform may contain links to third‑party websites. These websites operate independently and maintain their own privacy policies.</p>
                  <p>Commercial Lending USA LLC is not responsible for the privacy practices of external websites.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Data Retention</h2>
                </div>
                <div className="space-y-4">
                  <p>We may retain user information for as long as necessary to evaluate financing inquiries, maintain business records, comply with legal obligations, and resolve disputes.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Children's Privacy</h2>
                </div>
                <div className="space-y-4">
                  <p>The Platform is intended for business professionals involved in commercial real estate transactions and is not intended for individuals under the age of 18.</p>
                  <p>We do not knowingly collect personal information from minors.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Your Privacy Rights</h2>
                </div>
                <div className="space-y-4">
                  <p>Users may request to update, correct, or delete personal information where legally permitted.</p>
                  <p>Requests may be submitted using the contact information provided below.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Marketing Communications</h2>
                </div>
                <div className="space-y-4">
                  <p>Users may receive communications related to financing opportunities, platform updates, and company announcements.</p>
                  <p>Users may opt out of marketing communications at any time by following unsubscribe instructions included in communications.</p>
                </div>
              </section>

              <section className="bg-emerald-500/3 p-8 rounded-3xl border border-emerald-500/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">SMS / TCPA Communication Consent Policy</h2>
                </div>
                <div className="space-y-4">
                  <p>By submitting your phone number through EZMortgageLender.com, you consent to receive communications from Commercial Lending USA LLC via:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Phone calls</li>
                    <li>Text messages (SMS)</li>
                    <li>Automated or prerecorded messages where permitted by law</li>
                  </ul>
                  <p>These communications may relate to loan inquiries, financing opportunities, platform updates, and customer support.</p>
                  <p>Message and data rates may apply depending on your mobile carrier.</p>
                  <p>Consent to receive SMS communications is not a condition of obtaining financing or using the Platform.</p>
                  <p>Users may opt out at any time by replying STOP to any text message or contacting us directly.</p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-emerald-500/50 to-transparent" />
                  <h2 className="text-2xl font-bold text-white whitespace-nowrap">Changes to This Privacy Policy</h2>
                </div>
                <div className="space-y-4">
                  <p>Commercial Lending USA LLC reserves the right to update or modify this Privacy Policy at any time.</p>
                  <p>Changes become effective upon posting on the Platform. Continued use of the Platform constitutes acceptance of the revised policy.</p>
                </div>
              </section>

              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  {/* <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2> */}
                  <p className="text-white font-bold">Commercial Lending USA LLC</p>
                  <a href="mailto:sales@EZMortgageLender.com" className="text-emerald-400 text-sm font-medium hover:text-emerald-300">sales@EZMortgageLender.com</a>
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
