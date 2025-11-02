
export interface Ingredient {
  name: string;
  quantity: string;
  inFridge: boolean;
}

export interface Recipe {
  recipeName: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
  calories: number;
  ingredients: Ingredient[];
  instructions: string[];
  dietaryTags?: string[];
}
