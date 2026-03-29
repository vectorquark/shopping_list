"use client";

import React from "react";
import SearchForm from "./components/search-form";

export default function Home() {
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

        <SearchForm autoFocus />
      </div>
    </main>
  );
}
