import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../stores/useStore'; // Adjust the path accordingly
import Logo from '../assets/LogoWithText.svg';
import Moon from '../assets/images/Moon.svg?react';
import Sun from '../assets/images/Sun.svg?react';

const ChooseColorModePage = () => {
  const respectOSPreference = useStore(state => state.respectOSPreference);
  const darkMode = useStore(state => state.darkMode);
  const setDarkMode = useStore(state => state.setDarkMode);
  
  const [modeSelected, setModeSelected] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleModeChange = (mode) => {
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

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleContinueClick = () => {
    if (!modeSelected) {
      setWarning(true);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center
                 bg-no-repeat bg-cover bg-center h-dvh
                 bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('/images/colormode-page.webp')]">
      <img src={Logo} className='bg-cover bg-no-repeat h-16 mb-auto mt-6' alt='logo' />

      <h1 className={`text-xl font-bold mb-2 ${modeSelected ? 'text-[#62CD5D]' : 'text-white'} ${warning ? 'text-red-500' : ''}`}>
  {`${warning ? 'Please ' : ''}Choose Mode${warning ? '!' : ''}`}
</h1>

      <div className='flex justify-evenly items-stretch w-screen h-28 mb-12'>

        {/* Dark Mode */}
        <div className='flex flex-col justify-center items-center'
          onClick={() => handleModeChange('dark')}
        >
          <div className='flex flex-col justify-center items-center backdrop-blur-md bg-white/30 rounded-full h-14 w-14
                          active:bg-white/50 focus:bg-white/50'>
            <Moon />
          </div>
          <p className='text-white text-xs'>Dark</p>
        </div>

        {/* Light Mode */}
        <div className='flex flex-col justify-center items-center'
          onClick={() => handleModeChange('light')} >
          <div className='flex flex-col justify-center items-center backdrop-blur-md bg-white/30 rounded-full h-14 w-14
                          active:bg-white/50 focus:bg-white/50' >
            <Sun />
          </div>
          <p className='text-white text-xs'>Light</p>
        </div>

        {/* Auto Mode */}
        <div className='flex flex-col justify-center items-center'
          onClick={() => handleModeChange('auto')}
        >
          <div className='flex flex-col justify-center items-center backdrop-blur-md bg-white/30 rounded-full h-14 w-14
                          active:bg-white/50 focus:bg-white/50'>
            <Moon />
          </div>
          <p className='text-white text-xs'>Auto</p>
        </div>

      </div>

      <div className="bg-[#62CD5D] text-white px-24 py-6 rounded-[20px] mb-14"
           onClick={handleContinueClick}>
        <Link to={modeSelected ? "/register-or-sign-in" : "#"}>Continue</Link>
      </div>
    </div>
  );
};

export default ChooseColorModePage;