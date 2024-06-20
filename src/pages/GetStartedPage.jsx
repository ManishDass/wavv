// src/components/pages/YourComponent.jsx
import React from 'react';
import backgroundImage from '../assets/getstarted-background.jpeg'; // Adjust the path as necessary
import Logo from '../assets/LogoWithText.svg'
import { Link } from 'react-router-dom';

const YourComponent = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-75 animate-gradient" />
      <div className="relative flex flex-col items-center justify-center text-center h-screen">
        <img src={Logo} className='bg-cover bg-no-repeat h-24 mb-auto mt-12' alt='logo' />
        <h1 className="text-white text-4xl mb-8">Welcome to Wavv</h1>
        <p className="text-neutral-500 text-sm mb-8 mx-8">A open-source music player made for everyone, enjoy ad-free listening experience, vocal for local, if you like kindly share it with your friends</p>
        <div className="bg-green-500 text-white px-28 py-8 rounded-[30px] mb-20">
          <Link to="/choose-color-mode" className='text-2xl transition-transform duration-200 ease-in-out transform hover:bg-green-600 active:bg-green-700 active:scale-95 active:shadow-lg'>Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default YourComponent;
