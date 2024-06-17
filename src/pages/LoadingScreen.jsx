// components/LoadingScreen.jsx

import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Loading...</h1>
        {/* Insert your logo or additional loading content here */}
      </div>
    </div>
  );
};

export default LoadingScreen;
