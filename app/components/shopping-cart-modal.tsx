"use client";

import React, { useEffect, useState } from "react";
import Accordion from "./accordion";
import { listMealIngredients, deleteMealEntry, type ShoppingListByMealId } from "../shared/shopping-list-storage";

type ShoppingCartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ShoppingCartModal({
  isOpen,
  onClose,
}: ShoppingCartModalProps) {
  const [savedMeals, setSavedMeals] = useState<ShoppingListByMealId>({});

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

  const mealEntries = Object.entries(savedMeals);

  const handleDelete = (mealId: string) => {
    deleteMealEntry(mealId);
    setSavedMeals(listMealIngredients());
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
        aria-labelledby="shopping-cart-title"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="shopping-cart-title" className="text-lg font-semibold text-zinc-900">
            Shopping Cart
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-zinc-300 px-2.5 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
          >
            Close
          </button>
        </div>

        {mealEntries.length === 0 ? (
          <p className="text-sm text-zinc-600">No ingredients.</p>
        ) : (
          <ul className="flex flex-col gap-2 overflow-y-auto">
            {mealEntries.map(([mealId, { mealName, ingredients }]) => (
              <li key={mealId} className="flex items-start gap-2">
                <div className="flex-1">
                <Accordion title={mealName}>
                  <ul className="space-y-1">
                    {ingredients.map(({ ingredient, measure }, index) => (
                      <li key={index} className="flex justify-between gap-4">
                        <span>{ingredient}</span>
                        {measure && <span className="text-zinc-500">{measure}</span>}
                      </li>
                    ))}
                  </ul>
                </Accordion>
                </div>
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
      </aside>
    </div>
  );
}
