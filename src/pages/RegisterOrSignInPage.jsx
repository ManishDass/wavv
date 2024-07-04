// pages/RegisterOrSignInPage.jsx

import React, { useEffect } from 'react';
import useStore from '../stores/useStore'; // Ensure the path is correct
import Logo from '../assets/LogoWithText.svg';
import { useNavigate } from 'react-router-dom';
import Spiral from '../assets/images/Spiral.svg?react';
import Union from '../assets/images/Union.svg?react';
import BackIcon from '../assets/images/Back.svg?react';

const RegisterOrSignInPage = () => {

  // Apply overflow hidden to body
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible'; // Reset overflow on unmount if necessary
    };
  }, []);

  const darkMode = useStore(state => state.darkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('bg-nigga');
    } else {
      root.classList.remove('bg-nigga');
    }
  }, [darkMode]);

  return (
    <div className='flex flex-col justify-center items-center h-screen overflow-hidden test bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.7))] '>

      <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button absolute top-5 left-5' onClick={()=>navigate(-1)}>
        <BackIcon />
      </div>

      <img src={Logo} className='bg-cover bg-no-repeat h-16 mb-10 -mt-40' alt='logo' />
      <h1 className='text-white text-2xl mb-4'>Enjoy listening to music</h1>
      <p className='text-sm text-neutral-300 mb-8 mx-6 text-center'>Spotify is a proprietary Swedish audio streaming and media services provider </p>
      <div className='flex justify-center items-center gap-10'>
        <button className='bg-[#62CD5D] text-white px-7 py-4 rounded-[20px] mb-14' onClick={() => navigate('/register')}>Register</button>
        <button className='text-white px-7 py-4 rounded-[20px] mb-14 shadow-lg shadow-green-500/50' onClick={() => navigate('/login')}>Sign in</button>
      </div>
      <img className='rotate-image' src='/images/registerpage.png' />
      <Spiral className='spiral1' />
      <Union className='spiral2' />
    </div>
  );
};

export default RegisterOrSignInPage;
