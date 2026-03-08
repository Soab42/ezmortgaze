"use client";

import gsap from "gsap";
import { useRef, MouseEvent } from "react";
import { ArrowRight, Zap, Shield, Clock } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
    const buttonRef = useRef < HTMLAnchorElement > (null);
    const textRef = useRef < HTMLSpanElement > (null);

    // Magnetic button effect on hover
    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current || !textRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;

        gsap.to(buttonRef.current, { x, y, duration: 0.4, ease: "power3.out" });
        gsap.to(textRef.current, { x: x * 0.5, y: y * 0.5, duration: 0.4, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
        if (!buttonRef.current || !textRef.current) return;
        gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        gsap.to(textRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    return (
        <section className="relative py-32 px-6 overflow-hidden flex items-center justify-center min-h-[80vh]" style={{ zIndex: 1 }}>

            {/* Massive Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full pointer-events-none opacity-40 blur-[150px] mix-blend-screen"
                style={{ background: "conic-gradient(from 0deg, rgba(59,130,246,0.3) 0%, rgba(245,158,11,0.5) 50%, rgba(59,130,246,0.3) 100%)" }} />

            {/* Central Star/Flare */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/20 blur-[100px] pointer-events-none rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10 w-full">
                <div className="glass-panel p-12 md:p-20 text-center rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">

                    {/* Hover Glow Follower inside card */}
                    <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 mb-8 max-w-fit mx-auto">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-sm font-semibold tracking-widest text-white uppercase">
                                Ready to Discover Your Borrowing Power?
                            </span>
                        </div>

                        <h2 className="font-black mb-6 tracking-tight leading-[1.1]" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>
                            Discover Your True<br className="hidden md:block" />
                            <span className="text-white">
                                Borrowing Power
                            </span>
                        </h2>

                        <p className="mb-12 max-w-2xl mx-auto text-white/90 text-lg  leading-relaxed">
                            It’s free. It takes just 5 minutes. It gives you actionable insight before submitting a full application. Know your numbers. Strengthen your position. Win more deals.
                        </p>

                        <div className="flex justify-center mb-16">
                            <Link
                                ref={buttonRef}
                                href="https://softoffer.commerciallendingusa.com/login"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="relative flex items-center justify-center bg-white text-[#6d28d9] font-black text-2xl py-6 px-12 rounded-full overflow-hidden hover:scale-105 transition-transform shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] will-change-transform"
                            >
                                <span ref={textRef} className="relative z-10 flex items-center gap-3">
                                    Get My AI Soft Offer
                                    <ArrowRight className="w-8 h-8" />
                                </span>
                            </Link>
                        </div>

                        {/* Reassurance pills */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { icon: Shield, text: "No Hard Credit Pull" },
                                { icon: Clock, text: "Results in 5 Minutes" },
                                { icon: Zap, text: "AI-Powered Pre-Qual" }
                            ].map((pill, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-medium">
                                    <pill.icon className="w-4 h-4 text-white" />
                                    {pill.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
