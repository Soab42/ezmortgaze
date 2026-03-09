"use client";

import React from "react";
import { motion } from "framer-motion";

const LIVE_OFFERS = [
    { type: "Multifamily Refi", location: "Texas • DSCR", amount: "$2,450,000", ltv: "75%", rate: "6.5%", status: "Approved", colorClasses: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" },
    { type: "Fix & Flip Bridge", location: "Florida • High Leverage", amount: "$850,000", ltv: "85% LTC", rate: "9.5%", status: "Structuring", colorClasses: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
    { type: "Commercial Ground-Up", location: "Arizona • Development", amount: "$12,000,000", ltv: "65% LTC", rate: "8.2%", status: "Processing", colorClasses: "bg-violet-500/10 text-violet-400 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
    { type: "Short Term Rental", location: "Colorado • Cash Flow", amount: "$1,100,000", ltv: "80%", rate: "7.1%", status: "Funded", colorClasses: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]" },
    { type: "Mixed Use Acq", location: "New York • Value Add", amount: "$5,500,000", ltv: "70%", rate: "7.8%", status: "Underwriting", colorClasses: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.2)]" },
    { type: "Portfolio Refinance", location: "Ohio • 12 Doors", amount: "$3,200,000", ltv: "75%", rate: "6.8%", status: "Approved", colorClasses: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" }
];

const OfferCard = ({ offer }: { offer: typeof LIVE_OFFERS[0] }) => (
    <div className="w-full relative overflow-hidden p-6 rounded-3xl mb-6 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] border border-white/20 bg-white/10 backdrop-blur-2xl shrink-0">
        <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-white/80 tracking-wider uppercase">{offer.location}</span>
            <span className={`px-2.5 py-1 text-[9px] font-bold rounded-full border ${offer.colorClasses}`}>
                {offer.status}
            </span>
        </div>
        <h4 className="text-white font-bold text-lg mb-1">{offer.type}</h4>
        <div className="text-2xl font-black text-white mb-4 tracking-tight drop-shadow-md">
            {offer.amount}
        </div>
        <div className="flex justify-between items-center border-t border-white/20 pt-4">
            <div className="flex flex-col">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider mb-1">LTV/LTC</span>
                <span className="text-sm font-black text-white">{offer.ltv}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider mb-1">Est. Rate</span>
                <span className="text-sm font-black text-white">{offer.rate}</span>
            </div>
        </div>
    </div>
);

export default function LiveOffersFeed() {
    // We double the data and animate to -50% for a perfect seamless loop
    const list = [...LIVE_OFFERS, ...LIVE_OFFERS];
    const staggeredList = [...LIVE_OFFERS.slice(3), ...LIVE_OFFERS.slice(0, 3), ...LIVE_OFFERS.slice(3), ...LIVE_OFFERS.slice(0, 3)];

    return (
        <div className="relative w-full h-[840px] lg:h-[760px] hidden lg:flex items-center justify-center  perspective-midrange">
            <style jsx global>{`
        .fade-mask {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

            {/* 3D Container */}
            <div className="absolute inset-0 fade-mask flex gap-6 justify-center items-start rotate-6 -rotate-y-35 rotate-x-10 scale-[1.4] origin-right pointer-events-none pt-10">

                {/* Column 1 */}
                <motion.div
                    className="w-[260px] flex flex-col pointer-events-auto"
                    animate={{ y: [0, "-50%"] }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {list.map((offer, i) => (
                        <OfferCard key={`col1-${i}`} offer={offer} />
                    ))}
                </motion.div>

                {/* Column 2 */}
                <motion.div
                    className="w-[260px] flex flex-col pointer-events-auto mt-32"
                    animate={{ y: [0, "-50%"] }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {staggeredList.map((offer, i) => (
                        <OfferCard key={`col2-${i}`} offer={offer} />
                    ))}
                </motion.div>

            </div>
        </div>
    );
}
