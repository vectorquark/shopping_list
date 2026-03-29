import type { MealIngredientItem } from "./get-meal-ingredients";

const STORAGE_KEY = "shopping-list-by-meal-id";

export type SavedMealEntry = {
  mealName: string;
  ingredients: MealIngredientItem[];
};

export type ShoppingListByMealId = Record<string, SavedMealEntry>;

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readStorage(): ShoppingListByMealId {
  if (!canUseLocalStorage()) {
    return {};
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return {};
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return typeof parsedValue === "object" && parsedValue !== null ? parsedValue : {};
  } catch {
    return {};
  }
}

function writeStorage(data: ShoppingListByMealId): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function listMealIngredients(): ShoppingListByMealId {
  return readStorage();
}

export function readMealEntry(mealId: string): SavedMealEntry | null {
  const storedItems = readStorage();
  return storedItems[mealId] ?? null;
}

export function createMealEntry(
  mealId: string,
  mealName: string,
  ingredients: MealIngredientItem[],
): void {
  const storedItems = readStorage();

  if (mealId in storedItems) {
    throw new Error(`Meal already in shopping list: ${mealName} (id: ${mealId})`);
  }

  storedItems[mealId] = { mealName, ingredients };
  writeStorage(storedItems);
}

export function updateMealEntry(
  mealId: string,
  mealName: string,
  ingredients: MealIngredientItem[],
): void {
  const storedItems = readStorage();
  storedItems[mealId] = { mealName, ingredients };
  writeStorage(storedItems);
}

export function deleteMealEntry(mealId: string): void {
  const storedItems = readStorage();

  if (!(mealId in storedItems)) {
    return;
  }

  delete storedItems[mealId];
  writeStorage(storedItems);
}

export function clearMealIngredients(): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}