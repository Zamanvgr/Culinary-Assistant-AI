
import React from 'react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No Recipes Found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters or uploading a new photo.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Suggested Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard key={`${recipe.recipeName}-${index}`} recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
        ))}
      </div>
    </div>
  );
};
