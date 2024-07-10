import { useState } from 'react';
import Play from '../assets/images/Play.svg?react';
import usePlaySong from '../hooks/usePlaySong';
import './Heart.css';
import { useAuth } from '../context/AuthContext';

const Playlist = ({ items, heading, topbar }) => {
  const { playSong } = usePlaySong();
  const { likedSongHandler } = useAuth();
  const [checkedStates, setCheckedStates] = useState(new Array(items.length).fill(false));

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
    <div className='text-white flex flex-col text-sm font-sans justify-between text-wrap overflow-hidden mb-16'>
      <div className={`flex flex-row justify-between items-center mt-8 mb-8 px-8 md:px-28 ${topbar === 'hidden' ? 'hidden' : ''}`} >
        <h1 className='text-[1.2rem]'>{heading || 'Playlist'}</h1>
        <p className='font-santoshi-light text-xs'>See More</p>
      </div>
      {items.map((obj, index) => (
        <div key={index} className='flex justify-around items-center pb-8 relative'>
          <div className='rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C]'>
            <Play onClick={() => playSong({ name: obj.name || obj.title, artist: obj.artist })} className='cursor-pointer' />
          </div>
          <div className='flex flex-col -ml-11 basis-[20%] justify-center'>
            <h3 className='text-sm font-santoshi-bold'>{obj.name || obj.title}</h3>
            <p className='text-[0.8rem] font-satoshi font-medium text-gray-500'>{obj.artist}</p>
          </div>
          <p className='text-sm font-santoshi-light basis-[10%]'>{obj.duration || ''}</p>
          <div id="heart-container" className='mr-[0.4rem]' onClick={() => handleLikeSong({ title: obj.name || obj.title, artist: obj.artist }, index)}>
            <input type="checkbox" id="toggle" checked={checkedStates[index]} onChange={() => handleCheckboxChange(index)} />
            <div id="twitter-heart"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Playlist;