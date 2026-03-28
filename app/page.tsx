"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = searchText.trim();
    router.push(`/search?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-sm">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            MealDB Search
          </h1>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            name="text"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            className="h-12 flex-1 rounded-xl border border-zinc-300 px-4 text-zinc-900 outline-none transition focus:border-zinc-500"
          />
          <button
            type="submit"
            className="h-12 rounded-xl bg-zinc-900 px-6 font-medium text-white transition hover:bg-zinc-700"
          >
            Search
          </button>
        </form>
      </div>
    </main>
  );
}
