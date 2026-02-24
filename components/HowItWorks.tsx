"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Complete the 5-Minute Soft Pre-Qual Form",
    desc: "Provide basic borrower and property details so our AI can evaluate your deal structure. No hard credit pull required.",
    color: "#3b82f6", // blue
  },
  {
    num: "02",
    title: "Receive Your AI-Generated Soft Offer",
    desc: "Instantly view your estimated qualification range and potential financing options — with no hard credit inquiry.",
    color: "#f59e0b", // amber
  },
  {
    num: "03",
    title: "Strategic Review with a Loan Specialist",
    desc: "Our team refines the structure, evaluates capital sources, and optimizes terms based on your property type, leverage, and exit strategy.",
    color: "#8b5cf6", // violet
  },
  {
    num: "04",
    title: "LOI Issuance & Full Processing",
    desc: "Once supporting documents are reviewed, management may issue a formal Letter of Intent (LOI). Upon signing, we accelerate your file into underwriting.",
    color: "#10b981", // emerald
  },
];

export default function HowItWorks() {
  const container = useRef < HTMLDivElement > (null);

  useGSAP(() => {
    // Header animation
    gsap.from(".hiw-hdr", {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: container.current, start: "top 75%" }
    });

    // Vertical line drawing animation linked to scroll
    gsap.to(".hiw-line-glow", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".hiw-timeline-wrapper",
        start: "top 50%",
        end: "bottom 80%",
        scrub: 1,
      }
    });

    // Step items staggered fade up as you scroll past them
    gsap.utils.toArray < HTMLElement > (".hiw-step").forEach((step, i) => {
      gsap.from(step, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    });

    // Glowing dot pulses as they activate
    gsap.utils.toArray < HTMLElement > (".hiw-dot").forEach((dot) => {
      gsap.fromTo(dot,
        { scale: 0.5, opacity: 0.2 },
        {
          scale: 1.2, opacity: 1, duration: 0.4, ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: dot,
            start: "top 60%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

  }, { scope: container });

  return (
    <section id="how-it-works" ref={container} className="relative py-32 px-6 overflow-hidden" style={{ zIndex: 1 }}>

      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full filter blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="hiw-hdr text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-amber-500/20">
            <span className="text-sm font-medium tracking-wide text-amber-300 uppercase">
              The Process
            </span>
          </div>
          <h2
            className="font-black mb-6 tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)" }}
          >
            Simple. Strategic.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              Powerful.
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-lg leading-relaxed">
            Four clear steps from initial input to funded transaction. We move decisively to keep your timeline intact.
          </p>
        </div>

        {/* Timeline Desktop/Mobile unified layout */}
        <div className="hiw-timeline-wrapper relative max-w-4xl mx-auto">

          {/* Central Vertical Line (hidden on very small screens, placed left on mobile, center on md+) */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-white/5 rounded-full overflow-hidden">
            <div className="hiw-line-glow w-full bg-gradient-to-b from-blue-500 via-amber-500 to-emerald-500 h-0 block shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`hiw-step relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >

                {/* Center Node / Dot */}
                <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full glass-panel bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl z-10">
                  <div className="hiw-dot w-4 h-4 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" style={{ backgroundColor: step.color }} />
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className="glass-panel p-8 premium-card hover:bg-white/5 transition-colors border-white/5 relative overflow-hidden group">
                    <div className="text-[6rem] font-black absolute -top-6 -right-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500" style={{ color: step.color }}>
                      {step.num}
                    </div>

                    <h3 className="text-sm font-black tracking-widest uppercase mb-3" style={{ color: step.color }}>
                      Step {step.num}
                    </h3>
                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-zinc-400 leading-relaxed text-[0.95rem]">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
