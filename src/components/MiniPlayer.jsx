import useStore from '../stores/useStore';
import HeartIcon from '../assets/images/HeartIcon.svg?react';
import useDarkMode from '../hooks/useDarkMode';
import PlayIcon from '../assets/images/Play.svg?react';
import PauseIcon from '../assets/images/Pause.svg?react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react'

const MiniPlayer = ({ musicPlayerSliderHandler }) => {
  useDarkMode();
  const {
    videoid,
    metadata,
    audioUrl,
    isPlaying,
    currentTime,
    duration,
    setAudioUrl,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    toggleShowMusicPlayerSlider,
  } = useStore();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const { likedSongHandler } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='fixed bottom-[4rem] z-50' onClick={toggleShowMusicPlayerSlider}>
      {metadata && (
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
            {/* onClick={() => likedSongHandler(metadata, !isChecked)} */}
            {/* <div className=' rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-md bg-[#2C2C2C] '>
                <HeartIcon className="h-6 w-6 cursor-pointer" fill={'#42C83C'} stroke={'#737373'} />
              </div> */}
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
      )}
    </div>
  )
}

export default MiniPlayer