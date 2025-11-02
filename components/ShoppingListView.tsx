
import React from 'react';

interface ShoppingListViewProps {
  items: string[];
  onRemoveItem: (item: string) => void;
  onClearList: () => void;
}

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({ items, onRemoveItem, onClearList }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Shopping List</h2>
        {items.length > 0 && (
          <button
            onClick={onClearList}
            className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400">Your shopping list is empty.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Missing ingredients from recipes will appear here.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item, index) => (
              <li key={index} className="p-4 flex justify-between items-center">
                <span className="text-gray-800 dark:text-gray-200">{item}</span>
                <button
                  onClick={() => onRemoveItem(item)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
