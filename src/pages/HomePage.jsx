
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NewAllbumCover from '../assets/images/billieCover.png'
import HeartIcon from '../assets/images/HeartIcon.svg?react';
import Play from '../assets/images/Play.svg?react';
import useStore from '../stores/useStore'; // Adjust the path accordingly
import TopNavigation from '../components/TopNavigation';
import useDarkMode from '../hooks/useDarkMode';


const HomePage = () => {
  useDarkMode(); //add or remove dark mode according to device-color-scheme
  const { sharedState, setSharedState } = useStore();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [selected, setSelected] = useState('home');
  const [selectedSubCategory, setSelectedSubCategory] = useState('new');

  const handleSubCategoryClick = (icon) => {
    setSelectedSubCategory(icon);
  };

  useEffect(() => {
    const storedUserProfileIcon = localStorage.getItem('userProfileIcon');
    if (storedUserProfileIcon) {
      setUserData(JSON.parse(storedUserProfileIcon));
    }
  }, []);

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

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
    setSharedState();
  };

  return (
    <div className=' bg-[#1B1A1A] overflow-hidden font-santoshi-regular'>

      {/* Top Navigation */}
      <TopNavigation options={{left: 'search', center: 'logo', handler: setSharedState}}/>
  
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
    </div>
  );
};

export default HomePage;
