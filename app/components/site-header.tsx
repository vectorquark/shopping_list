"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import CartButton from "./cart-button";
import MealDetail from "./meal-detail";
import SearchForm from "./search-form";
import ShoppingCartModal from "./shopping-cart-modal";
import { fetchMealById, fetchRandomMeal } from "../shared/mealdb-api";
import type { Meal } from "../types/mealdb";

export default function SiteHeader() {
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isLoadingRandomMeal, setIsLoadingRandomMeal] = useState(false);
  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const handleOpenShoppingList = () => {
      setIsShoppingListOpen(true);
    };

    window.addEventListener("shopping-list:open", handleOpenShoppingList);
    return () => window.removeEventListener("shopping-list:open", handleOpenShoppingList);
  }, []);

  const handleOpenRandomMeal = async () => {
    setIsLoadingRandomMeal(true);

    try {
      const meal = await fetchRandomMeal();

      if (!meal) {
        toast.error("Unable to load a random recipe right now.");
        return;
      }

      setRandomMeal(meal);
    } catch {
      toast.error("Unable to load a random recipe right now.");
    } finally {
      setIsLoadingRandomMeal(false);
    }
  };

  const handleOpenMealById = async (mealId: string) => {
    try {
      const meal = await fetchMealById(mealId);

      if (!meal) {
        toast.error("Recipe not found for this meal.");
        return;
      }

      setIsShoppingListOpen(false);
      setRandomMeal(meal);
    } catch {
      toast.error("Unable to load recipe details right now.");
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
            MealDB Search
          </Link>
          <SearchForm variant="header" />
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-700">
            <button
              type="button"
              onClick={handleOpenRandomMeal}
              disabled={isLoadingRandomMeal}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-wait disabled:opacity-60"
            >
              {isLoadingRandomMeal ? "Loading..." : "Surprise Me"}
            </button>
            <CartButton onClick={() => setIsShoppingListOpen(true)} />
          </div>
        </nav>
      </header>

      <ShoppingCartModal
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        onViewMeal={handleOpenMealById}
      />
      <MealDetail meal={randomMeal} onClose={() => setRandomMeal(null)} />
    </>
  );
}
