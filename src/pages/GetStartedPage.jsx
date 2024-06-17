// pages/GetStartedPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const GetStartedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Welcome to Wavv</h1>
      <div className="bg-green-500 text-white px-6 py-3 rounded mb-4">
        <Link to="/choose-color-mode">Get Started</Link>
      </div>
    </div>
  );
};

export default GetStartedPage;
