
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
    </svg>
);

const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM10 18a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
    </svg>
);


export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
    const difficultyColor = {
        Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };

    return (
    <div
      onClick={onSelect}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">{recipe.recipeName}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColor[recipe.difficulty]}`}>{recipe.difficulty}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-16 overflow-hidden">{recipe.description}</p>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1.5">
                <ClockIcon />
                <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <FireIcon />
                <span>{recipe.calories} kcal</span>
            </div>
        </div>
      </div>
    </div>
  );
};
