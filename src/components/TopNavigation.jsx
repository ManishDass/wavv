import React, { useState, useEffect } from 'react'
import BackIcon from '../assets/images/Back.svg?react';
import Search from '../assets/images/Search.svg?react';
import Logo from '../assets/LogoWithText.svg';
import { useAuth } from '../context/AuthContext';
import useStore from '../stores/useStore'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
import BgShape from '../assets/images/BgShape.svg?react';

const TopNavigation = ({ options }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setSelectedTab } = useStore()
    const navigate = useNavigate()

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const { logout } = useAuth();

    return (
        <div>
            <div className='flex justify-between items-center mt-5 mt-6 px-6 '>
                {options.left === 'search' ? (
                    <Search onClick={() => setSelectedTab('search')} />
                ) : options.left === 'back' ? (
                    <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button' onClick={() => options.onBack ? setSelectedTab(options.onBack) : options.backHandler()}>
                        <BackIcon />
                    </div>
                ) : (null)}

                {options.center === 'logo' ?
                    (<img src={Logo} className='bg-cover bg-no-repeat h-7 -ml-5' alt='logo' />) : (
                        <h1 className='font-sans text-md text-white -ml-5'>{options.center}</h1>
                    )}

                <div className='relative flex flex-col gap-[2px]'>
                    <div className='absolute inset-0 -m-4' onClick={handleToggleModal}></div>
                    <div className='relative rounded-full bg-white h-1 w-1'></div>
                    <div className='relative rounded-full bg-white h-1 w-1'></div>
                    <div className='relative rounded-full bg-white h-1 w-1'></div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className='fixed h-screen w-screen bg-[#0F0817] z-50 top-0'>
                    <BgShape className='fixed w-screen bottom-10' />
                    <div className='flex justify-between items-center mt-[1.48rem] px-[1.21rem] '>
                        <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button' onClick={handleToggleModal} >
                            <BackIcon />
                        </div>
                        <h1 className='font-sans text-md text-white '>Settings</h1>
                        <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button' >
                            <div className='absolute h-14 w-14 -m-4' onClick={handleToggleModal} ></div>
                            <p className='text-white'>✘</p>
                        </div>
                    </div>
                    <ul className='text-white flex flex-col gap-4 font-sans text-sm mt-10'>
                        <li className='text-[#62CD5D] -mb-2 px-6'>Content Preferences</li>
                        <li className='flex justify-between p-3 w-screen px-6'>
                            <p className='font-santoshi-regular'>Save Data</p>
                            <ToggleSwitch toggleHandler={() => console.log("Hey Man")} />
                        </li>
                        <li className='text-[#62CD5D] px-6'>About</li>
                        <li className='flex justify-between -mt-3 p-3 w-screen px-6'>
                            <p className='font-santoshi-regular'>Version</p>
                            <p className='font-santoshi-light font-xs'>0.1.0 Alpha</p>
                        </li>
                        <li className='font-sans text-[#62CD5D] px-6'>Other</li>
                        <p onClick={logout} className='font-santoshi-regular -mt-3 p-3 w-screen px-6 cursor-pointer'>Logout</p>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default TopNavigation