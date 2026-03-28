import React from "react";
import type { Meal } from "../types/mealdb";

type IngredientsSummaryProps = {
  meal: Meal;
  maxItems?: number;
};

function getIngredientSummary(meal: Meal, maxItems: number): string[] {
  const summary: string[] = [];

  for (let i = 1; i <= 20 && summary.length < maxItems; i += 1) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];

    if (typeof ingredient !== "string") {
      continue;
    }

    const ingredientValue = ingredient.trim();
    if (!ingredientValue) {
      continue;
    }

    const measureValue = typeof measure === "string" ? measure.trim() : "";
    summary.push(measureValue ? `${measureValue} ${ingredientValue}` : ingredientValue);
  }

  return summary;
}

export default function IngredientsSummary({
  meal,
  maxItems = 3,
}: IngredientsSummaryProps) {
  const ingredients = getIngredientSummary(meal, maxItems);

  if (ingredients.length === 0) {
    return <p className="text-sm text-zinc-500">Ingredients unavailable</p>;
  }

  return <p className="text-sm text-zinc-600">{ingredients.join(" • ")}</p>;
}
