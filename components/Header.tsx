
import React from 'react';

interface HeaderProps {
  activeView: 'recipes' | 'shoppingList';
  setActiveView: (view: 'recipes' | 'shoppingList') => void;
  shoppingListCount: number;
}

const ShoppingBagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, shoppingListCount }) => {
  const getTabClass = (view: 'recipes' | 'shoppingList') =>
    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      activeView === view
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Culinary Assistant AI
          </h1>
          <nav className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setActiveView('recipes')} className={getTabClass('recipes')}>
              <BookOpenIcon />
              <span className="hidden sm:inline">Recipes</span>
            </button>
            <button onClick={() => setActiveView('shoppingList')} className={`${getTabClass('shoppingList')} relative`}>
              <ShoppingBagIcon />
              <span className="hidden sm:inline">Shopping List</span>
              {shoppingListCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {shoppingListCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
