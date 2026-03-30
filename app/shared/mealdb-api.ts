import type { Meal, MealDbResponse } from "../types/mealdb";

const MEALDB_BASE_URL =
  process.env.MEALDB_BASE_URL ?? "https://www.themealdb.com/api/json/v1/1";

export async function searchMealsByName(text: string): Promise<Meal[] | null> {
  const url = `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(text)}`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  const data: MealDbResponse = await response.json();
  return data.meals;
}

export async function fetchRandomMeal(): Promise<Meal | null> {
  const response = await fetch(`${MEALDB_BASE_URL}/random.php`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data: MealDbResponse = await response.json();
  return data.meals?.[0] ?? null;
}

export async function fetchMealById(mealId: string): Promise<Meal | null> {
  const response = await fetch(
    `${MEALDB_BASE_URL}/lookup.php?i=${encodeURIComponent(mealId)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    return null;
  }

  const data: MealDbResponse = await response.json();
  return data.meals?.[0] ?? null;
}
