"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: "Marcus T.",
        role: "Multifamily Investor",
        location: "Austin, TX",
        text: "The speed is unmatched. I got a soft offer in 5 minutes and we closed a $2.4M DSCR loan in 14 days. Changed how I scale.",
        funded: "$2.4M DSCR"
    },
    {
        name: "Elena R.",
        role: "Commercial Developer",
        location: "Miami, FL",
        text: "We had a complex mixed-use acquisition that banks passed on. They structured it perfectly and got us the leverage.",
        funded: "$5.5M Value-Add"
    },
    {
        name: "David H.",
        role: "Fix & Flip Operator",
        location: "Denver, CO",
        text: "Instant pre-qual gives me confidence to make aggressive offers, knowing I have backend capital ready to deploy fast.",
        funded: "$850k Bridge"
    },
    {
        name: "Sarah M.",
        role: "Portfolio Manager",
        location: "Nashville, TN",
        text: "Refinanced a 12-door portfolio seamlessly. The AI structuring is insanely accurate and the process was absolutely painless.",
        funded: "$3.2M Refi"
    },
    {
        name: "James L.",
        role: "Private Investor",
        location: "Scottsdale, AZ",
        text: "Best bridge terms I've seen in the market. Absolute certainty of execution, which is what operators actually care about.",
        funded: "$1.2M Bridge"
    }
];

export default function Testimonials() {
    const container = useRef < HTMLDivElement > (null);

    useGSAP(() => {
        // Header animation
        gsap.from(".tst-hdr", {
            y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: container.current, start: "top 80%" }
        });
    }, { scope: container });

    return (
        <section id="testimonials" ref={container} className="relative py-24 overflow-hidden" style={{ zIndex: 1 }}>
            {/* Abstract Glowing Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[150px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-6">

                {/* Header */}
                <div className="tst-hdr text-center mb-16 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium tracking-wide text-emerald-300 uppercase">
                            Proven Results
                        </span>
                    </div>
                    <h2 className="font-black mb-6 tracking-tight leading-[1.1] text-4xl md:text-5xl text-white">
                        Funded & <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-200">Closed.</span>
                    </h2>
                </div>
            </div>

            {/* Marquee Slider */}
            <div className="w-full relative py-8 fade-mask-hz">
                <style dangerouslySetInnerHTML={{
                    __html: `
            @keyframes marqueeHorizon {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-hz {
              animation: marqueeHorizon 50s linear infinite;
              display: flex;
              width: max-content;
            }
            .animate-marquee-hz:hover {
              animation-play-state: paused;
            }
            .fade-mask-hz {
              mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
            }
          `
                }} />

                <div className="animate-marquee-hz gap-6 px-3">
                    {/* We duplicate the array to create the infinite scroll effect */}
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div key={`tst-${i}`} className="w-[320px] md:w-[400px] shrink-0 relative glass-panel p-6 rounded-2xl border-white/5 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col justify-between">

                            <Quote className="absolute top-4 right-6 w-8 h-8 text-white/5 -rotate-12 group-hover:text-amber-500/10 transition-colors" />

                            <div className="flex flex-col flex-1">
                                <div className="flex gap-1 mb-4 relative z-10 w-fit">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                    ))}
                                </div>

                                <p className="text-zinc-300 text-sm md:text-[15px] leading-relaxed mb-6 relative z-10">
                                    "{t.text}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
                                <div>
                                    <h4 className="text-white font-bold tracking-tight text-sm">{t.name}</h4>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">{t.role} • {t.location}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap">
                                        {t.funded}
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
