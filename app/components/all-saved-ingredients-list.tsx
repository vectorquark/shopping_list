"use client";

import React, { useEffect, useState } from "react";
import IngredientsList from "./ingredients-list";
import type { MealIngredientItem } from "../shared/get-meal-ingredients";
import { listMealIngredients } from "../shared/shopping-list-storage";

type AllSavedIngredientsListProps = {
  isOpen: boolean;
  refreshSignal: number;
};

export default function AllSavedIngredientsList({
  isOpen,
  refreshSignal,
}: AllSavedIngredientsListProps) {
  const [allIngredients, setAllIngredients] = useState<MealIngredientItem[]>([]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const savedMeals = listMealIngredients();
    const combinedIngredients = Object.values(savedMeals).flatMap((entry) => entry.ingredients);
    setAllIngredients(combinedIngredients);
  }, [isOpen, refreshSignal]);

  return (
    <section className="mt-4 border-t border-zinc-200 pt-4">
      <h3 className="text-sm font-semibold text-zinc-900">All Saved Ingredients</h3>
      <div className="mt-2 max-h-[300px] overflow-y-auto pr-1">
        <IngredientsList
          ingredients={allIngredients}
          emptyText="No saved ingredients yet."
        />
      </div>
    </section>
  );
}