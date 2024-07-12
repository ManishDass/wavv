import React, { useEffect, useState } from 'react';
import UnionShape from '../assets/images/Union4.svg?react';
import Avatar, { genConfig } from 'react-nice-avatar';
import Play from '../assets/images/Play.svg?react';
import TopNavigation from '../components/TopNavigation';
import Playlist from '../components/Playlist';
import usePlaySong from '../hooks/usePlaySong'
import useStore from '../stores/useStore'; // Adjust the path accordingly

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const { playSong } = usePlaySong()
  const { sharedState, setSharedState, setSelectedTab } = useStore();

  useEffect(() => {
    const tempUserProfile = JSON.parse(localStorage.getItem('userProfile'));
    setUserProfile(tempUserProfile);
  }, []);


  let playlist = [
    {
      name: 'As It Was',
      artist: 'Harry Styles',
    },
    {
      name: 'Kinni Kinni',
      artist: 'Diljit Dosanjh',
    },
    {
      name: 'One Call Away ',
      artist: 'Charlie Puth',
    },
    {
      name: 'I Feel It Coming',
      artist: 'Weekend',
    },
    {
      name: 'People',
      artist: 'Libianca',
    },
    {
      name: 'Reality',
      artist: 'Lost Frequencies',
    },
    {
      name: 'Capsize',
      artist: 'FRENSHIP',
    },
  ]

  return (
    <div className='bg-[#1C1B1B] h-screen font-santoshi-regular text-white'>
      {userProfile && (
        <>
          {/* User Profile Section and  Top Navigation Bar*/}
          <div className='flex w-screen flex-col  justify-center font-sans bg-[#2B2B2B] rounded-b-[40px] relative'>
            <UnionShape className='absolute -left-1 -top-2' />
            <TopNavigation options={{ left: 'back', center: 'Profile', onBack: 'home' }} />
            <div className='flex flex-col w-screen items-center justify-around pb-8 text-center'>
              <Avatar style={{ width: '4.5rem', height: '4.5rem' }} {...userProfile?.photoURL} className='mt-4 mb-3' />
              <p className='font-santoshi-light text-[0.7rem] mb-1' >{userProfile.email}</p>
              <p>{userProfile.name}</p>
            </div>
          </div>
          <div className='flex flex-col font-sans text-xs w-screen'>
            {/* Playlist */}
            <Playlist items={playlist} mb={7.5} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;