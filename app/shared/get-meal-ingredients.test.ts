import { describe, expect, it } from "vitest";
import { ingredientIterator, getMealIngredients } from "./get-meal-ingredients";
import { MEAL_FIELD_COUNT, type Meal } from "../types/mealdb";

function buildMealWith(overrides: Partial<Record<`strIngredient${number}` | `strMeasure${number}`, string | null>> = {}): Meal {
  
    // initialize a meal object with all required fields and default null values for ingredients and measures
  
    const meal: Record<string, string | null> = {
    idMeal: "1",
    strMeal: "Test Meal",
    strMealAlternate: null,
    strCategory: null,
    strArea: null,
    strInstructions: null,
    strMealThumb: null,
    strTags: null,
    strYoutube: null,
    strSource: null,
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  };

  for (let i = 1; i <= MEAL_FIELD_COUNT; i += 1) {
    meal[`strIngredient${i}`] = null;
    meal[`strMeasure${i}`] = null;
  }

  for (const [key, value] of Object.entries(overrides)) {
    meal[key] = value ?? null;
  }

  return meal as unknown as Meal;
}

describe("ingredientIterator", () => {
  it("yields only non-empty ingredient entries", () => {
    const meal = buildMealWith({
      strIngredient1: "Chicken",
      strMeasure1: "2 breasts",
      strIngredient2: "",
      strMeasure2: "1 tbsp",
      strIngredient3: "   ",
      strMeasure3: "1 tsp",
      strIngredient4: "Onion",
      strMeasure4: "1",
    });

    const result = Array.from(ingredientIterator(meal));

    expect(result).toEqual([
      { ingredient: "Chicken", measure: "2 breasts" },
      { ingredient: "Onion", measure: "1" },
    ]);
  });

  it("trims ingredient and measure values", () => {
    const meal = buildMealWith({
      strIngredient1: "  Garlic  ",
      strMeasure1: "  2 cloves  ",
    });

    const result = Array.from(ingredientIterator(meal));

    expect(result).toEqual([{ ingredient: "Garlic", measure: "2 cloves" }]);
  });

  it("uses empty string when measure is missing", () => {
    const meal = buildMealWith({
      strIngredient1: "Salt",
      strMeasure1: null,
    });

    const result = Array.from(ingredientIterator(meal));

    expect(result).toEqual([{ ingredient: "Salt", measure: "" }]);
  });

  it("ignores non-string ingredient values", () => {
    const meal = buildMealWith({
      strIngredient1: null,
      strMeasure1: "2",
      strIngredient2: "Pepper",
      strMeasure2: "1 tsp",
    });

    const result = Array.from(ingredientIterator(meal));

    expect(result).toEqual([{ ingredient: "Pepper", measure: "1 tsp" }]);
  });

  it("iterates all fields up to MEAL_FIELD_COUNT", () => {
    const meal = buildMealWith({
      [`strIngredient${MEAL_FIELD_COUNT}`]: "Final Ingredient",
      [`strMeasure${MEAL_FIELD_COUNT}`]: "1 unit",
    });

    const result = Array.from(ingredientIterator(meal));

    expect(result).toEqual([{ ingredient: "Final Ingredient", measure: "1 unit" }]);
  });
});

describe("getMealIngredients", () => {
  it("returns array output equivalent to the iterator", () => {
    const meal = buildMealWith({
      strIngredient1: "Tomato",
      strMeasure1: "2",
      strIngredient2: "Basil",
      strMeasure2: "5 leaves",
    });

    expect(getMealIngredients(meal)).toEqual(Array.from(ingredientIterator(meal)));
  });

  it("returns an empty array when no valid ingredients are present", () => {
    const meal = buildMealWith({
      strIngredient1: "",
      strIngredient2: "   ",
      strIngredient3: null,
    });

    expect(getMealIngredients(meal)).toEqual([]);
  });
});
