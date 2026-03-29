"use client";

import React, { useState } from "react";
import MealCard from "./meal-card";
import MealDetail from "./meal-detail";
import type { Meal } from "../types/mealdb";

type MealResultsGridProps = {
  meals: Meal[];
};

export default function MealResultsGrid({ meals }: MealResultsGridProps) {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  return (
    <>
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <div className="transition hover:scale-[1.01]">
              <MealCard meal={meal} onSelect={setSelectedMeal} />
            </div>
          </li>
        ))}
      </ul>

      <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
    </>
  );
}
