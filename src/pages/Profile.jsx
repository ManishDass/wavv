import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnionShape from '../assets/images/Union4.svg?react';
import Avatar, { genConfig } from 'react-nice-avatar';
import Play from '../assets/images/Play.svg?react';
import TopNavigation from '../components/TopNavigation';
import Playlist from '../components/Playlist';
import usePlaySong from '../hooks/usePlaySong'

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { playSong } = usePlaySong()

  useEffect(() => {
    const tempUserProfile = JSON.parse(localStorage.getItem('userProfile'));
    setUserProfile(tempUserProfile);
  }, []);


  let playlist = [
    {
      name: 'As It Was',
      artist: 'Harry Styles',
      duration: '5:33'
    },
    {
      name: 'God Did',
      artist: 'Dj Khaled',
      duration: '3:43'
    },
    {
      name: 'One Call Away ',
      artist: 'Charlie Puth',
      duration: '3:14'
    },
    {
      name: 'SNAP',
      artist: 'Rosa Linn',
      duration: '2:59'
    },
    {
      name: 'People',
      artist: 'Libianca',
      duration: '3:04'
    },
    {
      name: 'SNAP',
      artist: 'Rosa Linn',
      duration: '2:59'
    },
    {
      name: 'People',
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
            <p>{0}</p>
            <p className='font-santoshi-light text-[0.7rem]'>Followers</p>
          </div>
          <div>
            <p>{0}</p>
            <p className='font-santoshi-light text-[0.7rem]'>Following</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col font-sans text-xs mt-5 w-screen'>
        <h2 className='ml-8 mt-1 mb-4'>PUBLIC PLAYLISTS</h2>


        {/* Playlist */}
        <Playlist items={playlist}/>


      </div>
    </div>
  );
};

export default Profile;