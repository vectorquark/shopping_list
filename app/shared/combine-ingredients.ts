import type { MealIngredientItem } from "./get-meal-ingredients";

const UNIT_PROMOTION_THRESHOLD = 1000;
const UNIT_DEMOTION_THRESHOLD = 1;
const MEASURE_ROUNDING_DECIMALS = 2;

function parseMeasure(measure: string): number | "" {
  const numericPart = parseFloat(measure);
  return isNaN(numericPart) ? "" : numericPart;
}

function parseUnit(measure: string): string {
  const match = measure.match(/[a-zA-Z]+/);
  return match ? match[0].toLowerCase() : "";
}

const UNIT_CONVERSIONS: { [key: string]: { [key: string]: number } } = {
  "g": { "kg": 0.001 },
  "kg": { "g": UNIT_PROMOTION_THRESHOLD },
  "ml": { "l": 0.001 },
  "l": { "ml": UNIT_PROMOTION_THRESHOLD },
};

const PROMOTION_UNIT_BY_BASE_UNIT: Record<string, string> = {
  g: "kg",
  ml: "l",
};

const DEMOTION_UNIT_BY_LARGER_UNIT: Record<string, string> = {
  kg: "g",
  l: "ml",
};

function canUseMeasureForTarget(unit: string, targetUnit: string): boolean {
  return (
    unit === targetUnit ||
    (!unit && !targetUnit) ||
    Boolean(UNIT_CONVERSIONS[unit]?.[targetUnit])
  );
}

function formatMeasureValue(value: number, unit: string): string {
  const normalizedValue = Number(value.toFixed(MEASURE_ROUNDING_DECIMALS)).toString();
  return normalizedValue + (unit ? ` ${unit}` : "");
}

function convertNumericValue(
  numericValue: number,
  fromUnit: string,
  toUnit: string,
): number | "" {
  return convertMeasure(`${numericValue}${fromUnit}`, toUnit);
}

export function convertMeasure(measure: string, targetUnit: string): number | "" {
  const numericPart = parseMeasure(measure);
  const unit = parseUnit(measure);

  if (numericPart === "") {
    return "";
  }

  if (unit === targetUnit) {
    return numericPart;
  }

  if (!unit && !targetUnit) {
    return numericPart;
  }

  const conversion = UNIT_CONVERSIONS[unit]?.[targetUnit];
  return conversion ? numericPart * conversion : "";
}

export function combineMeasures(measures: string[]): string {
  if (measures.length === 0) {
    return "";
  }

  const targetUnit = parseUnit(measures[0]);
  const incompatibleMeasures: string[] = [];
  let total = 0;

  for (const measure of measures) {
    const unit = parseUnit(measure);
    const canUseMeasure = canUseMeasureForTarget(unit, targetUnit);

    if (!canUseMeasure) {
      incompatibleMeasures.push(measure.trim());
      continue;
    }

    const convertedMeasure = convertMeasure(measure, targetUnit);
    if (convertedMeasure !== "") {
      total += convertedMeasure;
    }
  }

  if (incompatibleMeasures.length > 0) {
    const compatibleMeasure = total > 0 ? formatMeasureValue(total, targetUnit) : "";

    return [compatibleMeasure, ...incompatibleMeasures].filter(Boolean).join(", ");
  }

  if (total <= 0) {
    return "";
  }

  let displayValue = total;
  let displayUnit = targetUnit;

  const promotedUnit = PROMOTION_UNIT_BY_BASE_UNIT[targetUnit];
  if (promotedUnit && total >= UNIT_PROMOTION_THRESHOLD) {
    const promotedValue = convertNumericValue(total, targetUnit, promotedUnit);
    if (promotedValue !== "") {
      displayValue = promotedValue;
      displayUnit = promotedUnit;
    }
  }

  const demotedUnit = DEMOTION_UNIT_BY_LARGER_UNIT[targetUnit];
  if (demotedUnit && total < UNIT_DEMOTION_THRESHOLD) {
    const demotedValue = convertNumericValue(total, targetUnit, demotedUnit);
    if (demotedValue !== "") {
      displayValue = demotedValue;
      displayUnit = demotedUnit;
    }
  }

  return formatMeasureValue(displayValue, displayUnit);
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
