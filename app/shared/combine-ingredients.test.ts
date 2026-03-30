import { describe, expect, it } from "vitest";
import {
  combineMeasures,
  convertMeasure,
  mergeIngredientsByName,
} from "./combine-ingredients";

describe("convertMeasure", () => {
  it("returns the numeric value when unit matches target", () => {
    expect(convertMeasure("100g", "g")).toBe(100);
  });

  it("converts grams to kilograms", () => {
    expect(convertMeasure("500g", "kg")).toBe(0.5);
  });

  it("converts kilograms to grams", () => {
    expect(convertMeasure("1kg", "g")).toBe(1000);
  });

  it("converts millilitres to litres", () => {
    expect(convertMeasure("500ml", "l")).toBe(0.5);
  });

  it("converts litres to millilitres", () => {
    expect(convertMeasure("2l", "ml")).toBe(2000);
  });

  it("returns the numeric part when units are incompatible", () => {
    expect(convertMeasure("200g", "ml")).toBe(200);
  });

  it("returns the numeric value for a unitless measure", () => {
    expect(convertMeasure("3", "")).toBe(3);
  });

  it("returns 0 for a non-numeric measure", () => {
    expect(convertMeasure("handful", "g")).toBe(0);
  });
});

describe("combineMeasures", () => {
  it("sums two measures with the same unit", () => {
    expect(combineMeasures(["100g", "200g"])).toBe("300 g");
  });

  it("converts and sums compatible units (g + kg)", () => {
    expect(combineMeasures(["500g", "1kg"])).toBe("1.5 kg");
  });

  it("promotes millilitres to litres when total reaches 1000ml", () => {
    expect(combineMeasures(["600ml", "500ml"])).toBe("1.1 l");
  });

  it("sums unitless numeric measures", () => {
    expect(combineMeasures(["2", "3"])).toBe("5");
  });

  it("returns empty string when total is zero", () => {
    expect(combineMeasures(["0g", "0g"])).toBe("");
  });

  it("handles a single measure", () => {
    expect(combineMeasures(["250ml"])).toBe("250 ml");
  });

   it("uses lower bound when under 1000", () => {
    expect(combineMeasures(["0.5kg", "200g", "0.1kg"])).toBe("800 g");
  });

  it("combines units not requiring conversion", () => {
    expect(combineMeasures(["1 basket", "2 basket"])).toBe("3 basket");
  });
});

describe("mergeIngredientsByName", () => {
  it("returns unique ingredients unchanged", () => {
    const result = mergeIngredientsByName([
      { ingredient: "Salt", measure: "1 tsp" },
      { ingredient: "Pepper", measure: "2 tsp" },
    ]);
    expect(result).toHaveLength(2);
  });

  it("merges duplicate ingredient names and combines measures", () => {
    const result = mergeIngredientsByName([
      { ingredient: "Salt", measure: "100g" },
      { ingredient: "Salt", measure: "200g" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].measure).toBe("300 g");
  });

  it("normalises ingredient names to lowercase", () => {
    const result = mergeIngredientsByName([
      { ingredient: "SALT", measure: "1 tsp" },
    ]);
    expect(result[0].ingredient).toBe("salt");
  });

  it("treats differently-cased duplicates as the same ingredient", () => {
    const result = mergeIngredientsByName([
      { ingredient: "Butter", measure: "100g" },
      { ingredient: "BUTTER", measure: "50g" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].ingredient).toBe("butter");
  });

  it("trims whitespace from ingredient names", () => {
    const result = mergeIngredientsByName([
      { ingredient: "  onion  ", measure: "1" },
    ]);
    expect(result[0].ingredient).toBe("onion");
  });

  it("skips entries with empty ingredient names", () => {
    const result = mergeIngredientsByName([
      { ingredient: "", measure: "100g" },
      { ingredient: "   ", measure: "50g" },
      { ingredient: "Flour", measure: "200g" },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].ingredient).toBe("flour");
  });

  it("returns an empty array for empty input", () => {
    expect(mergeIngredientsByName([])).toEqual([]);
  });
});
