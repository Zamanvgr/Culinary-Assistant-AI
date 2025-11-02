
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  isLoading: boolean;
}

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center mt-8 sm:mt-16">
      <div
        onClick={handleClick}
        className="mx-auto max-w-lg cursor-pointer rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-8 sm:p-12 transition-all hover:border-blue-500 hover:dark:border-blue-400"
      >
        <CameraIcon />
        <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">What's in your fridge?</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Click here to upload or take a photo. We'll find recipes for you.
        </p>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
