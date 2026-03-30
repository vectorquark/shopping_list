import React from "react";
import Image from "next/image";
import type { Meal } from "../types/mealdb";

type MealCardProps = {
  meal: Meal;
  onSelect?: (meal: Meal) => void;
};

export default function MealCard({ meal, onSelect }: MealCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => onSelect?.(meal)}
        className="w-full cursor-pointer text-left"
      >
        <div className="relative aspect-[4/3] w-full bg-zinc-100">
          {meal.strMealThumb ? (
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              No image available
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-zinc-900">{meal.strMeal}</h2>
        </div>
      </button>
    </article>
  );
}
