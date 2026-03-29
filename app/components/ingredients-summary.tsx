import React from "react";
import { ingredientIterator } from "../shared/get-meal-ingredients";
import type { Meal } from "../types/mealdb";

type IngredientsSummaryProps = {
  meal: Meal;
};

export default function IngredientsSummary({
  meal
}: IngredientsSummaryProps) {
  const ingredients: string[] = [];

  for (const item of ingredientIterator(meal)) {
    ingredients.push(item.measure ? `${item.measure} ${item.ingredient}` : item.ingredient);
  }

  if (ingredients.length === 0) {
    return <p className="text-sm text-zinc-500">Ingredients unavailable</p>;
  }

  return <p className="text-sm text-zinc-600">{ingredients.join(" • ")}</p>;
}
