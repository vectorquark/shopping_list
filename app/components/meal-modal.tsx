"use client";

import React, { useEffect } from "react";
import IngredientsSummary from "./ingredients-summary";
import MealVideo from "./meal-video";
import type { Meal } from "../types/mealdb";

type MealModalProps = {
  meal: Meal | null;
  onClose: () => void;
};

export default function MealModal({ meal, onClose }: MealModalProps) {
  useEffect(() => {
    if (!meal) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [meal, onClose]);

  if (!meal) {
    return null;
  }

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
        aria-labelledby="meal-modal-title"
      >
        {meal.strMealThumb && (
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-64 w-full object-cover"
          />
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="meal-modal-title" className="text-2xl font-bold text-zinc-900">
              {meal.strMeal}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Close
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <p>
              <span className="font-semibold text-zinc-900">Category:</span>{" "}
              {meal.strCategory || "Unknown"}
            </p>
            <p>
              <span className="font-semibold text-zinc-900">Area:</span>{" "}
              {meal.strArea || "Unknown"}
            </p>
            {meal.strTags && (
              <p>
                <span className="font-semibold text-zinc-900">Tags:</span>{" "}
                {meal.strTags}
              </p>
            )}
            <div>
              <span className="font-semibold text-zinc-900">Ingredients:</span>
              <div className="mt-1">
                <IngredientsSummary meal={meal} maxItems={20} />
              </div>
            </div>
          </div>

          <MealVideo youtubeUrl={meal.strYoutube} title={meal.strMeal} />

          {meal.strInstructions && (
            <div className="mt-5">
              <h3 className="text-base font-semibold text-zinc-900">Instructions</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-700">
                {meal.strInstructions}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
