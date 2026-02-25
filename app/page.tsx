import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PowerhouseMarquee from "@/components/PowerhouseMarquee";
import WhySection from "@/components/WhySection";
import LoanPrograms from "@/components/LoanPrograms";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import SoftOfferForm from "@/components/SoftOfferForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

function SectionDivider() {
  return <div className="section-divider max-w-7xl mx-auto" />;
}

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <WhySection />
      <SectionDivider />
      <LoanPrograms />
      {/* <PowerhouseMarquee /> */}
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      {/* <SoftOfferForm /> */}
      <SectionDivider />
      <CTASection />
      <Footer />
    </main>
  );
}
