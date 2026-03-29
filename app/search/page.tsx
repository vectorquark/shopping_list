import React from "react";
import MealResultsGrid from "../components/meal-results-grid";
import type { MealDbResponse } from "../types/mealdb";

type SearchPageProps = {
  searchParams:
    | Promise<{
        text?: string | string[];
      }>
    | {
        text?: string | string[];
      };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const rawText = resolvedSearchParams.text;
  const text = (Array.isArray(rawText) ? rawText[0] ?? "" : rawText ?? "").trim();
  const mealDbBaseUrl =
    process.env.MEALDB_BASE_URL ?? "https://www.themealdb.com/api/json/v1/1";

  let meals: MealDbResponse["meals"] = null;

  if (text) {
    const url = `${mealDbBaseUrl}/search.php?s=${encodeURIComponent(text)}`;
    const response = await fetch(url, { cache: "no-store" });

    if (response.ok) {
      const data: MealDbResponse = await response.json();
      meals = data.meals;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Search Results
        </h1>
        <p className="mt-3 text-zinc-700">
          Search text: <span className="font-semibold">{text || "(empty)"}</span>
        </p>

        {!text && (
          <p className="mt-4 text-zinc-600">Enter search text to see recipes.</p>
        )}

        {text && meals && meals.length > 0 && (
          <MealResultsGrid meals={meals} />
        )}

        {text && (!meals || meals.length === 0) && (
          <p className="mt-4 text-zinc-600">No recipes found.</p>
        )}
      </section>
    </main>
  );
}
