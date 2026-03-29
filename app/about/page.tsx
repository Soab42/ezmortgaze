import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Building2, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | EZMortgageLender.com®",
  description: "Learn how EZMortgageLender compares to traditional mortgage processing by combining decades of underwriting expertise with cutting-edge artificial intelligence.",
  alternates: {
    canonical: "https://ezmortgagelender.com/about",
  },
  openGraph: {
    title: "About EZMortgageLender.com®",
    description: "Learn how EZMortgageLender combines human expertise with AI to simplify complex real estate financing.",
    url: "https://ezmortgagelender.com/about",
  }
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#020610]">
      <Navbar />
      
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-6 shadow-sm">
            <span className="text-xs font-bold tracking-[0.2em] text-emerald-300 uppercase">
              Our Vision
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
            We are redefining how <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-teal-200">
              real estate capital is deployed.
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16">
            At EZMortgageLender, we believe that securing real estate financing shouldn't be a hurdle, but a strategic advantage. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
            <div className="glass-panel p-8 rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">AI Speed Meets Human Expertise</h2>
              <p className="text-zinc-400 leading-relaxed">
                Traditional lending is slow and opaque. We've stripped away the inefficiencies to deliver 5-minute soft offers. But we don't stop at algorithms; our team brings 30+ years of deep underwriting knowledge to structure the optimal exit strategy for your specific deal.
              </p>
            </div>
            
            <div className="glass-panel p-8 rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Structured for Your Success</h2>
              <p className="text-zinc-400 leading-relaxed">
                Whether scaling a rental portfolio or undertaking a complex commercial acquisition, our tailored programs flex to your needs. We provide transparent qualification guidelines and pivot seamlessly into alternative programs if one structure doesn't fit your timeline.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white hover:bg-zinc-200 text-zinc-950 px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
