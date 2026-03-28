type FieldIndex =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

type IngredientFields = {
  [K in `strIngredient${FieldIndex}`]: string | null;
};

type MeasureFields = {
  [K in `strMeasure${FieldIndex}`]: string | null;
};

export interface Meal extends IngredientFields, MeasureFields {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

export interface MealDbResponse {
  meals: Meal[] | null;
}
