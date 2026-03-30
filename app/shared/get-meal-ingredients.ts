import { MEAL_FIELD_COUNT, type Meal } from "../types/mealdb";

export type MealIngredientItem = {
  ingredient: string;
  measure: string;
};

export function* ingredientIterator(
  meal: Meal,
): IterableIterator<MealIngredientItem> {
  for (let i = 1; i <= MEAL_FIELD_COUNT; i += 1) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];

    if (typeof ingredient !== "string")
      continue;

    const ingredientValue = ingredient.trim();
    if (!ingredientValue)
      continue;

    const measureValue = typeof measure === "string" ? measure.trim() : "";
    yield { ingredient: ingredientValue, measure: measureValue };
  }
}

export function getMealIngredients(meal: Meal): MealIngredientItem[] {
  return Array.from(ingredientIterator(meal));
}
