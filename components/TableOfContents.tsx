"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
}

export default function TableOfContents({ contentSelector = ".prose" }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const contentEl = document.querySelector(contentSelector);
    if (!contentEl) return;

    const nodes = contentEl.querySelectorAll("h1, h2, h3");
    const items: TocItem[] = [];

    nodes.forEach((el) => {
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || `heading-${items.length}`;
      }
      items.push({
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      });
    });

    setHeadings(items);

    // IntersectionObserver for active heading tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -75% 0px" }
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [contentSelector]);

  if (!headings.length) return null;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-linear-to-b from-white/5 to-transparent">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">
        Table of Contents
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((h) => (
            <li
              key={h.id}
              style={{ paddingLeft: h.level === 1 ? "0" : h.level === 2 ? "0.75rem" : "1.5rem" }}
            >
              <button
                onClick={() => scrollToId(h.id)}
                className={`text-left w-full text-sm transition-colors leading-snug ${
                  activeId === h.id
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
