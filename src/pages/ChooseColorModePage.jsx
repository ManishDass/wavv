// pages/ChooseColorModePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../stores/useStore'; // Adjust the path accordingly

const ChooseColorModePage = () => {
  const toggleDarkMode = useStore(state => state.toggleDarkMode);
  const respectOSPreference = useStore(state => state.respectOSPreference);
  const darkMode = useStore(state => state.darkMode);
  const setDarkMode = useStore(state => state.setDarkMode);

  const handleModeChange = (event) => {
    const mode = event.target.value;
    if (mode === 'light') {
      localStorage.theme = 'light';
      setDarkMode();
    } else if (mode === 'dark') {
      localStorage.theme = 'dark';
      setDarkMode();
    } else if (mode === 'auto') {
      respectOSPreference();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900' :  'bg-white'} `}>
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' :  'text-black'}`}>Choose Color Mode</h1>
      <div className="mb-4">
        <label className={`mr-4 ${darkMode ? 'text-white' :  'text-black'}`}>
          <input
            type="radio"
            name="color-mode"
            value="light"
            onChange={handleModeChange}
          /> Light
        </label>
        <label className={`mr-4 ${darkMode ? 'text-white' :  'text-black'}`}>
          <input
            type="radio"
            name="color-mode"
            value="dark"
            onChange={handleModeChange}
          /> Dark
        </label>
        <label className={`mr-4 ${darkMode ? 'text-white' :  'text-black'}`}>
          <input
            type="radio"
            name="color-mode"
            value="auto"
            onChange={handleModeChange}
          /> Auto
        </label>
      </div>
      <div className="bg-blue-500 text-white px-6 py-3 rounded">
        <Link to="/register-or-sign-in">Continue</Link>
      </div>
    </div>
  );
};

export default ChooseColorModePage;
