import React, { useState, useEffect } from 'react';
import usePlaySong from '../hooks/usePlaySong'
import { useAuth } from '../context/AuthContext';
import TopNavigation from './TopNavigation'

const Test = () => {
    const { playSong } = usePlaySong()
    const { fetchDataFromStore } = useAuth();

    const handleClick = () => {
        playSong({
            name: 'Hey Mama',
            artist: 'Manish Das'
        })
    }



    useEffect(() => {
        fetchDataFromStore()
          .then(data => {
            console.log("xXx: ",data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error state if needed
          });
      }, [fetchDataFromStore]);
    



    return (
        <div className='flex h-dvh justify-center items-center flex-col'>
            <TopNavigation options={{ left: 'back', center: 'Profile' }} />
            <button className='bg-red-500 rounded-md p-2 text-white font-sans text-xl' onClick={fetchDataFromStore}>Test Page</button>
        </div>
    );
};

export default Test;