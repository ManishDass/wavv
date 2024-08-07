import { useEffect, useState } from 'react';
import Play from '../assets/images/Play.svg?react';
import usePlaySong from '../hooks/usePlaySong';
import './Heart.css';
import { useAuth } from '../context/AuthContext';
import useStore from '../stores/useStore';

const Playlist = ({ items = [], heading, topbar, mb }) => {
  useEffect(() => {
    console.log("Items: ", items)
  }, [])
  const { playSong } = usePlaySong();
  const { likedSongHandler } = useAuth();
  const [checkedStates, setCheckedStates] = useState(new Array(items.length).fill(false));
  const { showMusicPlayerSlider, metadata } = useStore()

  const handleCheckboxChange = (index) => {
    const updatedCheckedStates = checkedStates.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedStates(updatedCheckedStates);
  };

  const handleLikeSong = (songDetails, index) => {
    const metadata = songDetails;
    likedSongHandler(metadata, !checkedStates[index]);
    handleCheckboxChange(index);
  };

  return (
    <div
      className="text-white flex flex-col text-sm font-sans justify-between text-wrap overflow-hidden"
      // style={{ marginBottom: `${mb}rem` }}
      style={{ marginBottom: metadata ? mb + 'rem' : '4.5rem' }}
    >

      {/* Top Bar */}
      <div className={`grid grid-cols-12 justify-between items-center mt-8 mb-8 px-8 md:px-28 ${topbar === 'hidden' ? 'hidden' : ''}`} >
        <h1 className='text-[1.2rem] col-span-6'>{heading || 'Playlist'}</h1>
        <p className='font-santoshi-light text-xs col-span-6 place-self-end'>See More</p>
      </div>


      {items.length === 0 ? (
        <p className='text-center text-gray-500 flex h-[50vh] justify-center items-center'>No items available</p>
      ) : (items.map((obj, index) => (
        <div key={index} className='grid grid-cols-12 justify-around items-center pb-8 relative pl-8'>

        
          <div className='rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] col-span-3'>
            <Play onClick={() => playSong({ songName: obj.songName, songArtist: obj.songArtist })} className='cursor-pointer' />
          </div>


          <div className='flex flex-col -ml-11 basis-[20%] justify-center col-span-7 pl-4'>
            <h3 className='text-sm font-santoshi-bold'>{obj.songName}</h3>
            <p className='text-[0.8rem] font-satoshi font-medium text-gray-500'>{obj.songArtist}</p>
          </div>



          <div id="heart-container" className='col-span-1 place-self-center' onClick={() => handleLikeSong({ songName: obj.songName, songArtist: obj.songArtist }, index)}>
            <input type="checkbox" id="toggle" checked={checkedStates[index]} onChange={() => handleCheckboxChange(index)} />
            <div id="twitter-heart"></div>
          </div>


        </div>
      ))
      )}

      
    </div>
  );
}

export default Playlist;