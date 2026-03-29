"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type SearchFormProps = {
  autoFocus?: boolean;
  variant?: "hero" | "header";
};

export default function SearchForm({
  autoFocus = false,
  variant = "hero",
}: SearchFormProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) {
      return;
    }

    searchInputRef.current?.focus();
  }, [autoFocus]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = searchText.trim();
    router.push(`/search?text=${encodeURIComponent(text)}`);
  };

  if (variant === "header") {
    return (
      <form onSubmit={handleSubmit} className="hidden items-center gap-2 md:flex">
        <input
          ref={searchInputRef}
          name="text"
          type="text"
          placeholder="Search meals"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="h-9 w-48 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 lg:w-60"
        />
        <button
          type="submit"
          className="h-9 rounded-lg bg-zinc-900 px-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        ref={searchInputRef}
        name="text"
        type="text"
        placeholder="Try: chicken, pasta, curry"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className="h-12 flex-1 rounded-xl border border-zinc-300 bg-white/95 px-4 text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
      <button
        type="submit"
        className="h-12 rounded-xl bg-zinc-900 px-6 font-semibold text-white transition hover:bg-zinc-700"
      >
        Search
      </button>
    </form>
  );
}