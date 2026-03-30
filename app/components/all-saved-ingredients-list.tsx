"use client";

import React from "react";
import IngredientsList from "./ingredients-list";
import type { MealIngredientItem } from "../shared/get-meal-ingredients";

type AllSavedIngredientsListProps = {
  ingredients: MealIngredientItem[];
};

export default function AllSavedIngredientsList({
  ingredients,
}: AllSavedIngredientsListProps) {
  return (
    <section className="mt-4 border-t border-zinc-200 pt-4">
      <h3 className="text-sm font-semibold text-zinc-900">All Saved Ingredients</h3>
      <div className="mt-2 max-h-[300px] overflow-y-auto pr-1">
        <IngredientsList
          ingredients={ingredients}
          emptyText="No saved ingredients yet."
        />
      </div>
    </section>
  );
}
