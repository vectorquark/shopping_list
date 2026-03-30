import MealResultsGrid from "../components/meal-results-grid";
import { searchMealsByName } from "../shared/mealdb-api";
import type { Meal } from "../types/mealdb";

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

  // this allows us to handle both string and string[] types for the search text, defaulting to an empty string if not provided
  const text = (Array.isArray(rawText) ? rawText[0] ?? "" : rawText ?? "").trim();
  let meals: Meal[] | null = null;

  if (text) {
    meals = await searchMealsByName(text);
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
          <div className="mt-6 flex flex-col items-center text-center">
            <img
              src="/no-recipes-cute.svg"
              alt="Cute empty bowl illustration when no recipes are found"
              className="h-auto w-full max-w-xs"
            />
            <p className="mt-3 text-zinc-600">No recipes found.</p>
          </div>
        )}
      </section>
    </main>
  );
}
