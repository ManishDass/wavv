
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import MusicSearch from '../components/MusicSearch';
import Logo from '../assets/LogoWithText.svg';
import NewAllbumCover from '../assets/images/billieCover.png'
import Search from '../assets/images/Search.svg?react';
import Union2 from '../assets/images/Union2.svg?react';
import HomeIcon from '../assets/images/Home.svg?react';
import DiscoveryIcon from '../assets/images/Discovery.svg?react';
import HeartIcon from '../assets/images/HeartIcon.svg?react';
import ProfileIcon from '../assets/images/Profile.svg?react';
import Play from '../assets/images/Play.svg?react';
import useStore from '../stores/useStore'; // Adjust the path accordingly
import { duration } from '@mui/material';
import { useNavigate } from "react-router-dom";

import Discover from '../components/Discover';
import Liked from './Liked';
import Profile from './Profile';

const HomePage = () => {
  const { sharedState, setSharedState } = useStore();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selected, setSelected] = useState('home');
  const [selectedSubCategory, setSelectedSubCategory] = useState('new');


  const [selectedTab, setSelectedTab] = useState('home');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };


  // useEffect(() => {
  //   // Example usage of handlePreSelectedCategory
  //   handlePreSelectedCategory('home'); // Call handlePreSelectedCategory with a category
  // }, [handlePreSelectedCategory]);

  // const handleSearchIconClick = () => {
  //   // Redirect to Home with Preselected value
  //   console.log("CLicked on Searcg")
  //   handlePreSelectedCategory('discover')
  // };

  const handleClick = (icon) => {
    setSelected(icon);
  };

  const handleSubCategoryClick = (icon) => {
    setSelectedSubCategory(icon);
  };

  useEffect(() => {
    const storedUserProfileIcon = localStorage.getItem('userProfileIcon');
    if (storedUserProfileIcon) {
      setUserData(JSON.parse(storedUserProfileIcon));
    }
  }, []);

  const darkMode = useStore(state => state.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  let media = [
    {
      songName: 'Bad Guy',
      Artist: 'Billie Eilish',
      AllbumCover: '/images/allbum1.jpeg'
    },
    {
      songName: 'Scorpion',
      Artist: 'Drake',
      AllbumCover: '/images/allbum2.jpeg'
    },
    {
      songName: 'Fall Sleep',
      Artist: 'Billie Eilish',
      AllbumCover: '/images/allbum3.jpeg'
    },
    {
      songName: 'Bad Guy',
      Artist: 'Billie Eilish',
      AllbumCover: '/images/allbum1.jpeg'
    },
    {
      songName: 'Scorpion',
      Artist: 'Drake',
      AllbumCover: '/images/allbum2.jpeg'
    },
    {
      songName: 'Fall Sleep',
      Artist: 'Billie Eilish',
      AllbumCover: '/images/allbum3.jpeg'
    },
  ]

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

  const handleTestClick = () => {
    console.log("no")
    setSharedState();
  };

  return (
    <div className=' bg-[#1B1A1A] overflow-hidden font-santoshi-regular'>

      {/* Top Navigation Bar */}
      <div className='flex justify-between items-center mt-5 px-10'>
        <Search onClick={handleTestClick} />
        <img src={Logo} className='bg-cover bg-no-repeat h-7' alt='logo' />
        <div className='flex flex-col gap-[2px]'>
          <div className='rounded-full bg-white h-1 w-1'></div>
          <div className='rounded-full bg-white h-1 w-1'></div>
          <div className='rounded-full bg-white h-1 w-1'></div>
        </div>
      </div>


      {/* Top New Allbum */}
      <div className='flex h-24 items-center justify-center mt-5'>
        <div className='flex bg-[#62CD5D] h-[105%] w-[85%] rounded-[22px] text-white justify-evenly items-center'>
          <div className='w-[35%] h-[80%]'>
            <h3 className='text-[0.5rem]'>New Album</h3>
            <h2>Happier Than Ever</h2>
            <p className='text-xs'>Billie Eilish</p>
          </div>
          <div className='w-[50%] h-[100%] relative'>
            <img
              src={NewAllbumCover}
              className='absolute -top-[3.15rem] right-3 h-[150%] object-cover'
              alt='New Album Cover'
            />
          </div>
        </div>
      </div>


      {/* Category */}
      <div className='flex text-white justify-between items-center mt-8 px-8 no-wrap'>
        <div className='flex items-center flex-col justify-center cursor-pointer'>
          <h1 onClick={() => handleSubCategoryClick('new')} >New</h1>
          <div className={`bg-[#62CD5D] h-[3px] w-7 rounded-b-xl ${selectedSubCategory === 'new' ? '' : 'hidden'}`}></div>
        </div>

        <div className='flex items-center flex-col justify-center cursor-pointer'>
          <h1 onClick={() => handleSubCategoryClick('video')}>Video</h1>
          <div className={`bg-[#62CD5D] h-[3px] w-7 rounded-b-xl ${selectedSubCategory === 'video' ? '' : 'hidden'}`}></div>
        </div>

        <div className='flex items-center flex-col justify-center cursor-pointer'>
          <h1 onClick={() => handleSubCategoryClick('artists')}>Artists</h1>
          <div className={`bg-[#62CD5D] h-[3px] w-7 rounded-b-xl ${selectedSubCategory === 'artists' ? '' : 'hidden'}`}></div>
        </div>

        <div className='flex items-center flex-col justify-center cursor-pointer'>
          <h1 onClick={() => handleSubCategoryClick('podcast')}>Podcast</h1>
          <div className={`bg-[#62CD5D] h-[3px] w-7 rounded-b-xl ${selectedSubCategory === 'podcast' ? '' : 'hidden'}`}></div>
        </div>

      </div>



      {/* Category with Scroll */}
      <div className="flex flex-col m-auto p-auto text-white text-sm mt-5">
        <div
          className="flex overflow-x-scroll pb-1 hide-scroll-bar"
        >
          <div
            className="flex flex-nowrap ml-3"
          >
            {media.map((obj, index) => (
              <div className="inline-block px-3 relative" key={index}>
                <div className="w-[8rem] h-40 max-w-xs overflow-hidden rounded-[25px] shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out mb-3 -mr-3">
                  <img src={obj.AllbumCover} className='w-full h-full object-cover' alt={`${obj.songName} album cover`} />
                </div>
                <div className=' rounded-full h-7 w-7 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] absolute bottom-10 right-1'>
                  <Play className='h-[12px]' />
                </div>
                <h1 className='font-santoshi-regular ml-2'>{obj.songName}</h1>
                <p className='font-santoshi-light text-xs ml-2'>{obj.Artist}</p>
              </div>
            ))}

          </div>
        </div>
      </div>


      {/* Playlist */}

      <div className='text-white flex flex-col h-[38%] text-sm font-sans justify-between text-wrap overflow-hidden'>
        <div className='flex flex-row justify-between items-center mt-8 mb-8 px-8'>
          <h1 className='text-[1.2rem]'>Playlist</h1>
          <p className='font-santoshi-light text-xs'>See More</p>
        </div>
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
            <HeartIcon className='basis-[7%]' />
          </div>
        ))
        }
      </div>






      {/* Bottom Navigation
      <div className="fixed bottom-0 left-0 right-0 bg-[#343434] py-5 flex justify-around items-center">
        <div className='flex flex-col items-center justify-center relative'>
          <div className={`bg-[#62CD5D] ${selected === 'home' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <HomeIcon onClick={() => handleClick('home')} fill={selected === 'home' ? '#42C83C' : '#343434'} stroke={selected === 'home' ? '' : '#737373'} />
        </div>
        <div className='flex flex-col items-center justify-center relative'>
          <div className={`bg-[#62CD5D] ${selected === 'DiscoveryIcon' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <DiscoveryIcon onClick={() => handleClick('DiscoveryIcon')} fill={selected === 'DiscoveryIcon' ? '#42C83C' : '#343434'} stroke={selected === 'DiscoveryIcon' ? '' : '#737373'} />
        </div>
        <div className='flex flex-col items-center justify-center relative'>
          <div className={`bg-[#62CD5D] ${selected === 'HeartIcon' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <HeartIcon onClick={() => handleClick('HeartIcon')} fill={selected === 'HeartIcon' ? '#42C83C' : '#343434'} stroke={selected === 'HeartIcon' ? '' : '#737373'} />
        </div>
        <div className='flex flex-col items-center justify-center relative'>
          <div className={`bg-[#62CD5D] ${selected === 'ProfileIcon' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <ProfileIcon onClick={() => handleClick('ProfileIcon')} fill={selected === 'ProfileIcon' ? '#42C83C' : '#343434'} stroke={selected === 'ProfileIcon' ? '' : '#737373'} />
        </div>
      </div> */}



      {/* Render different components based on the selected tab */}




      {/* Bottom Navigation
      <div className="fixed bottom-0 left-0 right-0 bg-red-500 py-5 flex justify-around items-center pb-10">
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'home' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <HomeIcon onClick={() => handleTabClick('home')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'home' ? '#42C83C' : '#343434'} stroke={selectedTab === 'home' ? '' : '#737373'} />
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'discover' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <DiscoveryIcon onClick={() => handleTabClick('discover')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'discover' ? '#42C83C' : '#343434'} stroke={selectedTab === 'discover' ? '' : '#737373'} />
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'liked' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <HeartIcon onClick={() => handleTabClick('liked')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'liked' ? '#42C83C' : '#343434'} stroke={selectedTab === 'liked' ? '' : '#737373'} />
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <div className={`bg-[#62CD5D] ${selectedTab === 'profile' ? '' : 'hidden'} h-[0.4rem] w-6 absolute bottom-[2.61rem] rounded-b-xl`}></div>
          <ProfileIcon onClick={() => handleTabClick('profile')} className="h-6 w-6 cursor-pointer" fill={selectedTab === 'profile' ? '#42C83C' : '#343434'} stroke={selectedTab === 'profile' ? '' : '#737373'} />
        </div>
      </div> */}





    </div>





    // <div className="relative bg-black text-white min-h-screen">
    //   <div className={`p-4 ${isSearchVisible ? 'blur-md' : ''}`}>
    //     {/* Header */}
    //     <div className="flex items-center justify-between">
    //       <FaSearch className="text-xl cursor-pointer" onClick={toggleSearch} />
    //       <h1 className="text-2xl font-bold">Spotify</h1>
    //       <div className="flex items-center space-x-4">
    //         <img src={userData.photoURL} alt="User Avatar" className="w-8 h-8 rounded-full" />
    //         <button onClick={logout} className="text-sm">Logout</button>
    //       </div>
    //     </div>

    //     {/* Main Content */}
    //     <div className="p-4">
    //       <div className="mb-6">
    //         <img src="../assets/image.jpg" alt="Album" className="w-full rounded-lg" />
    //         <div className="mt-2">
    //           <h2 className="text-lg font-bold">Happier Than Ever</h2>
    //           <p>Billie Eilish</p>
    //         </div>
    //       </div>

    //       {/* Tabs */}
    //       <div className="flex space-x-4 mb-4">
    //         <button className="border-b-2 border-green-500">News</button>
    //         <button>Video</button>
    //         <button>Artists</button>
    //         <button>Podcasts</button>
    //       </div>

    //       {/* News Section */}
    //       <div className="flex space-x-4 overflow-x-auto mb-6">
    //         <div className="flex-shrink-0 w-40">
    //           <img src="../assets/image.jpg" alt="Bad Guy" className="w-full rounded-lg" />
    //           <p className="mt-2">Bad Guy</p>
    //           <p className="text-sm text-gray-500">Billie Eilish</p>
    //         </div>
    //         <div className="flex-shrink-0 w-40">
    //           <img src="../assets/image.jpg" alt="Scorpion" className="w-full rounded-lg" />
    //           <p className="mt-2">Scorpion</p>
    //           <p className="text-sm text-gray-500">Drake</p>
    //         </div>
    //         <div className="flex-shrink-0 w-40">
    //           <img src="../assets/image.jpg" alt="WH" className="w-full rounded-lg" />
    //           <p className="mt-2">WH</p>
    //           <p className="text-sm text-gray-500">Billie Eilish</p>
    //         </div>
    //       </div>

    //       {/* Playlist Section */}
    //       <div className="mb-6">
    //         <h2 className="text-lg font-bold mb-2">Playlist</h2>
    //         {userData.playlists.length > 0 ? (
    //           userData.playlists.map((playlist, index) => (
    //             <div key={index} className="flex justify-between items-center mb-2">
    //               <div>
    //                 <p>{playlist.name}</p>
    //                 <p className="text-sm text-gray-500">{playlist.artist}</p>
    //               </div>
    //               <p>{playlist.duration}</p>
    //             </div>
    //           ))
    //         ) : (
    //           <p>No playlists available</p>
    //         )}
    //       </div>
    //     </div>

    //     {/* Bottom Navigation */}
    //     <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-around">
    //       <FaHome className="text-xl" />
    //       <FaPodcast className="text-xl" />
    //       <FaHeartIcon className="text-xl" />
    //       <FaUser className="text-xl" />
    //     </div>
    //   </div>

    //   {/* Search Component */}
    //   {isSearchVisible && (
    //     <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
    //       <div className="bg-white text-black p-4 rounded-lg w-3/4 relative">
    //         <button
    //           onClick={toggleSearch}
    //           className="absolute top-2 right-2 text-black text-xl"
    //         >
    //           &times;
    //         </button>
    //         <MusicSearch
    //           onVideoIdChange={(videoId) => console.log("Video ID:", videoId)}
    //           onMusicMetaChange={(meta) => console.log("Music Meta:", meta)}
    //         />
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
};

export default HomePage;
