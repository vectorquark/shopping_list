import type { MealIngredientItem } from "./get-meal-ingredients";

function parseMeasure(measure: string): number {
  const numericPart = parseFloat(measure);
  return isNaN(numericPart) ? 0 : numericPart;
}

function parseUnit(measure: string): string {
  const match = measure.match(/[a-zA-Z]+/);
  return match ? match[0].toLowerCase() : "";
}

const UNIT_CONVERSIONS: { [key: string]: { [key: string]: number } } = {
  "g": { "kg": 0.001 },
  "kg": { "g": 1000 },
  "ml": { "l": 0.001 },
  "l": { "ml": 1000 },
};

const PROMOTION_UNIT_BY_BASE_UNIT: Record<string, string> = {
  g: "kg",
  ml: "l",
};

const DEMOTION_UNIT_BY_LARGER_UNIT: Record<string, string> = {
  kg: "g",
  l: "ml",
};

export function convertMeasure(measure: string, targetUnit: string): number {
  const numericPart = parseMeasure(measure);
  const unit = parseUnit(measure);

  if (unit === targetUnit) {
    return numericPart;
  }

  const conversion = UNIT_CONVERSIONS[unit]?.[targetUnit];
  return conversion ? numericPart * conversion : numericPart;
}

export function combineMeasures(measures: string[]): string {
  const targetUnit = parseUnit(measures[0]);

  const total = measures.reduce((sum, measure) => {
    return sum + convertMeasure(measure, targetUnit);
  }, 0);

  if (total <= 0) {
    return "";
  }

  let displayValue = total;
  let displayUnit = targetUnit;

  const promotedUnit = PROMOTION_UNIT_BY_BASE_UNIT[targetUnit];
  if (promotedUnit && total >= 1000) {
    displayValue = convertMeasure(`${total}${targetUnit}`, promotedUnit);
    displayUnit = promotedUnit;
  }

  const demotedUnit = DEMOTION_UNIT_BY_LARGER_UNIT[targetUnit];
  if (demotedUnit && total < 1) {
    displayValue = convertMeasure(`${total}${targetUnit}`, demotedUnit);
    displayUnit = demotedUnit;
  }

  const normalizedValue = Number(displayValue.toFixed(6)).toString();
  return normalizedValue + (displayUnit ? ` ${displayUnit}` : "");
}

export function mergeIngredientsByName(ingredients: MealIngredientItem[]): MealIngredientItem[] {
  const merged = new Map<string, MealIngredientItem>();

  for (const { ingredient, measure } of ingredients) {
    // Use a normalized key for merging (e.g., lowercase and trimmed)
    const key = ingredient.trim().toLowerCase();

    if (!key)
      continue;
    
    const existing = merged.get(key);
    if (existing) {
        // if the ingredient already exists, combine the measures
      existing.measure = combineMeasures([existing.measure, measure]);
    } else {
        // just add the ingredient as is if it's not already in the map
      merged.set(key, { ingredient: key, measure });
    }
  }

  const mergedIngredients: MealIngredientItem[] = [];

  for (const entry of merged) {
    mergedIngredients.push(entry[1]);
  }

  return mergedIngredients;
}
