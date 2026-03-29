"use client";

import React, { useState } from "react";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-zinc-900 bg-zinc-50 hover:bg-zinc-100 transition"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="text-zinc-500">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-white text-sm text-zinc-700">
          {children}
        </div>
      )}
    </div>
  );
}
