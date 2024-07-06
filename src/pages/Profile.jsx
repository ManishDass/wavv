import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../assets/images/Back.svg?react';
import useStore from '../stores/useStore';
import Avatar, { genConfig } from 'react-nice-avatar';

const Profile = () => {
  const navigate = useNavigate();
  const { videoid, userDetails, metadata, darkMode, setVideoid, setUserDetails, setMetadata, toggleDarkMode } = useStore();
  const [config, setConfig] = useState({});

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    setUserDetails(userProfile);
    console.log(userProfile);

    if (userProfile && userProfile.photoURL) {
      setConfig(genConfig(userProfile.photoURL)); // Ensure photoURL contains the correct avatar options
    } else {
      // Fallback to a default configuration if photoURL is not present
      setConfig(genConfig());
    }
    console.log(userProfile.photoURL);
  }, []);

  let playlist = [
    {
      songName: 'As It Was',
      artist: 'Harry Styles',
      duration: '5:33'
    },
    {
      songName: 'God Did',
      artist: 'Dj Khaled',
      duration: '3:43'
    },
    {
      songName: 'One Call Away ',
      artist: 'Charlie Puth',
      duration: '3:14'
    },
    {
      songName: 'SNAP',
      artist: 'Rosa Linn',
      duration: '2:59'
    },
    {
      songName: 'People',
      artist: 'Libianca',
      duration: '3:04'
    },
    {
      songName: 'SNAP',
      artist: 'Rosa Linn',
      duration: '2:59'
    },
    {
      songName: 'People',
      artist: 'Libianca',
      duration: '3:04'
    },
  ]

  return (
    <div className='bg-[#1C1B1B] h-screen font-santoshi-regular text-white'>


      {/* User Profile Section and  Top Navigation Bar*/}
      <div className='flex w-screen flex-col items-center justify-center font-sans bg-[#2B2B2B] rounded-b-[40px]'>
        <div className='flex justify-between items-center mt-2 px-6 pt-4 w-screen'>
          <div className='flex items-center justify-center bg-white bg-opacity-10 h-7 w-7 rounded-full back-button' onClick={() => navigate(-1)}>
            <BackIcon />
          </div>
          <h1 className='font-sans text-md -ml-6'>Profile</h1>
          <div className='flex flex-col gap-[2px]'>
            <div className='rounded-full bg-white h-1 w-1'></div>
            <div className='rounded-full bg-white h-1 w-1'></div>
            <div className='rounded-full bg-white h-1 w-1'></div>
          </div>
        </div>

        <Avatar style={{ width: '4.5rem', height: '4.5rem' }} {...config} className='mt-2 mb-3' />
        <p className='text-santoshi-light text-[0.6rem]' >manishdas@gmail.com</p>
        <p className='mb-4'>Manish Das</p>
        <div className='flex w-screen items-center justify-around pb-4 px-8 text-center'>
          <div>
            <p>778</p>
            <p className='text-santoshi-light text-[0.6rem]'>Followers</p>
          </div>
          <div>
            <p>243</p>
            <p className='text-santoshi-light text-[0.6rem]'>Following</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col font-sans text-xs mt-5 w-screen'>
        <h2>PUBLIC PLAYLISTS</h2>
        {/* Playlist */}

        <div className='text-white flex flex-col h-[38%] text-sm font-sans justify-between text-wrap overflow-hidden'>
          <div className='flex flex-row justify-between items-center mt-8 mb-8 px-8'>
            <h1 className='text-[1.2rem]'>Playlist</h1>
            <p className='font-santoshi-light text-xs'>See More</p>
          </div>
          {playlist.map((obj, index) => (
            <div key={index} className='flex justify-around items-center pb-5'>
              <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C]'>

              </div>
              <div className='flex flex-col gap-1 -ml-11  basis-[20%]'>
                <h3 className='text-sm font-santoshi-bold'>{obj.songName}</h3>
                {/* {obj.songName.length > 9 ? obj.songName.slice(0,9) : obj.songName} */}
                <p className='text-xs font-santoshi-light  '>{obj.artist}</p>
              </div>
              <p className='text-sm font-santoshi-light   basis-[10%]'>{obj.duration}</p>
              <div>
                <div className='flex flex-col gap-[2px]'>
                  <div className='rounded-full bg-white h-1 w-1'></div>
                  <div className='rounded-full bg-white h-1 w-1'></div>
                  <div className='rounded-full bg-white h-1 w-1'></div>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;