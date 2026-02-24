import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Soft Offer in 5 Minutes | EZMortgageLender.com®",
  description:
    "Get your AI-generated soft offer for commercial & residential investment loans in just 5 minutes. No hard credit pull. Fix-and-flip, DSCR, bridge, hard money, multifamily, retail, office & more. 30+ years of expertise, 200+ lenders.",
  keywords: [
    "commercial real estate loan",
    "residential investment loan",
    "fix and flip loan",
    "DSCR loan",
    "bridge loan",
    "hard money loan",
    "multifamily financing",
    "AI soft offer",
    "no doc loan",
    "lite doc loan",
    "bank statement loan",
    "SBA loan",
    "mortgage broker",
    "EZMortgageLender",
    "soft pre-qualification",
    "commercial mortgage",
  ],
  authors: [{ name: "EZMortgageLender.com®" }],
  creator: "EZMortgageLender.com®",
  publisher: "EZMortgageLender.com®",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ezmortgagelender.com",
    siteName: "EZMortgageLender.com®",
    title: "AI-Driven Soft Offer in 5 Minutes | EZMortgageLender.com®",
    description:
      "Instantly discover your borrowing power for commercial & residential investment loans. AI-powered soft pre-qualification with no hard credit pull.",
    images: [
      {
        url: "https://ezmortgagelender.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EZMortgageLender.com - AI Soft Offer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Soft Offer in 5 Min | EZMortgageLender.com®",
    description:
      "No hard credit pull. Get your estimated lending range instantly. 30+ years expertise. 200+ lenders.",
    images: ["https://ezmortgagelender.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://ezmortgagelender.com",
  },
  category: "finance",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "EZMortgageLender.com®",
  description:
    "AI-driven commercial and residential investment loan soft offers in just 5 minutes.",
  url: "https://ezmortgagelender.com",
  logo: "https://ezmortgagelender.com/logo.png",
  sameAs: [],
  areaServed: "US",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Loan Programs",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Real Estate Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fix and Flip Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DSCR Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bridge Loans" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hard Money Loans" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="mesh-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
