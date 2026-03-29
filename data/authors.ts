export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string; // path under /public
  twitter?: string;
  linkedin?: string;
}

export const authors: Author[] = [
  {
    slug: "james-sterling",
    name: "James Sterling",
    role: "Senior Market Analyst",
    bio: "James has over 15 years of experience analyzing commercial real estate cycles across major US metros. He specializes in identifying macro trends and distilling complex market data into actionable investor insights.",
    avatar: "/avatars/james-sterling.png",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
  },
  {
    slug: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "AI & PropTech Strategist",
    bio: "Elena is a PropTech expert who bridges the gap between machine learning research and practical real estate lending applications. She leads EZMortgageLender's AI product strategy.",
    avatar: "/avatars/elena-rodriguez.png",
    linkedin: "https://linkedin.com/",
  },
  {
    slug: "marcus-chen",
    name: "Marcus Chen",
    role: "Director of Investment Strategy",
    bio: "Marcus brings 20 years of hands-on experience managing diversified real estate portfolios. He has completed over $500M in transactions and focuses on volatility-resistant investment frameworks.",
    avatar: "/avatars/marcus-chen.png",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
  },
];
