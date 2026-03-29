import React from "react";
import type { MealIngredientItem } from "../shared/get-meal-ingredients";

type IngredientsListProps = {
  ingredients: MealIngredientItem[];
  emptyText?: string;
};

export default function IngredientsList({
  ingredients,
  emptyText = "Ingredients unavailable",
}: IngredientsListProps) {
  if (ingredients.length === 0) {
    return <p className="text-sm text-zinc-500">{emptyText}</p>;
  }

  return (
    <ul className="space-y-1 text-sm text-zinc-700">
      {ingredients.map(({ ingredient, measure }, index) => (
        <li key={`${ingredient}-${measure}-${index}`} className="flex justify-between gap-4">
          <span>{ingredient}</span>
          {measure && <span className="text-zinc-500">{measure}</span>}
        </li>
      ))}
    </ul>
  );
}
