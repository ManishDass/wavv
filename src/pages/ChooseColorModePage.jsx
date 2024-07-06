import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../stores/useStore'; // Adjust the path accordingly
import Logo from '../assets/LogoWithText.svg';
import Moon from '../assets/images/Moon.svg?react';
import Sun from '../assets/images/Sun.svg?react';
import System from '../assets/images/System.svg?react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const ChooseColorModePage = () => {
  useDarkMode(); //add or remove dark mode according to device-color-scheme
  const navigate = useNavigate()
  const respectOSPreference = useStore(state => state.respectOSPreference);
  const setDarkMode = useStore(state => state.setDarkMode);
  const [currentMode, setCurrentMode] = useState()
  
  const [modeSelected, setModeSelected] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleModeChange = (mode) => {
    setCurrentMode(mode)
    console.log("Color Change Button Called", mode);
    setModeSelected(true);
    setWarning(false);
    if (mode === 'light') {
      localStorage.theme = 'light';
      setDarkMode(false);
    } else if (mode === 'dark') {
      localStorage.theme = 'dark';
      setDarkMode(true);
    } else if (mode === 'auto') {
      respectOSPreference();
    }
  };


  const handleContinueClick = () => {
    if (!modeSelected) {
      setWarning(true);
    }
    else {
      navigate(modeSelected ? "/register-or-sign-in" : "#")
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center
                 bg-no-repeat bg-cover bg-center h-dvh h-1
                 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.3),rgba(0,0,0,1)),url('/images/colormode-page.jpg')]">
      <img src={Logo} className='bg-cover bg-no-repeat h-[4.5rem] mb-auto mt-6' alt='logo' />

      <h1 className={`text-xl font-bold mb-2 ${modeSelected ? 'text-[#62CD5D]' : 'text-white'} ${warning ? 'text-red-500' : ''}`}>
  {`${warning ? 'Please ' : ''}Choose Mode${warning ? '!' : ''}`}
</h1>

      <div className='flex justify-evenly items-stretch w-screen h-28 mb-12'>

        {/* Dark Mode */}
        <div className='flex flex-col justify-center items-center gap-4 relative z-20'
          onClick={() => handleModeChange('dark')} >
          <div className='flex flex-col justify-center items-center backdrop-blur-md bg-white/30 rounded-full h-14 w-14
                          active:bg-white/50 focus:bg-white/50'>
            <Moon />
          </div>
          <p className='text-white text-xs'>Dark</p>
          <div className={` bg-[#62CD5D] h-5 w-8 rounded-b-full absolute bottom-10 -z-10 ${currentMode === 'dark' ? '' : 'hidden'}`}></div>
        </div>

        

        {/* Light Mode */}
        <div className='flex flex-col justify-center items-center gap-4 relative z-20'
          onClick={() => handleModeChange('light')} >
          <div className='flex flex-col justify-center items-center backdrop-blur-md bg-white/30 rounded-full h-14 w-14
                          active:bg-white/50 focus:bg-white/50' >
            <Sun />
          </div>
          <p className='text-white text-xs'>Light</p>
          <div className={`bg-[#62CD5D] h-5 w-8 rounded-b-full absolute bottom-10 -z-10 ${currentMode === 'light' ? '' : 'hidden'}`}></div>
        </div>

        {/* Auto Mode */}
        <div className='flex flex-col justify-center items-center gap-4 relative z-20'
          onClick={() => handleModeChange('auto')}
        >
          <div className='flex flex-col justify-center items-center backdrop-blur-md bg-white/30 rounded-full h-14 w-14
                          active:bg-white/50 focus:bg-white/50'>
            <System />
          </div>
          <p className='text-white text-xs'>Auto</p>
          <div className={`bg-[#62CD5D] h-5 w-8 rounded-b-full absolute bottom-10 -z-10 ${currentMode === 'auto' ? '' : 'hidden'}`}></div>
        </div>

      </div>

      <div className="bg-[#62CD5D] text-white px-24 py-6 rounded-[25px] mb-14"
           onClick={handleContinueClick}>
        <p className='cursor-pointer'>Continue</p>
      </div>
    </div>
  );
};

export default ChooseColorModePage;