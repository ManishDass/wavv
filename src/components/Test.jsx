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
        console.log("xXx: ", data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      });
  }, [fetchDataFromStore]);




  return (

    <div
      className="relative w-full h-16 bg-[#0F0817] rounded-[20px] text-white" >
      <div className="backdrop-blur-xl bg-[#0F0817]/70 h-full flex justify-between items-center w-screen rounded-t-[20px]">

        <div className='relative'>
          {/* Below Div Cause too much performace Bottleneck */}
          <span className="animate-ping absolute inline-flex h-[2.5rem] w-[2.5rem] top-[0.2rem] left-[1.5rem] rounded-full bg-[#62CD5D] opacity-75 z-10"></span>
          <img className='bg-cover w-[2.8rem] h-[2.8rem] ml-[1.4rem] rounded-full border-[1px] border-white relative z-20' src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt={metadata.songName} />
        </div>


        <div className="marquee-container overflow-hidden flex flex-col">
          <p className="marquee-text">
            <span className="inline-block">{metadata.songName}</span>
            <span className="inline-block pl-2">•</span>
            <span className="inline-block pl-2">{metadata.songArtist}</span>
          </p>
        </div>
        <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] '>
          <div id="heart-container" className='-mr-[1rem]' onClick={(e) => { e.stopPropagation(); likedSongHandler(metadata, !isChecked); }}>
            <input type="checkbox" id="toggle" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <div id="twitter-heart"></div>
          </div>
        </div>
        <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] mr-4 cursor-pointer'>
          {isPlaying ? (
            <PauseIcon onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} />
          ) : (
            <PlayIcon onClick={(e) => { e.stopPropagation(); handlePlayPause(); }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;