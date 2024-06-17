// pages/ChooseColorModePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const ChooseColorModePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Choose Color Mode</h1>
      <div className="mb-4">
        <label className="mr-4">
          <input type="radio" name="color-mode" value="light" /> Light
        </label>
        <label className="mr-4">
          <input type="radio" name="color-mode" value="dark" /> Dark
        </label>
        <label>
          <input type="radio" name="color-mode" value="auto" /> Auto
        </label>
      </div>
      <div className="bg-blue-500 text-white px-6 py-3 rounded">
        <Link to="/register-or-sign-in">Continue</Link>
      </div>
    </div>
  );
};

export default ChooseColorModePage;
