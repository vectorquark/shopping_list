import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearMealIngredients,
  createMealEntry,
  deleteMealEntry,
  listMealIngredients,
  readMealEntry,
  updateMealEntry,
} from "./shopping-list-storage";

const STORAGE_KEY = "shopping-list-by-meal-id";

type LocalStorageMock = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

function createLocalStorageMock(initialData: Record<string, string> = {}): LocalStorageMock {
  const store = new Map<string, string>(Object.entries(initialData));

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
}

const originalWindow = globalThis.window;

beforeEach(() => {
  Object.defineProperty(globalThis, "window", {
    value: {
      localStorage: createLocalStorageMock(),
    },
    configurable: true,
    writable: true,
  });
});

afterEach(() => {
  Object.defineProperty(globalThis, "window", {
    value: originalWindow,
    configurable: true,
    writable: true,
  });
});

describe("shopping-list-storage", () => {
  it("returns an empty object when storage is empty", () => {
    expect(listMealIngredients()).toEqual({});
  });

  it("creates and reads an entry", () => {
    createMealEntry("1", "Pasta", [{ ingredient: "tomato", measure: "2" }]);

    expect(readMealEntry("1")).toEqual({
      mealName: "Pasta",
      ingredients: [{ ingredient: "tomato", measure: "2" }],
    });
  });

  it("throws when creating a duplicate meal entry", () => {
    createMealEntry("1", "Pasta", [{ ingredient: "tomato", measure: "2" }]);

    expect(() =>
      createMealEntry("1", "Pasta", [{ ingredient: "onion", measure: "1" }]),
    ).toThrow("Meal already in shopping list");
  });

  it("updates an existing entry", () => {
    createMealEntry("1", "Pasta", [{ ingredient: "tomato", measure: "2" }]);
    updateMealEntry("1", "Pasta", [{ ingredient: "tomato", measure: "3" }]);

    expect(readMealEntry("1")?.ingredients).toEqual([
      { ingredient: "tomato", measure: "3" },
    ]);
  });

  it("deletes an entry", () => {
    createMealEntry("1", "Pasta", [{ ingredient: "tomato", measure: "2" }]);
    deleteMealEntry("1");

    expect(readMealEntry("1")).toBeNull();
  });

  it("does nothing when deleting a missing entry", () => {
    expect(() => deleteMealEntry("missing")).not.toThrow();
    expect(listMealIngredients()).toEqual({});
  });

  it("clears all ingredients", () => {
    createMealEntry("1", "Pasta", [{ ingredient: "tomato", measure: "2" }]);
    clearMealIngredients();

    expect(listMealIngredients()).toEqual({});
  });

  it("returns empty object when stored JSON is invalid", () => {
    globalThis.window.localStorage.setItem(STORAGE_KEY, "not-json");

    expect(listMealIngredients()).toEqual({});
  });

  it("returns empty object when window is unavailable", () => {
    Object.defineProperty(globalThis, "window", {
      value: undefined,
      configurable: true,
      writable: true,
    });

    expect(listMealIngredients()).toEqual({});
  });
});
