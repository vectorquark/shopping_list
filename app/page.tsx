"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = searchText.trim();
    router.push(`/search?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_12%_18%,#fef3c7_0%,transparent_36%),radial-gradient(circle_at_88%_82%,#bae6fd_0%,transparent_34%),linear-gradient(160deg,#fff7ed_0%,#ecfeff_45%,#f8fafc_100%)] px-4 py-16">
      <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-rose-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-12 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />

      <div className="relative w-full max-w-2xl rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[0_22px_70px_-24px_rgba(15,23,42,0.4)] backdrop-blur-sm sm:p-10">
        <header className="mb-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
            Find Your Next Meal
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 [font-family:Georgia,Times,serif] sm:text-6xl">
            MealDB Search
          </h1>
        </header>

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
      </div>
    </main>
  );
}
