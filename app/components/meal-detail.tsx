"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import IngredientsList from "./ingredients-list";
import InstructionsList from "./instructions-list";
import MealMeta from "./meal-meta";
import MealVideo from "./meal-video";
import { ingredientIterator } from "../shared/get-meal-ingredients";
import { readMealEntry, updateMealEntry } from "../shared/shopping-list-storage";
import type { Meal } from "../types/mealdb";

type MealDetailProps = {
  meal: Meal | null;
  onClose: () => void;
};

export default function MealDetail({ meal, onClose }: MealDetailProps) {
  const [savedMealId, setSavedMealId] = useState<string | null>(null);

  useEffect(() => {
    if (!meal) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Backspace") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [meal, onClose]);

  if (!meal) {
    return null;
  }

  const isMealSaved = savedMealId === meal.idMeal || Boolean(readMealEntry(meal.idMeal));
  const ingredients = Array.from(ingredientIterator(meal));

  const handleAddToShoppingList = () => {
    updateMealEntry(meal.idMeal, meal.strMeal, ingredients);
    toast.success(`Updated ${meal.strMeal} in your shopping list.`);
    setSavedMealId(meal.idMeal);
  };

  const handleOpenShoppingList = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClose();
    window.dispatchEvent(new Event("shopping-list:open"));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="meal-detail-title"
      >
        {meal.strMealThumb && (
          <div className="relative h-64 w-full">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="meal-detail-title" className="text-2xl font-bold text-zinc-900">
              {meal.strMeal}
            </h2>
            <div className="flex items-center gap-2">
              {isMealSaved ? (
                <a
                  href="#shopping-list"
                  onClick={handleOpenShoppingList}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Open shopping list
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToShoppingList}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                  Add to shopping list
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Close
              </button>
            </div>
          </div>

          <MealMeta
            category={meal.strCategory}
            area={meal.strArea}
            tags={meal.strTags}
          />

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
            <div>
              <h3 className="text-base font-semibold text-zinc-900">Ingredients</h3>
              <div className="mt-2">
                <IngredientsList ingredients={ingredients} />
              </div>
            </div>

            {meal.strYoutube?.trim() && (
              <div>
                <h3 className="text-base font-semibold text-zinc-900">Video</h3>
                <MealVideo youtubeUrl={meal.strYoutube} title={meal.strMeal} />
              </div>
            )}
          </div>

          {meal.strInstructions && (
            <div className="mt-5">
              <h3 className="text-base font-semibold text-zinc-900">Instructions</h3>
              <InstructionsList strInstructions={meal.strInstructions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
