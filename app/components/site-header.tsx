"use client";

import React, { useState } from "react";
import Link from "next/link";
import CartButton from "./cart-button";
import MealDetail from "./meal-detail";
import ShoppingCartModal from "./shopping-cart-modal";
import type { Meal, MealDbResponse } from "../types/mealdb";

export default function SiteHeader() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoadingRandomMeal, setIsLoadingRandomMeal] = useState(false);
  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);

  const handleOpenRandomMeal = async () => {
    setIsLoadingRandomMeal(true);

    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php", {
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const data: MealDbResponse = await response.json();
      setRandomMeal(data.meals?.[0] ?? null);
    } finally {
      setIsLoadingRandomMeal(false);
    }
  };

  return (
    <>
      <header className="border-b border-zinc-200 bg-white">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
            MealDB Search
          </Link>
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-700">
            <Link href="/" className="transition hover:text-zinc-900">
              Home
            </Link>
            <Link href="/search" className="transition hover:text-zinc-900">
              Search
            </Link>
            <button
              type="button"
              onClick={handleOpenRandomMeal}
              disabled={isLoadingRandomMeal}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-wait disabled:opacity-60"
            >
              {isLoadingRandomMeal ? "Loading..." : "Surprise Me"}
            </button>
            <CartButton onClick={() => setIsCartOpen(true)} />
          </div>
        </nav>
      </header>

      <ShoppingCartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <MealDetail meal={randomMeal} onClose={() => setRandomMeal(null)} />
    </>
  );
}
