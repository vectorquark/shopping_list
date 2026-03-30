"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Accordion from "./accordion";
import AllSavedIngredientsList from "./all-saved-ingredients-list";
import IngredientsList from "./ingredients-list";
import { mergeIngredientsByName } from "../shared/combine-ingredients";
import { listMealIngredients, deleteMealEntry, type ShoppingListByMealId } from "../shared/shopping-list-storage";

type ShoppingCartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onViewMeal: (mealId: string) => Promise<void>;
};

export default function ShoppingCartModal({
  isOpen,
  onClose,
  onViewMeal,
}: ShoppingCartModalProps) {
  const [savedMeals, setSavedMeals] = useState<ShoppingListByMealId>({});
  const [loadingMealId, setLoadingMealId] = useState<string | null>(null);

  const allSavedIngredients = useMemo(() => {
    const ingredientsByMeal = Object.values(savedMeals).map((entry) => entry.ingredients);
    const combinedIngredients = [];

    for (const mealIngredients of ingredientsByMeal) {
      for (const ingredient of mealIngredients) {
        combinedIngredients.push(ingredient);
      }
    }

    return mergeIngredientsByName(combinedIngredients);
  }, [savedMeals]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSavedMeals(listMealIngredients());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const mealEntries = Object.entries(savedMeals).sort((a, b) =>
    a[1].mealName.localeCompare(b[1].mealName),
  );

  const handleDelete = (mealId: string) => {
    const removedMealName = savedMeals[mealId]?.mealName;
    deleteMealEntry(mealId);
    setSavedMeals(listMealIngredients());
    toast.success(
      removedMealName
        ? `Removed ${removedMealName} from your shopping list.`
        : "Removed recipe from your shopping list.",
    );
  };

  const handleViewMeal = async (mealId: string) => {
    setLoadingMealId(mealId);
    try {
      await onViewMeal(mealId);
    } finally {
      setLoadingMealId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <aside
        className="flex flex-col w-full max-w-sm max-h-[90vh] rounded-xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shopping-list-title"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="shopping-list-title" className="text-lg font-semibold text-zinc-900">
            Shopping List
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-zinc-300 px-2.5 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Close
          </button>
        </div>

        <div className="h-[300px] overflow-y-auto pr-1">
          {mealEntries.length === 0 ? (
            <p className="text-sm text-zinc-600">No ingredients.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {mealEntries.map(([mealId, { mealName, ingredients }]) => (
                <li key={mealId} className="flex items-start gap-2">
                  <div className="flex-1">
                  <Accordion title={mealName}>
                    <IngredientsList ingredients={ingredients} />
                  </Accordion>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleViewMeal(mealId)}
                    disabled={loadingMealId === mealId}
                    className="mt-1 shrink-0 rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-wait disabled:opacity-60"
                    aria-label={`View ${mealName}`}
                  >
                    {loadingMealId === mealId ? "Loading..." : "View"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(mealId)}
                    className="mt-1 shrink-0 rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                    aria-label={`Remove ${mealName}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <AllSavedIngredientsList ingredients={allSavedIngredients} />
      </aside>
    </div>
  );
}
