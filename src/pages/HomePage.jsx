
import { useEffect, useState } from 'react';
import NewAllbumCover from '../assets/images/billieCover.png'
import Play from '../assets/images/Play.svg?react';
import useStore from '../stores/useStore'; // Adjust the path accordingly
import TopNavigation from '../components/TopNavigation';
import useDarkMode from '../hooks/useDarkMode';
import Playlist from '../components/Playlist';
import usePlaySong from '../hooks/usePlaySong'
import BgShape from '../assets/images/BgShape.svg?react';

const HomePage = () => {
  const { playSong } = usePlaySong()
  useDarkMode(); //add or remove dark mode according to device-color-scheme
  const { sharedState, setSharedState } = useStore();
  const [userData, setUserData] = useState(null);
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
      songName: 'Start Over',
      songArtist: 'Jessica Baio, Mykyl',
      AllbumCover: '/images/allbum6.jpeg'
    },
    {
      songName: 'Lush Life',
      songArtist: 'Zara Larsson',
      AllbumCover: '/images/allbum5.jpg'
    },
    {
      songName: 'Heat Waves',
      songArtist: 'Glass Animals',
      AllbumCover: '/images/allbum7.jpeg'
    },
    {
      songName: 'Bad Guy',
      songArtist: 'Billie Eilish',
      AllbumCover: '/images/allbum1.jpeg'
    },
    {
      songName: 'Please Please',
      songArtist: 'Sabrina Carpenter',
      AllbumCover: '/images/allbum4.jpg'
    },
    {
      songName: 'Fall Sleep',
      songArtist: 'Billie Eilish',
      AllbumCover: '/images/allbum3.jpeg'
    },
    {
      songName: 'Finesse',
      songArtist: 'Drake',
      AllbumCover: '/images/allbum2.jpeg'
    },
  ]

  let playlist = [
    {
      songName: 'As It Was',
      songArtist: 'Harry Styles',
    },
    {
      songName: 'Kinni Kinni',
      songArtist: 'Diljit Dosanjh',
    },
    {
      songName: 'One Call Away ',
      songArtist: 'Charlie Puth',
    },
    {
      songName: 'I Feel It Coming',
      songArtist: 'Weekend',
    },
    {
      songName: 'People',
      songArtist: 'Libianca',
    },
    {
      songName: 'Reality',
      songArtist: 'Lost Frequencies',
    },
    {
      songName: 'Capsize',
      songArtist: 'FRENSHIP',
    },
    {
      songName: 'ily',
      songArtist: 'Surf Mesa',
    },
    {
      songName: 'My Stupid Heart',
      songArtist: 'Walk off the Earth',
    },
    {
      songName: 'Baby One More Time',
      songArtist: 'Britney Spears',
    },
    {
      songName: 'All of Me',
      songArtist: 'John Legend',
    },
    {
      songName: 'Counting Stars',
      songArtist: 'OneRepublic',
    },
    {
      songName: 'unholy',
      songArtist: '90degress',
    },
  ]

  return (
    <div className='bg-[#0F0817] overflow-hidden font-santoshi-regular'>
      <BgShape className='fixed w-screen -top-40' />
      {/* Top Navigation */}
      <TopNavigation options={{ left: 'search', center: 'logo', handler: setSharedState }} />

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
      <div className='flex text-white justify-between items-center mt-8  px-8 md:px-28 no-wrap'>
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
      <div className="flex flex-col m-auto p-auto text-white text-sm mt-5 w-[83%] md:w-[87%]">
        <div
          className="flex overflow-x-scroll pb-1 hide-scroll-bar"
        >
          <div
            className="flex flex-nowrap "
          >
            {media.map((obj, index) => (
              <div className="inline-block pr-8 relative cursor-pointer" key={index} onClick={() => playSong({ songName: obj.songName, songArtist: obj.songArtist })}>
                <div className="w-[7.5rem] h-40 max-w-xs overflow-hidden rounded-[25px] shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out mb-3 -mr-3">
                  <img src={obj.AllbumCover} className='w-full h-full object-cover' alt={`${obj.songName} album cover`} />
                </div>
                <div className=' rounded-full h-7 w-7 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] absolute bottom-10 right-1'>
                  <Play className='h-[12px]' />
                </div>
                <h1 className='font-santoshi-regular ml-2'>{obj.songName}</h1>
                <p className='font-santoshi-light text-xs ml-2'>{obj.songArtist}</p>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Playlist */}
      <Playlist heading={'Recommendation'} items={playlist} mb={7.5} />
    </div>
  );
};

export default HomePage;
