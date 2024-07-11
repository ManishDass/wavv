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
  } = useStore();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const { likedSongHandler } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='fixed bottom-[4rem] z-50' onClick={musicPlayerSliderHandler}>
      {metadata && (
        <div
          className="relative w-full h-16 bg-cover bg-center"
          style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoid}/sddefault.jpg)` }}
        >
          <div className="backdrop-blur-xl bg-white/30 h-full flex justify-between items-center w-screen rounded-t-lg">

            <img className='bg-cover w-[3rem] h-[3rem] ml-[1.3rem] rounded-full' src={`https://img.youtube.com/vi/${videoid}/sddefault.jpg`} alt={metadata.songName} />

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