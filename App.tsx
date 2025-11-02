
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { RecipeList } from './components/RecipeList';
import { FilterSidebar } from './components/FilterSidebar';
import { CookingModeModal } from './components/CookingModeModal';
import { ShoppingListView } from './components/ShoppingListView';
import { getRecipesFromImage } from './services/geminiService';
import { Recipe } from './types';
import { DIETARY_OPTIONS } from './constants';
import { LoadingSpinner } from './components/LoadingSpinner';

type AppView = 'recipes' | 'shoppingList';

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<AppView>('recipes');

  const handleImageUpload = async (imageDataUrl: string) => {
    setImage(imageDataUrl);
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const generatedRecipes = await getRecipesFromImage(imageDataUrl, activeFilters);
      setRecipes(generatedRecipes);
    } catch (err) {
      setError('Failed to get recipes. The AI might be busy, or the image could not be processed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };
  
  const applyFilters = useCallback(() => {
    if (activeFilters.length === 0) {
      setFilteredRecipes(recipes);
      return;
    }
    const filtered = recipes.filter(recipe =>
        activeFilters.every(filter => {
            const regex = new RegExp(filter, 'i');
            return regex.test(recipe.description) || recipe.dietaryTags?.some(tag => regex.test(tag));
        })
    );
    setFilteredRecipes(filtered);
  }, [recipes, activeFilters]);

  useEffect(() => {
    applyFilters();
  }, [recipes, activeFilters, applyFilters]);

  const addToShoppingList = (item: string) => {
    setShoppingList(prev => {
      if (!prev.includes(item)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromShoppingList = (item: string) => {
    setShoppingList(prev => prev.filter(i => i !== item));
  };
  
  const clearShoppingList = () => {
    setShoppingList([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} shoppingListCount={shoppingList.length} />

      <div className="flex flex-col md:flex-row">
        {activeView === 'recipes' && (
          <FilterSidebar
            options={DIETARY_OPTIONS}
            activeFilters={activeFilters}
            onFilterToggle={toggleFilter}
          />
        )}
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeView === 'recipes' ? (
            <>
              {!image && <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />}
              {isLoading && <div className="flex justify-center items-center mt-20"><LoadingSpinner /></div>}
              {error && <p className="text-center text-red-500 dark:text-red-400 mt-4">{error}</p>}
              {recipes.length > 0 && !isLoading && (
                 <RecipeList recipes={filteredRecipes} onSelectRecipe={setSelectedRecipe} />
              )}
            </>
          ) : (
            <ShoppingListView 
              items={shoppingList} 
              onRemoveItem={removeFromShoppingList} 
              onClearList={clearShoppingList}
            />
          )}
        </main>
      </div>

      {selectedRecipe && (
        <CookingModeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onAddToShoppingList={addToShoppingList}
        />
      )}
    </div>
  );
}
