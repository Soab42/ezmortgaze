"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#020814]/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Enhanced Glassmorphism */}
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-zinc-950/40 backdrop-blur-3xl border border-white/15 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed text-sm md:text-base">
            {content}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-zinc-950 font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
