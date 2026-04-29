import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import { SITE_URL, OG_IMAGE, LOGO, SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "AI Soft Offer in 5 Minutes | EZMortgageLender.net®",
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
  authors: [{ name: "EZMortgageLender.net®" }],
  creator: "EZMortgageLender.net®",
  publisher: "EZMortgageLender.net®",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "AI-Driven Soft Offer in 5 Minutes | EZMortgageLender.net®",
    description:
      "Instantly discover your borrowing power for commercial & residential investment loans. AI-powered soft pre-qualification with no hard credit pull.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "EZMortgageLender.net - AI Soft Offer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Soft Offer in 5 Min | EZMortgageLender.net®",
    description:
      "No hard credit pull. Get your estimated lending range instantly. 30+ years expertise. 200+ lenders.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "INSERT_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TAG_HERE",
  },
  category: "finance",
  other: {
    "og:logo": LOGO,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "EZMortgageLender.net®",
  description:
    "AI-driven commercial and residential investment loan soft offers in just 5 minutes.",
  url: SITE_URL,
  logo: LOGO,
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

import SmoothScroll from "@/components/SmoothScroll";

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
        <SmoothScroll>
          <div className="mesh-bg" aria-hidden="true" />
          {children}
        </SmoothScroll>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
