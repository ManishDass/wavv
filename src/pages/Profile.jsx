import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../assets/images/Back.svg?react';
import UnionShape from '../assets/images/Union4.svg?react';
import useStore from '../stores/useStore';
import Avatar, { genConfig } from 'react-nice-avatar';
import Play from '../assets/images/Play.svg?react';
import TopNavigation from '../components/TopNavigation';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const tempUserProfile = JSON.parse(localStorage.getItem('userProfile'));
    setUserProfile(tempUserProfile);
    // console.log("Test: ", tempUserProfile?.photoURL); // Optional chaining to avoid errors
    // Removed the console log for userProfile.config here as it's not yet updated
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
      <div className='flex w-screen flex-col  justify-center font-sans bg-[#2B2B2B] rounded-b-[40px] relative'>
        <UnionShape className='absolute -left-1 -top-2' />
        <TopNavigation options={{ left: 'back', center: 'Profile' }} />

        <div className='flex flex-col w-screen items-center justify-around pb-5 text-center'>
          <Avatar style={{ width: '4.5rem', height: '4.5rem' }} {...userProfile?.photoURL} className='mt-4 mb-3' />
          <p className='font-santoshi-light text-[0.7rem] mb-1' >{userProfile.email}</p>
          <p>{userProfile.name}</p>
        </div>
        <div className='flex w-screen items-center justify-around pb-5 px-8 text-center'>
          <div>
            <p>778</p>
            <p className='font-santoshi-light text-[0.7rem]'>Followers</p>
          </div>
          <div>
            <p>243</p>
            <p className='font-santoshi-light text-[0.7rem]'>Following</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col font-sans text-xs mt-5 w-screen'>
        <h2 className='ml-8 mt-1 mb-4'>PUBLIC PLAYLISTS</h2>
        {/* Playlist */}

        <div className='text-white flex flex-col h-[38%] text-sm font-sans justify-between text-wrap overflow-hidden'>
          {playlist.map((obj, index) => (
            <div key={index} className='flex justify-around items-center pb-5'>
              <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C]'>
                <Play />
              </div>
              <div className='flex flex-col gap-1 -ml-11  basis-[20%]'>
                <h3 className='text-sm font-santoshi-bold'>{obj.songName}</h3>
                {/* {obj.songName.length > 9 ? obj.songName.slice(0,9) : obj.songName} */}
                <p className='text-xs font-santoshi-light  '>{obj.artist}</p>
              </div>
              <p className='text-sm font-santoshi-light   basis-[10%]'>{obj.duration}</p>
              <div>
                <div className='flex gap-[2px] mr-1'>
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