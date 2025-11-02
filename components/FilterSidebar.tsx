
import React from 'react';

interface FilterSidebarProps {
  options: string[];
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ options, activeFilters, onFilterToggle }) => {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-6 border-b md:border-r border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Dietary Filters</h3>
      <div className="space-y-3">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={activeFilters.includes(option)}
              onChange={() => onFilterToggle(option)}
            />
            <span className="text-gray-700 dark:text-gray-300">{option}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};
