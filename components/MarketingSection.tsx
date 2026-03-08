import { ShieldCheck, Target, TrendingUp } from "lucide-react";

export default function MarketingSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#020814]" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex justify-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-amber-500/20 bg-amber-500/10">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold tracking-widest text-amber-200 uppercase">
              The AI Advantage
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: The "What & Why" */}
          <div className="flex flex-col gap-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Get Clarity Before You <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-200 to-amber-500">
                Commit to a Deal.
              </span>
            </h2>
            <div className="flex flex-col gap-6">
              <p className="text-zinc-400 text-lg leading-relaxed">
                <strong className="text-white">EZMortgageLender.com®</strong> delivers a powerful AI-generated soft offer that shows your estimated lending range upfront — 
                <span className="text-emerald-400 font-medium"> without a hard credit pull or complete application.</span>
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Know where you stand before you structure your deal. Before committing to hard money, bridge loans, no-doc, lite-doc, construction, or long-term financing — get clarity first.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-white/90 text-xl font-medium tracking-wide">
                Built for Mortgage Brokers, Realtors, and Direct Borrowers, this tool helps you evaluate scenarios instantly, set realistic expectations, and position every transaction for success.
              </p>
            </div>
          </div>

          {/* Right Side: The Impact Statement */}
          <div className="relative flex items-center justify-center lg:justify-end">
             {/* Decorative Elements */}
             <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 to-transparent rounded-[3rem] blur-xl" />
             
             <div className="glass-panel p-10 md:p-14 rounded-[3rem] border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden group w-full max-w-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />
                
                <h3 className="text-4xl md:text-5xl font-black text-white leading-[1.2] tracking-tight mb-8">
                  Negotiate <span className="text-amber-400 italic">stronger</span>. <br/>
                  Move <span className="text-blue-400 italic">faster</span>. <br/>
                  Compete with <span className="text-emerald-400 italic">confidence</span>.
                </h3>

                <ul className="space-y-4">
                  {[
                    "Instant Scenario Evaluation",
                    "Protect Client Credit Scores",
                    "Win More Competitive Bids"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-zinc-300 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
