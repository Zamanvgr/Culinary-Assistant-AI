
import React, { useState, useEffect } from 'react';
import { Recipe, Ingredient } from '../types';

interface CookingModeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onAddToShoppingList: (item: string) => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({ recipe, onClose, onAddToShoppingList }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const TABS = ['Ingredients', 'Instructions'];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && activeTab === 'Instructions') handleNext();
      if (e.key === 'ArrowLeft' && activeTab === 'Instructions') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentStep]);

  const handleNext = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(recipe.instructions[currentStep]);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };
  
  const renderIngredients = () => (
    <div className="space-y-3 pr-2 max-h-[60vh] overflow-y-auto">
        {recipe.ingredients.map((ing, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-3 ${ing.inFridge ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                    <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{ing.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{ing.quantity}</p>
                    </div>
                </div>
                {!ing.inFridge && (
                    <button 
                        onClick={() => onAddToShoppingList(ing.name)}
                        className="text-xs bg-blue-500 text-white font-semibold px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Add
                    </button>
                )}
            </div>
        ))}
    </div>
  );

  const renderInstructions = () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center">
        <p className="text-2xl md:text-4xl leading-relaxed text-center font-light text-gray-800 dark:text-gray-200 p-4">
          {recipe.instructions[currentStep]}
        </p>
      </div>
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between">
          <button onClick={handlePrev} disabled={currentStep === 0} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 disabled:opacity-50">Prev</button>
          <span className="text-sm font-medium">{currentStep + 1} / {recipe.instructions.length}</span>
          <button onClick={handleNext} disabled={currentStep === recipe.instructions.length - 1} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 disabled:opacity-50">Next</button>
        </div>
        <button onClick={toggleSpeech} className="w-full mt-4 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
          {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl h-[90vh] max-h-[800px] flex flex-col relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 z-10">&times;</button>
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{recipe.recipeName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{recipe.description}</p>
        </div>
        
        <div className="p-6 flex-shrink-0">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {TABS.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 flex-grow overflow-hidden">
            {activeTab === 'Ingredients' ? renderIngredients() : renderInstructions()}
        </div>
      </div>
    </div>
  );
};
