"use client";

import { Star, Quote, CheckCircle2 } from "lucide-react";

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
    return (
        <section id="testimonials" className="relative py-24 overflow-hidden bg-[#020814]" style={{ zIndex: 1 }}>
            {/* Abstract Glowing Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[150px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-6">
                {/* Header - Static */}
                <div className="text-center mb-16 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-emerald-500/20 bg-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium tracking-wide text-emerald-300 uppercase">
                            Proven Results
                        </span>
                    </div>
                    <h2 className="font-black mb-6 tracking-tight leading-tight text-4xl md:text-5xl text-white">
                        Funded & <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-emerald-200">Closed.</span>
                    </h2>
                </div>
            </div>

            {/* Marquee Slider - Restored */}
            <div className="w-full relative py-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes marqueeHorizon {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee-hz {
                            animation: marqueeHorizon 60s linear infinite;
                            display: flex;
                            width: max-content;
                        }
                        .animate-marquee-hz:hover {
                            animation-play-state: paused;
                        }
                    `
                }} />

                <div className="animate-marquee-hz gap-8 px-4">
                    {/* Duplicate testimonials for infinite loop */}
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div key={`tst-${i}`} className="w-[320px] md:w-[450px] shrink-0 relative glass-panel p-8 rounded-3xl border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-500 hover:-translate-y-2 group shadow-2xl flex flex-col justify-between h-full">

                            <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 -rotate-12 group-hover:text-amber-500/10 transition-colors" />

                            <div className="flex flex-col flex-1">
                                <div className="flex gap-1 mb-6 relative z-10 w-fit">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    ))}
                                </div>

                                <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8 relative z-10 font-medium">
                                    "{t.text}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-6 relative z-10">
                                <div>
                                    <h4 className="text-white font-bold tracking-tight text-base">{t.name}</h4>
                                    <p className="text-xs text-zinc-500 mt-1">{t.role} • {t.location}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
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
