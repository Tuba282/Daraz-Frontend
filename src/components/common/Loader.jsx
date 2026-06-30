import React from 'react';
import Image from './Image';

const Loader = ({ size = 'sm', fullScreen = false }) => {

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  const ringBorder = {
    sm: 'w-12 h-12 border-[3px]',
    md: 'w-24 h-24 border-[3px]',
    lg: 'w-28 h-28 border-4',
  };

  const darazLoader = (
    <div className="relative flex items-center justify-center">
      {/* Spinning ring - orange on top, transparent at bottom */}
      <div
        className={`${ringBorder[size]} rounded-full border-primary border-b-transparent border-l-transparent animate-spin absolute`}
      />
      {/* Daraz icon in the center */}
      <Image
        src="/loader.png"
        alt="Loading..."
        className={`${iconSizes[size]} object-contain relative z-10`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
        {darazLoader}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-2">
      {darazLoader}
    </div>
  );
};

export default Loader;
