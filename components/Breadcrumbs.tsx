"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm flex-wrap">
      <Link
        href="/"
        className="flex items-center gap-1 text-zinc-400 hover:text-amber-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-zinc-400 hover:text-amber-400 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-300 font-semibold" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
