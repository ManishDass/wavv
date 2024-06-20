// pages/RegisterOrSignInPage.jsx

import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import useStore from '../stores/useStore'; // Ensure the path is correct

const RegisterOrSignInPage = () => {
  const darkMode = useStore(state => state.darkMode);


  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('bg-nigga');
    } else {
      root.classList.remove('bg-nigga');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Register or Sign In</h1>
      <div className="mb-4">
        <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded mr-4">Register</Link>
        <Link to="/login" className="bg-green-500 text-white px-6 py-3 rounded">Sign In</Link>
      </div>
    </div>
  );
};

export default RegisterOrSignInPage;
